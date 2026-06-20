import { useEffect, useState } from "react";
import { getCurrentUser } from "../../Services/userService";
import { getWatchData } from "../../Services/watchService";

import DashboardLayout from "../../components/Layout/DashboardLayout";

import "./Dashboard.css"

export default function DashboardPage() {

  const [user, setUser] = useState(null);
  const [watchData,
  setWatchData] =
  useState([]);

  useEffect(() => {

  async function loadData() {

    try {

      const userData =
        await getCurrentUser();

      setUser(userData);

      // all serials
      const serials =
        userData?.serialNumbers || [];

      // get data of each watch
      const allWatches =
        await Promise.all(

          serials.map(async (serial) => {

            try {

              return await
                getWatchData(serial);

            } catch {

              return null;
            }
          })
        );

      // remove null
      setWatchData(
        allWatches.filter(Boolean)
      );

    } catch (err) {

      console.log(err);

      window.location.href =
        "/Kid-Guard/login";
    }
  }

  loadData();

}, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <DashboardLayout
      user={user}
      watchData={watchData}
    />
  );
}