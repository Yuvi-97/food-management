import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DonorDashboard.css";
import api from "../api/apiInstance";

const API_URL = "/api/donations";

const DonorDashboard = () => {
  const [activeSection, setActiveSection] = useState(""); // "food", "waste", "history", "receive"
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");

  // Fetch donation history
  useEffect(() => {
    axios.get(`${API_URL}/all`)
      .then(response => setHistory(response.data))
      .catch(error => console.error("Error fetching donations:", error));
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("foodType", foodType);
    formData.append("quantity", quantity);
    formData.append("pickupAddress", pickupAddress);
    formData.append("pickupTime", pickupTime);
    if (expirationDate) formData.append("expirationDate", expirationDate);
    if (file) formData.append("file", file);

    try {
      const response = await api.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setHistory([response.data, ...history]);
      setShowPopup(true);
      setRewardPoints(rewardPoints + 10);
      resetForm();
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFoodType("");
    setQuantity("");
    setExpirationDate("");
    setPickupAddress("");
    setPickupTime("");
    setFile(null);
    setActiveSection("");
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Accept a donation (for receivers)
  const handleReceive = async (id) => {
    if (!receiverName || !receiverContact) {
      alert("Please enter receiver details before accepting.");
      return;
    }

    try {
      await axios.put(`${API_URL}/update-status/${id}`, null, {
        params: { status: "Received" },
      });

      const updatedHistory = history.map((item) =>
        item.id === id ? { ...item, status: "Received" } : item
      );
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
            <button onClick={() => setActiveSection("food")}>Donate Food 🍛</button>
            <button onClick={() => setActiveSection("waste")}>Donate Waste 🗑️</button>
            <button onClick={() => setActiveSection("history")}>View Donation History 📜</button>
            <button onClick={() => setActiveSection("receive")}>Receive Food 🍽️</button>
          </div>
        </div>

        {activeSection && activeSection !== "history" && activeSection !== "receive" && (
          <button className="reset-button" onClick={resetForm}>Go Back</button>
        )}

        {/* Donation Form */}
        {activeSection && activeSection !== "history" && activeSection !== "receive" && (
          <form onSubmit={handleSubmit} className="donation-form">
            <label>Food Type:</label>
            <select value={foodType} onChange={(e) => setFoodType(e.target.value)} required>
              <option value="">Select</option>
              <option value="grains">Grains</option>
              <option value="vegetables">Vegetables</option>
              <option value="packaged">Packaged Goods</option>
              <option value="leftovers">Leftovers</option>
            </select>

            <label>Quantity (kg/liters):</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />

            {activeSection === "food" && (
              <>
                <label>Expiration Date:</label>
                <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
              </>
            )}

            <label>Pickup Address:</label>
            <input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required />

            <label>Pickup Time:</label>
            <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />

            <label>Upload Image:</label>
            <input type="file" onChange={handleFileChange} />

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
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Pickup Time</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.id}>
                      <td>{item.foodType}</td>
                      <td>{item.quantity} kg</td>
                      <td>{item.pickupTime}</td>
                      <td>{item.status}</td>
                      <td>{new Date(item.timestamp).toLocaleDateString()}</td>
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
                <label>Receiver Name:</label>
                <input type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required />

                <label>Receiver Contact:</label>
                <input type="text" value={receiverContact} onChange={(e) => setReceiverContact(e.target.value)} required />

                <ul>
                  {history.filter((item) => item.status === "Pending").map((item) => (
                    <li key={item.id}>
                      {item.foodType} - {item.quantity} kg
                      <button onClick={() => handleReceive(item.id)}>Accept</button>
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
