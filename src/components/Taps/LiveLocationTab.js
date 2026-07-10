import {
  FaStopwatch,
  FaHeart,
  FaBatteryHalf,
  FaMapMarkerAlt,
  FaCity,
  FaLocationArrow,
  FaClock
} from "react-icons/fa";

import { MdWatch } from "react-icons/md";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";

import { getWatchData } from "../../Services/watchService";
import { getZones } from "../../Services/zoneService";
import { getPlaceName } from "../../Services/locationService";

import "./LiveLocationTab.css";

export default function LiveLocationTab({ user }) {

  const [allWatches, setAllWatches] = useState([]);
  const [zones, setZones] = useState([]);
  const [locationInfo, setLocationInfo] = useState({});
  const [selectedWatch, setSelectedWatch] = useState(null);

  const colors = ["red", "blue", "green", "orange", "violet"];

  // Icon
  const getIcon = (color) =>
    new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

  // Zones
  useEffect(() => {
    const serial = user?.serialNumbers?.[0];
    if (!serial) return;

    getZones(serial)
      .then(setZones)
      .catch(console.log);
  }, [user]);

  // Watches
  useEffect(() => {
    if (!user?.serialNumbers?.length) return;

    Promise.all(
      user.serialNumbers.map(async (serial) => {
        try {
          return await getWatchData(serial);
        } catch {
          return null;
        }
      })
    )
      .then((data) => {
        setAllWatches(data.filter(Boolean));
      })
      .catch(console.log);

  }, [user]);

  // Location names
  useEffect(() => {
    allWatches.forEach((watch) => {
      if (watch?.latitude && watch?.longitude) {
        getPlaceName(watch.latitude, watch.longitude)
          .then((name) => {
            setLocationInfo((prev) => ({
              ...prev,
              [watch.serialNumber]: {
                road: name?.road,
                city: name?.city,
              },
            }));
          })
          .catch(console.log);
      }
    });
  }, [allWatches]);

  // protect from failure
  if (!allWatches.length || !allWatches[0]?.latitude) {
    return <h2>Loading map...</h2>;
  }

  const data = selectedWatch || allWatches[0];

  return (
    <div className="location-page">

      <h1>Live Location</h1>

      <MapContainer
        center={[allWatches[0].latitude, allWatches[0].longitude]}
        zoom={14}
        className="map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* WATCHES (safe) */}
        {allWatches
          .filter(w => w?.latitude && w?.longitude)
          .map((watch, index) => (
            <Marker
              key={watch.serialNumber}
              position={[watch.latitude, watch.longitude]}
              icon={getIcon(colors[index % colors.length])}
              eventHandlers={{
                click: () => setSelectedWatch(watch),
              }}
            >
              <Popup>
                <strong><MdWatch /> {watch.serialNumber}</strong>
                <br />
                <FaHeart style={{ color: "red" }} /> {watch.heartRate}
                <br />
                <FaBatteryHalf /> {watch.batteryLevel}%
              </Popup>
            </Marker>
          ))}

        {/* ZONES */}
        {zones.map((zone) => (
          <Circle
            key={zone._id}
            center={[zone.centerLat, zone.centerLng]}
            radius={zone.radiusMeters}
          />
        ))}

      </MapContainer>

      {/* INFO */}
      <div className="location-info">

        <div className="info-card">
          <h3><FaStopwatch /> Serial</h3>
          <p>{data?.serialNumber}</p>
        </div>

        <div className="info-card">
          <h3><FaMapMarkerAlt /> Street</h3>
          <p>{locationInfo?.[data?.serialNumber]?.road || "Loading..."}</p>
        </div>

        <div className="info-card">
          <h3><FaCity /> City</h3>
          <p>{locationInfo?.[data?.serialNumber]?.city || "Loading..."}</p>
        </div>

        <div className="info-card">
          <h3><FaLocationArrow /> Latitude</h3>
          <p>{data?.latitude}</p>
        </div>

        <div className="info-card">
          <h3><FaLocationArrow /> Longitude</h3>
          <p>{data?.longitude}</p>
        </div>

        <div className="info-card">
          <h3><FaClock /> Last Update</h3>
          <p>{data?.createdAt}</p>
        </div>

      </div>

    </div>
  );
}