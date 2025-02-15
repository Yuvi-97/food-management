import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [activeSection, setActiveSection] = useState(""); // "food", "waste", "history", or "receive"
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonation = {
      type: activeSection,
      foodType,
      quantity,
      expirationDate: activeSection === "food" ? expirationDate : "N/A",
      pickupTime,
      pickupAddress,
      status: "Pending",
      receiver: null, // No receiver yet
      date: new Date().toLocaleDateString(),
    };

    setHistory([newDonation, ...history]);
    setShowPopup(true);
    setRewardPoints(rewardPoints + 10); // Add 10 reward points for each donation
    resetForm();
  };

  const resetForm = () => {
    setActiveSection("");
    setFoodType("");
    setQuantity("");
    setExpirationDate("");
    setPickupAddress("");
    setPickupTime("");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleReceive = (index) => {
    if (!receiverName || !receiverContact) {
      alert("Please enter receiver details before accepting.");
      return;
    }

    const updatedHistory = [...history];
    updatedHistory[index].status = "Received";
    updatedHistory[index].receiver = {
      name: receiverName,
      contact: receiverContact,
    };

    setHistory(updatedHistory);
    setReceiverName("");
    setReceiverContact("");
  };

  return (
    <>
      <Header />
      <div className="slogan">
        <h2>“Your Donation Can Feed the Hungry and Save the Planet!”</h2>
      </div>

      <div className="donor-dashboard">
        <div className="dashboard-hero">
          <div className="hero-options">
            <button
              onClick={() => setActiveSection("food")}
              className={activeSection === "food" ? "active" : ""}
            >
              Donate Food 🍛
            </button>
            <button
              onClick={() => setActiveSection("waste")}
              className={activeSection === "waste" ? "active" : ""}
            >
              Donate Waste 🗑️
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={activeSection === "history" ? "active" : ""}
            >
              View Donation History 📜
            </button>
            <button
              onClick={() => setActiveSection("receive")}
              className={activeSection === "receive" ? "active" : ""}
            >
              Receive Food 🍽️
            </button>
          </div>
        </div>

        {/* Reset Button */}
        {activeSection && activeSection !== "history" && activeSection !== "receive" && (
          <button className="reset-button" onClick={resetForm}>
            Go Back to Donation Options
          </button>
        )}

        {/* Donation Form */}
        {activeSection && activeSection !== "history" && activeSection !== "receive" && (
          <form onSubmit={handleSubmit} className="donation-form">
            <label>Food Type:</label>
            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="grains">Grains</option>
              <option value="vegetables">Vegetables</option>
              <option value="packaged">Packaged Goods</option>
              <option value="leftovers">Leftovers</option>
            </select>

            <label>Quantity (kg/liters):</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            {activeSection === "food" && (
              <>
                <label>Expiration Date:</label>
                <input
                  type="date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </>
            )}

            <label>Pickup Address:</label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              required
            />

            <label>Pickup Time:</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
            />

            <button type="submit">Submit Donation</button>
          </form>
        )}

        {/* Donation History */}
        {activeSection === "history" && (
          <div className="donation-history">
            <h3>Donation History 📜</h3>
            {history.length === 0 ? (
              <p>No donations made yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Pickup Time</th>
                    <th>Status</th>
                    <th>Receiver</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type === "food" ? "Extra Food" : "Waste Food"}</td>
                      <td>{item.foodType}</td>
                      <td>{item.quantity} kg</td>
                      <td>{item.pickupTime}</td>
                      <td>{item.status}</td>
                      <td>{item.receiver ? `${item.receiver.name} (${item.receiver.contact})` : "—"}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Receive Food Section */}
        {activeSection === "receive" && (
          <div className="receive-food">
            <h3>Available Donated Food 🍽️</h3>
            {history.filter((item) => item.status === "Pending").length === 0 ? (
              <p>No available donations at the moment.</p>
            ) : (
              <>
                <div className="receiver-form">
                  <label>Receiver Name:</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    required
                  />

                  <label>Receiver Contact:</label>
                  <input
                    type="text"
                    value={receiverContact}
                    onChange={(e) => setReceiverContact(e.target.value)}
                    required
                  />
                </div>

                <ul>
                  {history
                    .filter((item) => item.status === "Pending")
                    .map((item, index) => (
                      <li key={index}>
                        {item.foodType} - {item.quantity} kg
                        <button onClick={() => handleReceive(index)}>Accept</button>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default DonorDashboard;
