import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Lottie from "react-lottie";
import bikeAnimation from "../ngoassets/bike-animation.json";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "../ngostyles/LiveTracking.css";

// Custom Marker Icons
const userIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448611.png", // Example driver icon
  iconSize: [35, 35],
  iconAnchor: [15, 45],
});

const calculateETA = (distanceKm, speedKmh = 40) => {
  const timeInHours = distanceKm / speedKmh;
  const timeInMinutes = Math.round(timeInHours * 60);
  return `${timeInMinutes} mins`;
};

// Animate map to follow delivery person
const DeliveryAnimation = ({ driverLocation }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(driverLocation, 15, { animate: true });
  }, [driverLocation, map]);
  return null;
};

const LiveTracking = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order
  const [mapVisible, setMapVisible] = useState(false); // Control map visibility
  const [acceptedOrders, setAcceptedOrders] = useState([]);

  // Load accepted orders from localStorage
  useEffect(() => {
    const storedAcceptedOrders = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    setAcceptedOrders(storedAcceptedOrders);
  }, []);

  // Get User's Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);

          // Simulate driver 2 km away
          const driverLoc = {
            lat: userLoc.lat + 0.018,
            lng: userLoc.lng + 0.018,
          };
          setDriverLocation(driverLoc);
        },
        (error) => console.error("Error fetching location", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bikeAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleTrackOrder = (order) => {
    setSelectedOrder(order); // Set the selected order
    setMapVisible(true); // Show the map when order is selected
  };

  return (
    <div className="live-tracking">
      <h2>Live Tracking</h2>

      {/* Display List of Accepted Orders */}
      <div className="accepted-orders">
        <h3>Accepted Orders</h3>
        <ul>
          {acceptedOrders.map((order) => (
            <li key={order.orderId}>
              <strong>{order.donor}</strong> - {order.item} ({order.quantity})
              <br />
              Address: {order.address}
              <br />
              Order ID: {order.orderId}
              <button onClick={() => handleTrackOrder(order)}>
                Track This Order
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Delivery Details */}
      {selectedOrder ? (
        <div className="product-details">
          <h3>Delivery Details</h3>
          <p><strong>Item:</strong> {selectedOrder.item}</p>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Donor:</strong> {selectedOrder.donor}</p>
        </div>
      ) : (
        <p>Click on an order to track it.</p>
      )}

      {/* Map Display */}
      {mapVisible && userLocation && driverLocation && selectedOrder ? (
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
        mapVisible && <p>Loading map...</p>
      )}
    </div>
  );
};

export default LiveTracking;
