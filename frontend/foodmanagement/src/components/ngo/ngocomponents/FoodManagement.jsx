import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../ngostyles/FoodManagement.css";

const calculateETA = (distanceKm) => {
  const timeInHours = distanceKm / 40;
  return Math.round(timeInHours * 60);
};

const generateOrderId = () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

const mockRequests = [
  { id: 1, donor: "Restaurant A", item: "Cooked Meals", quantity: "10 Packs", distance: 5, address: "123 Main St, City A" },
  { id: 2, donor: "Hotel B", item: "Fruits", quantity: "20 kg", distance: 15, address: "456 Market Road, City B" },
  { id: 3, donor: "Caterer C", item: "Rice & Dal", quantity: "50 Servings", distance: 80, address: "789 Highway, City C" },
];

const FoodManagement = () => {
  const [liveRequests, setLiveRequests] = useState(mockRequests);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [declinedRequests, setDeclinedRequests] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("liveRequests");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAcceptedRequests = JSON.parse(localStorage.getItem("acceptedRequests")) || [];
    const savedDeclinedRequests = JSON.parse(localStorage.getItem("declinedRequests")) || [];
    const savedOrderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    setAcceptedRequests(savedAcceptedRequests);
    setDeclinedRequests(savedDeclinedRequests);
    setOrderHistory(savedOrderHistory);
  }, []);

  const acceptDonation = (request) => {
    if (calculateETA(request.distance) <= 60) {
      const updatedRequest = { ...request, orderId: generateOrderId() };
      const updatedAccepted = [...acceptedRequests, updatedRequest];

      setAcceptedRequests(updatedAccepted);
      localStorage.setItem("acceptedRequests", JSON.stringify(updatedAccepted));
    } else {
      alert("Cannot accept this donation. Delivery time exceeds 60 minutes.");
    }
  };

  const declineDonation = (request) => {
    const updatedDeclined = [...declinedRequests, request];
    setDeclinedRequests(updatedDeclined);
    localStorage.setItem("declinedRequests", JSON.stringify(updatedDeclined));
  };

  const completeOrder = (orderId) => {
    const completedRequest = acceptedRequests.find((req) => req.orderId === orderId);
    if (completedRequest) {
      const updatedHistory = [...orderHistory, completedRequest];
      setOrderHistory(updatedHistory);
      localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
      cancelAcceptedDonation(orderId);
    }
  };

  const cancelAcceptedDonation = (orderId) => {
    const remainingAccepted = acceptedRequests.filter((req) => req.orderId !== orderId);
    const declinedRequest = acceptedRequests.find((req) => req.orderId === orderId);
    
    if (declinedRequest) {
      const updatedDeclined = [...declinedRequests, declinedRequest];
      setDeclinedRequests(updatedDeclined);
      localStorage.setItem("declinedRequests", JSON.stringify(updatedDeclined));
    }

    setAcceptedRequests(remainingAccepted);
    localStorage.setItem("acceptedRequests", JSON.stringify(remainingAccepted));
  };

  const handleLiveTracking = (request) => {
    sessionStorage.setItem("trackingOrder", JSON.stringify(request));
    navigate("/live-tracking");
  };

  return (
    <div className="food-management">
      <h2>Food Management</h2>

      <div className="tab-buttons">
        <button className="btn-live" onClick={() => setSelectedTab("liveRequests")}>Live Requests</button>
        <button className="btn-accept" onClick={() => setSelectedTab("acceptedRequests")}>Accepted Requests</button>
        <button className="btn-decline" onClick={() => setSelectedTab("declinedRequests")}>Declined Orders</button>
        <button className="btn-history" onClick={() => setSelectedTab("orderHistory")}>Order History</button>
      </div>

      <div className="requests-container">
        {selectedTab === "liveRequests" && (
          <div className="live-requests">
            <h3>Live Requests</h3>
            <ul>
              {liveRequests.map((request) => (
                <li key={request.id}>
                  <strong>{request.donor}</strong> - {request.item} ({request.quantity})
                  <br />
                  Address: {request.address}
                  <br />
                  Estimated Delivery: {calculateETA(request.distance)} mins
                  <button className="btn-accept" onClick={() => acceptDonation(request)}>Accept</button>
                  <button className="btn-decline" onClick={() => declineDonation(request)}>Decline</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedTab === "acceptedRequests" && (
          <div className="accepted-requests">
            <h3>Accepted Requests</h3>
            <ul>
              {acceptedRequests.map((request) => (
                <li key={request.orderId}>
                  <strong>{request.donor}</strong> - {request.item} ({request.quantity})
                  <br />
                  Address: {request.address}
                  <br />
                  Order ID: {request.orderId}
                  <br />
                  <button className="btn-track" onClick={() => handleLiveTracking(request)}>Live Tracking</button>
                  <button className="btn-complete" onClick={() => completeOrder(request.orderId)}>Complete</button>
                  <button className="btn-cancel" onClick={() => cancelAcceptedDonation(request.orderId)}>Cancel</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedTab === "declinedRequests" && (
          <div className="declined-requests">
            <h3>Declined Orders</h3>
            <ul>
              {declinedRequests.map((request) => (
                <li key={request.id}>
                  <strong>{request.donor}</strong> - {request.item} ({request.quantity})
                  <br />
                  Address: {request.address}
                  <br />
                  Status: Declined ❌
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedTab === "orderHistory" && (
          <div className="order-history">
            <h3>Order History</h3>
            <ul>
              {orderHistory.map((request, index) => (
                <li key={index}>
                  <strong>{request.donor}</strong> - {request.item} ({request.quantity})
                  <br />
                  Address: {request.address}
                  <br />
                  Order ID: {request.orderId}
                  <br />
                  Status: ✅ Completed
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodManagement;
