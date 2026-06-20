import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout() {
  const location = useLocation();

  const isDashboard = location.pathname.includes("dashboard");

  return (
    <>
      {!isDashboard && <Header />}

      <Outlet />
    </>
  );
}