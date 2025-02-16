import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import bikeAnimation from "../ngoassets/bike-animation.json";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../ngostyles/LiveTracking.css";
import axios from "axios";

// Custom Marker Icons
const userIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448611.png",
  iconSize: [35, 35],
  iconAnchor: [15, 45],
});

const DeliveryAnimation = ({ driverLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (driverLocation) {
      map.setView(driverLocation, 15, { animate: true });
    }
  }, [driverLocation, map]);
  return null;
};

const LiveTracking = () => {
  const navigate = useNavigate();
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  const fetchAcceptedOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/donations/all");
      const inProgressOrders = response.data.filter((order) => order.status === "In Progress");
      setAcceptedOrders(inProgressOrders);
    } catch (error) {
      console.error("Error fetching accepted orders:", error);
    }
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);

    const userLoc = {
      lat: order.latitude || 12.9716, // Replace with actual lat
      lng: order.longitude || 77.5946, // Replace with actual lng
    };
    setUserLocation(userLoc);

    const driverLoc = {
      lat: userLoc.lat + 0.018,
      lng: userLoc.lng + 0.018,
    };
    setDriverLocation(driverLoc);
  };

  const handleFinishDelivery = async () => {
    if (!selectedOrder) return;
    try {
      await axios.put(`http://localhost:8080/api/donations/update-status/${selectedOrder.id}?status=Completed`);
      fetchAcceptedOrders(); // Refresh the order list
      setSelectedOrder(null); // Clear the tracking view
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bikeAnimation,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="live-tracking">
      <h2>Live Tracking</h2>

      <div className="order-list">
        <h3>Accepted Orders</h3>
        <ul>
          {acceptedOrders.length > 0 ? (
            acceptedOrders.map((order) => (
              <li key={order.id}>
                <strong>{order.foodType}</strong> - {order.quantity} kg
                <br />
                Donor: {order.donor}
                <br />
                <button className="btn-track" onClick={() => handleTrackOrder(order)}>
                  Track Order
                </button>
              </li>
            ))
          ) : (
            <p>No accepted orders</p>
          )}
        </ul>
      </div>

      {selectedOrder && (
        <div className="tracking-section">
          <h3>Tracking Order: {selectedOrder.foodType}</h3>
          <p><strong>Quantity:</strong> {selectedOrder.quantity} kg</p>
          <p><strong>Donor:</strong> {selectedOrder.donor}</p>
          <button className="btn-finish" onClick={handleFinishDelivery}>Finish Delivery</button>

          {userLocation && driverLocation ? (
            <div style={{ height: "400px", width: "100%", marginTop: "20px" }}>
              <MapContainer center={userLocation} zoom={15} className="tracking-map">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>Receiver Location</Popup>
                </Marker>
                <Marker position={driverLocation} icon={driverIcon}>
                  <Popup>
                    <Lottie options={defaultOptions} height={50} width={50} />
                    <p>Delivery Person (2 km away)</p>
                  </Popup>
                </Marker>
                <DeliveryAnimation driverLocation={driverLocation} />
              </MapContainer>
            </div>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveTracking;
