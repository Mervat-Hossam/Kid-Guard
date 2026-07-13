import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import OverviewTab from "../../Taps/OverviewTab/OverviewTab";
import LiveLocationTab from "../../Taps/LiveLocationTab/LiveLocationTab";
import AlertsTab from "../../Taps/AlertsTab/AlertsTab";
import WatchTab from "../../Taps/WatchTab/WatchTab";
import ReportsTab from "../../Taps/ReportsTab/ReportsTab";
import SettingsTab from "../../Taps/SettingsTab/SettingsTab";

import { useState } from "react";
import "./DashboardLayout.css";

export default function DashboardLayout({
  user,
  watchData,
  selectedSerial,
  setSelectedSerial,
}) {

  const [activeTab, setActiveTab] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main">

        <Topbar
          user={user}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="content">

          {/* OVERVIEW */}
          {activeTab === "dashboard" && (
            <OverviewTab
              user={user}
              watchData={watchData}
              selectedSerial={selectedSerial}
            />
          )}

          {/* LIVE LOCATION */}
          {activeTab === "location" && (
            <LiveLocationTab
              user={user}
              watchData={watchData}
              selectedSerial={selectedSerial}
            />
          )}

          {/* ALERTS */}
          {activeTab === "alerts" && (
            <AlertsTab
              user={user}
              watchData={watchData}
              selectedSerial={selectedSerial}
            />
          )}

          {/* WATCH CONTROL */}
          {activeTab === "watch" && (
            <WatchTab
              user={user}
              watchData={watchData}
              selectedSerial={selectedSerial}
              setSelectedSerial={setSelectedSerial}
            />
          )}

          {/* REPORTS */}
          {activeTab === "reports" && (
            <ReportsTab
              user={user}
              selectedSerial={selectedSerial}
              watchData={watchData}
            />
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <SettingsTab user={user} />
          )}

        </div>
      </div>
    </div>
  );
}