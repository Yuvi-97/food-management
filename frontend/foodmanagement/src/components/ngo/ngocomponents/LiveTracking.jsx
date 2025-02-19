import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = [28.7041, 77.1025]; // Default center (Delhi)

// Dummy donation requests
const donationRequests = [
  { id: 1, foodType: "Vegetables", quantity: "10kg", location: [28.7041, 77.1025], address: "Connaught Place, Delhi" },
  { id: 2, foodType: "Rice", quantity: "20kg", location: [28.5355, 77.3910], address: "Sector 62, Noida" },
  { id: 3, foodType: "Fruits", quantity: "5kg", location: [28.4595, 77.0266], address: "Cyber Hub, Gurugram" },
];

// Dummy delivery route (Delhi → Noida)
const deliveryPath = [
  [28.7041, 77.1025], // Start - Delhi
  [28.6353, 77.2250], // Mid-point 1
  [28.6139, 77.2090], // Mid-point 2
  [28.5355, 77.3910], // End - Noida
];

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(deliveryPath[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < deliveryPath.length - 1) {
        setIndex(index + 1);
        setCurrentPosition(deliveryPath[index + 1]);
      }
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "30%", padding: "20px", background: "#f5f5f5" }}>
        <h3>Donation Requests</h3>
        <ul>
          {donationRequests.map((request) => (
            <li key={request.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
              <strong>{request.foodType}</strong> - {request.quantity}
              <br />
              📍 {request.address}
            </li>
          ))}
        </ul>
      </div>

      {/* Map Container */}
      <div style={{ width: "70%" }}>
        <MapContainer center={center} zoom={10} style={{ height: "500px", width: "100%" }}>
          {/* OpenStreetMap Tile Layer */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Markers for Donation Requests */}
          {donationRequests.map((request) => (
            <Marker key={request.id} position={request.location}>
              <Popup>{request.foodType} - {request.quantity}kg <br /> {request.address}</Popup>
            </Marker>
          ))}

          {/* Delivery Route */}
          <Polyline positions={deliveryPath} color="red" />

          {/* Moving Marker (Delivery Vehicle) */}
          <Marker position={currentPosition}>
            <Popup>🚚 Delivery Vehicle</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveTracking;
