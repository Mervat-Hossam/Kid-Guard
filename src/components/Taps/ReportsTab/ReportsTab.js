import { FaHeart, FaBatteryHalf, FaMapMarkerAlt, FaWalking, FaClock } from "react-icons/fa";
import { MdWatch } from "react-icons/md";

import "./ReportsTab.css";

export default function ReportsTab({ watchData }) {

  // if no data 
  if (!watchData || watchData.length === 0) {
    return (
      <div className="reports-page">
        <h1>Reports & Analytics</h1>
        <h3>No watch data available</h3>
      </div>
    );
  }

  return (
    <div className="reports-page">

      <h1>Reports & Analytics</h1>

      {watchData.map((watch) => (
        <div className="report-card" key={watch._id || watch.serialNumber}>

          <h2><MdWatch
            style={{ color: "#374151" }} /> {watch.serialNumber}</h2>

          {/* HEART RATE */}
          <p>
            <FaHeart /> Heart Rate: {watch?.heartRate ?? "--"} BPM
          </p>

          {/* STEPS */}
          <p>
            <FaWalking /> Steps: {watch?.stepCount ?? "--"}
          </p>

          {/* BATTERY */}
          <p>
            <FaBatteryHalf /> Battery: {watch?.batteryLevel ?? "--"}%
          </p>

          {/* LOCATION */}
          <p>
            <FaMapMarkerAlt /> Location: {watch?.latitude ?? "--"}, {watch?.longitude ?? "--"}
          </p>

          {/* TIME */}
          <p>
            <FaClock /> Last Update:{" "}
            {watch?.createdAt
              ? new Date(watch.createdAt).toLocaleString()
              : "--"}
          </p>

        </div>
      ))}

    </div>
  );
}