import { MdWatch } from "react-icons/md"
import { FaMinus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  linkWatch,
  getWatchData,
  unlinkWatch,
} from "../../../Services/watchService";

import "./WatchTab.css";

export default function WatchTab({ user }) {

  const [serials, setSerials] = useState([]);
  const [setChildName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [watchInfo, setWatchInfo] = useState(null);

  // init serials
  useEffect(() => {
    if (user?.serialNumbers?.length) {
      setSerials(user.serialNumbers);
      setSelectedSerial(user.serialNumbers[0]);
    }
  }, [user]);

  // watch data
  useEffect(() => {
    if (!selectedSerial) return;

    getWatchData(selectedSerial)
      .then(setWatchInfo)
      .catch(console.log);

  }, [selectedSerial]);

  // add watch
  const handleAddWatch = async () => {
    try {
      await linkWatch(serialNumber);

      setSerials([...serials, serialNumber]);

      Swal.fire({
        icon: "success",
        title: "Watch Added",
      });

      setChildName("");
      setSerialNumber("");

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };

  const handleDeleteWatch = async (serial) => {

  const result = await Swal.fire({
    title: "Delete Watch?",
    text: "Are you sure you want to remove this watch? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await unlinkWatch(serial);

    const updated = serials.filter(s => s !== serial);
    setSerials(updated);

    if (selectedSerial === serial) {
      setSelectedSerial(updated[0] || null);
    }

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Watch has been removed successfully",
    });

  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message,
    });
  }
};

  return (
    <div className="watch-page">
      <h1>Watch Monitoring</h1>

      <div className="card">

        <h2>Connected Children</h2>

        {serials.map((serial) => (
          <div
            key={serial}
            className={`child-box ${selectedSerial === serial ? "active" : ""}`}
          >

            <span onClick={() => setSelectedSerial(serial)}>
              <MdWatch /> {serial}
            </span>

            <button onClick={() => handleDeleteWatch(serial)}>
              <FaMinus />
            </button>

          </div>
        ))}

        <input
          placeholder="Watch Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />

        <button className="add-btn" onClick={handleAddWatch}>
          Add Child Watch
        </button>

      </div>

      <div className="card">
        <p>Heart Rate: {watchInfo?.heartRate}</p>
        <p>Battery: {watchInfo?.batteryLevel}%</p>
        <p>Steps: {watchInfo?.stepCount}</p>
        <p>Location: {watchInfo?.latitude}, {watchInfo?.longitude}</p>
        <p>Emotion: {watchInfo?.emotion}</p>
      </div>

    </div>
  );
}