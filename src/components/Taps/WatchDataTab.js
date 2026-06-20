// import { useState } from "react";
// import api from "../../Services/api";

// export default function WatchDataTab() {
//   const [serialNumber, setSerialNumber] = useState("");
//   const [data, setData] = useState(null);

//   const fetchData = async () => {
//     const res = await api.get(`/watch-data/${serialNumber}`);
//     setData(res.data);
//   };

//   return (
//     <div>
//       <h2>Watch Data</h2>

//       <input
//         placeholder="Serial Number"
//         onChange={(e) => setSerialNumber(e.target.value)}
//       />

//       <button onClick={fetchData}>Get Data</button>

//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </div>
//   );
// }
/*
export default function WatchDataTab({ watchData }) {

  if (!watchData) {
    return <h2>Loading watch data...</h2>;
  }

  return (
    <div className="watch-page">

      <h1>Watch Monitoring</h1>

      <div className="watch-grid">

        <div className="watch-card">
          <h3>Heart Rate</h3>
          <p>{watchData.heartRate} bpm</p>
        </div>

        <div className="watch-card">
          <h3>Battery</h3>
          <p>{watchData.batteryLevel}%</p>
        </div>

        <div className="watch-card">
          <h3>Steps</h3>
          <p>{watchData.stepCount}</p>
        </div>

        <div className="watch-card">
          <h3>Emotion</h3>
          <p>{watchData.emotion || "Unknown"}</p>
        </div>

        <div className="watch-card">
          <h3>Confidence</h3>
          <p>{watchData.confidence || 0}%</p>
        </div>

        <div className="watch-card">
          <h3>Location</h3>
          <p>
            {watchData.latitude},
            {" "}
            {watchData.longitude}
          </p>
        </div>

      </div>

    </div>
  );
}
  */