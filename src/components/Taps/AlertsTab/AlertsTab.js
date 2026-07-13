import {
  FaHeart,
  FaBatteryHalf,
  FaMapMarkerAlt,
  FaClock,
  FaSpinner
} from "react-icons/fa";
import { MdWatch } from "react-icons/md"

import { useEffect, useState } from "react";

import { getZones, } from "../../../Services/zoneService";

import "./AlertsTab.css";

export default function AlertsTab({
  watchData,
  user,
}) {

  const [zones, setZones] =
    useState([]);

  //  GET ALL ZONES
  useEffect(() => {

    if (!user?.serialNumbers?.length)
      return;

    Promise.all(

      user.serialNumbers.map(
        (serial) =>
          getZones(serial)
      )

    )
      .then((results) => {

        //  merge arrays
        const allZones =
          results.flat();

        setZones(allZones);

      })
      .catch(console.log);

  }, [user]);

  return (

    <div className="alerts-page">

      <h1>
        Alerts & Safety
      </h1>

      {/* ALERTS */}

      <div className="alerts-grid">

        {watchData?.map((watch) => {

          const highHeartRate =
            watch?.heartRate > 120;

          const lowBattery =
            watch?.batteryLevel < 20;

          return (

            <div
              className="watch-alerts"
              key={watch._id}
            >

              <div className="watch-header">

                <h2>
                  <MdWatch/> 
                  {" "}
                  {watch.serialNumber}
                </h2>

                <span className="live-status">
                  <FaSpinner className="spin" /> LIVE
                </span>

              </div>

              {/* HEART RATE */}

              {highHeartRate ? (

                <div className="alert-card danger">

                  <h3>
                    <FaHeart style={{ color: "red" }} /> High Heart Rate
                  </h3>

                  <p>

                    Current:
                    {" "}

                    {watch?.heartRate}
                    {" "}
                    BPM

                  </p>

                </div>

              ) : (

                <div className="alert-card success">

                  <h3>
                    <FaHeart style={{ color: "red" }} /> Heart Rate Stable
                  </h3>

                  <p>

                    {watch?.heartRate || "--"}
                    {" "}
                    BPM

                  </p>

                </div>

              )}

              {/* BATTERY */}

              {lowBattery ? (

                <div className="alert-card warning">

                  <h3>
                    <FaBatteryHalf /> Low Battery
                  </h3>

                  <p>

                    Battery:
                    {" "}

                    {watch?.batteryLevel}%

                  </p>

                </div>

              ) : (

                <div className="alert-card success">

                  <h3>
                    <FaBatteryHalf /> Battery Good
                  </h3>

                  <p>

                    {watch?.batteryLevel || "--"}%

                  </p>

                </div>

              )}

              {/* LAST UPDATE */}

              <div className="alert-card info">

                <h3>
                  <FaClock /> Last Update
                </h3>

                <p>

                  {new Date(
                    watch?.createdAt
                  ).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}

                </p>

              </div>

            </div>
          );
        })}

      </div>

      {/* SAFE ZONES */}

      <div className="zones-section">

        <h2>
          Allowed Zones
        </h2>

        <div className="zones-grid">

          {zones?.map((zone) => (

            <div
              className="zone-card"
              key={zone._id}
            >

              <h3>
                <FaMapMarkerAlt />
                {" "}
                {zone.zoneName}
              </h3>

              <p>

                Serial:
                {" "}

                {zone.serialNumber}

              </p>

              <p>

                Radius:
                {" "}

                {zone.radiusMeters}
                {" "}
                meters

              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}