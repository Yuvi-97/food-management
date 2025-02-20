import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiInstance";
import "../ngostyles/FoodManagement.css";

const FoodManagement = () => {
  const [liveRequests, setLiveRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [declinedRequests, setDeclinedRequests] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("liveRequests");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const pendingRes = await api.get("/api/donations/pending");
      const allRes = await api.get("/api/donations/all");

      setLiveRequests(pendingRes.data);
      setAcceptedRequests(allRes.data.filter((d) => d.status === "In Progress"));
      setDeclinedRequests(allRes.data.filter((d) => d.status === "Rejected"));
      setOrderHistory(allRes.data);
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  const updateDonationStatus = async (id, status) => {
    try {
      await api.put(`/api/donations/update-status/${id}`, null, {
        params: { status },
      });
      fetchData(); // Refresh the data after update
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  return (
    <div className="food-management">
      <h2>Food Management</h2>

      <div className="tab-buttons">
        <button className="btn-live" onClick={() => setSelectedTab("liveRequests")}>
          Live Requests
        </button>
        <button className="btn-accept" onClick={() => setSelectedTab("acceptedRequests")}>
          Accepted Requests
        </button>
        <button className="btn-decline" onClick={() => setSelectedTab("declinedRequests")}>
          Declined Orders
        </button>
        <button className="btn-history" onClick={() => setSelectedTab("orderHistory")}>
          Order History
        </button>
      </div>

      <div className="requests-container">
        {/* Live Requests */}
        {selectedTab === "liveRequests" && (
          <div className="live-requests">
            <h3>Live Requests (Pending Donations)</h3>
            <ul>
              {liveRequests.length > 0 ? (
                liveRequests.map((request) => (
                  <li key={request.id}>
                    <strong>{request.foodType}</strong> - {request.quantity} kg
                    <br />
                    Address: {request.pickupAddress}
                    <br />
                    {/* Display Image If Available */}
                    {request.imageUrl && (
                      <img src={request.imageUrl} alt="Donation" width="150" height="100" />
                    )}
                    <br />
                    <button className="btn-accept" onClick={() => updateDonationStatus(request.id, "In Progress")}>
                      Accept
                    </button>
                    <button className="btn-decline" onClick={() => updateDonationStatus(request.id, "Rejected")}>
                      Decline
                    </button>
                  </li>
                ))
              ) : (
                <p>No pending requests</p>
              )}
            </ul>
          </div>
        )}

        {/* Accepted Requests */}
        {selectedTab === "acceptedRequests" && (
          <div className="accepted-requests">
            <h3>Accepted Requests (In Progress Donations)</h3>
            <ul>
              {acceptedRequests.length > 0 ? (
                acceptedRequests.map((request) => (
                  <li key={request.id}>
                    <strong>{request.foodType}</strong> - {request.quantity} kg
                    <br />
                    Address: {request.pickupAddress}
                    <br />
                    {/* Display Image If Available */}
                    {request.imageUrl && (
                      <img src={request.imageUrl} alt="Accepted Donation" width="150" height="100" />
                    )}
                    <br />
                    Status: 🚚 In Progress
                    <br />
                    <button className="btn-track" onClick={() => navigate("/live-tracking", { state: { order: request } })}>
                      Track Order
                    </button>
                    <button className="btn-finish" onClick={() => updateDonationStatus(request.id, "Completed")}>
                      Finish
                    </button>
                  </li>
                ))
              ) : (
                <p>No active deliveries</p>
              )}
            </ul>
          </div>
        )}

        {/* Declined Orders */}
        {selectedTab === "declinedRequests" && (
          <div className="declined-requests">
            <h3>Declined Orders</h3>
            <ul>
              {declinedRequests.length > 0 ? (
                declinedRequests.map((request) => (
                  <li key={request.id}>
                    <strong>{request.foodType}</strong> - {request.quantity} kg
                    <br />
                    Address: {request.pickupAddress}
                    <br />
                    {/* Display Image If Available */}
                    {request.imageUrl && (
                      <img src={request.imageUrl} alt="Declined Donation" width="150" height="100" />
                    )}
                    <br />
                    Status: ❌ Rejected
                  </li>
                ))
              ) : (
                <p>No declined orders</p>
              )}
            </ul>
          </div>
        )}

        {/* Order History */}
        {selectedTab === "orderHistory" && (
          <div className="order-history">
            <h3>Order History (All Donations)</h3>
            <ul>
              {orderHistory.length > 0 ? (
                orderHistory.map((request) => (
                  <li key={request.id}>
                    <strong>{request.foodType}</strong> - {request.quantity} kg
                    <br />
                    Address: {request.pickupAddress}
                    <br />
                    {/* Display Image If Available */}
                    {request.imageUrl && (
                      <img src={request.imageUrl} alt="Order History Donation" width="150" height="100" />
                    )}
                    <br />
                    Status: {request.status}
                  </li>
                ))
              ) : (
                <p>No donation history available</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodManagement;
