import {
  FaBatteryHalf,
  FaHeart,
  FaFaceSmileBeam,
} from "react-icons/fa6";
import { FaWalking } from "react-icons/fa";
import { MdWatch } from "react-icons/md";

import "./OverviewTab.css";


export default function OverviewTab({
  user,
  watchData,
}) {

  return (

    <div className="dashboard">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome Back,
            {" "}
            {user?.name}
          </h1>

          <p>
            Smart Child Monitoring Dashboard
          </p>

        </div>

        <div className="dashboard-info">

          <div className="info-box">

            <h3>
              Connected Watches
            </h3>

            <p>
              {watchData?.length || 0}
            </p>

          </div>

        </div>

      </div>

      {/* WATCHES */}

      <div className="watch-grid">

        {watchData?.length > 0 ? (

          watchData.map((watch) => (

            <div
              className="watch-card"
              key={watch._id}
            >

              {/* TOP */}

              <div className="watch-top">

                <div>

                  <h2>
                    <MdWatch style={{ color: "#374151" }}/> {watch.serialNumber}
                  </h2>

                  <span className="live-status">
                    LIVE
                  </span>

                </div>

                <div className="battery-box">

                  <FaBatteryHalf
                    style={{ color: "#22c55e" }}
                  />{" "}
                  {watch?.batteryLevel || "--"}%

                </div>

              </div>

              {/* STATS */}

              <div className="watch-stats">

                <div className="stat-item">

                  <span>
                    <FaHeart
                      style={{ color: "red" }}
                    />{" "} Heart Rate
                  </span>

                  <strong>
                    {watch?.heartRate || "--"}
                    {" "}
                    BPM
                  </strong>

                </div>

                <div className="stat-item">

                  <span>
                    <FaWalking style={{ color: "#2563eb" }} /> {" "} Steps
                  </span>

                  <strong>
                    {watch?.stepCount || "--"}
                  </strong>

                </div>

                <div className="stat-item">

                  <span>
                    <FaFaceSmileBeam
                      style={{ color: "#facc15" }}
                    />{" "} Emotion
                  </span>

                  <strong>
                    {watch?.emotion || "--"}
                  </strong>

                </div>

              </div>

              {/* FOOTER */}

              <div className="watch-footer">

                <span>
                  Last Update:
                </span>

                <strong>

                  {watch?.createdAt
                    ?.slice(11, 16) || "--"}

                </strong>

              </div>

            </div>
          ))

        ) : (

          <div className="empty-box">

            <h2>
              No Watches Connected
            </h2>

            <p>
              Add a smartwatch
              from Settings
            </p>

          </div>

        )}

      </div>

    </div>
  );
}