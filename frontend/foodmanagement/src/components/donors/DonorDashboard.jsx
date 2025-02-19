import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DonorDashboard.css";

const API_URL = "http://192.168.181.89:8080/api/donations";

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
  const [donationAmount, setDonationAmount] = useState("");

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
      const response = await axios.post(`${API_URL}/add`, formData, {
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

  // Handle monetary donation
  const handleMoneyDonation = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      await axios.post(`${API_URL}/donate-money`, { amount: donationAmount });
      alert("Thank you for your donation!");
      setDonationAmount("");
    } catch (error) {
      console.error("Error processing donation:", error);
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

        {/* New Section: Donor Queries & FAQs */}
        <div className="donor-info-section">
          <h2>Have Questions? We Have Answers!</h2>
          <p>
            Not sure what to donate? Wondering how our food distribution works?
            Check out the common questions below or reach out to us!
          </p>
          <ul>
            <li><strong>Q:</strong> What kind of food can I donate? <br /><strong>A:</strong> You can donate grains, vegetables, packaged food, and leftovers (fresh and safe for consumption).</li>
            <li><strong>Q:</strong> Can I donate expired food? <br /><strong>A:</strong> No, we only accept food that is within its expiration period.</li>
            <li><strong>Q:</strong> How do I schedule a pickup? <br /><strong>A:</strong> You can select your preferred pickup time in the donation form.</li>
          </ul>
        </div>

        {/* Donation Form */}
        {activeSection && activeSection !== "history" && activeSection !== "receive" && (
          <div className="form-container">
            <form onSubmit={handleSubmit} className="donation-form">
              <h2>Donation Form</h2>
              <div className="form-group">
                <label>Food Type:</label>
                <select value={foodType} onChange={(e) => setFoodType(e.target.value)} required>
                  <option value="">Select</option>
                  <option value="grains">Grains</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="packaged">Packaged Goods</option>
                  <option value="leftovers">Leftovers</option>
                </select>
              </div>

              <div className="form-group">
                <label>Quantity (kg/liters):</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              </div>

              {activeSection === "food" && (
                <div className="form-group">
                  <label>Expiration Date:</label>
                  <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                </div>
              )}

              <div className="form-group">
                <label>Pickup Address:</label>
                <input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Pickup Time:</label>
                <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Upload Image:</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <button type="submit" className="submit-button">Submit Donation</button>
            </form>
          </div>
        )}

        {/* Monetary Donation Option */}
        <div className="money-donation">
          <h2>Support Our Cause</h2>
          <p>If you can’t donate food, consider supporting us with a monetary donation.</p>
          <input
            type="number"
            placeholder="Enter amount (₹)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
          <button onClick={handleMoneyDonation} className="donate-money-button">Donate Money</button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DonorDashboard;
