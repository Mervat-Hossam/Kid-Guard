import "./Sidebar.css";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {

  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <ul>

        <li
          className={
            activeTab === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("dashboard");
            setSidebarOpen(false);
          }}
        >
          Dashboard
        </li>

        <li
          className={
            activeTab === "location"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("location");
            setSidebarOpen(false);
          }}
        >
          Live Location
        </li>

        <li
          className={
            activeTab === "alerts"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("alerts");
            setSidebarOpen(false);
          }}
        >
          Alerts
        </li>

        <li
          className={
            activeTab === "watch"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("watch");
            setSidebarOpen(false);
          }}
        >
          Watch Monitoring
        </li>

        <li
          className={
            activeTab === "reports"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("reports");
            setSidebarOpen(false);
          }}
        >
          Reports
        </li>

        <li
          className={
            activeTab === "settings"
              ? "active"
              : ""
          }
          onClick={() =>{
            setActiveTab("settings");
            setSidebarOpen(false);
          }}
        >
          Settings
        </li>

      </ul>

    </div>
  );
}

