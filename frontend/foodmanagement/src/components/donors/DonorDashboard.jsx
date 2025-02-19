import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DonorDashboard.css";
import LocationPicker from "./locationPicker";

const API_URL = "http://192.168.181.89:8080/api/donations";

const DonorDashboard = () => {
  const [activeSection, setActiveSection] = useState(""); 
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/all`)
      .then(response => setHistory(response.data))
      .catch(error => console.error("Error fetching donations:", error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLocationSelect = (location) => {
    setPickupAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
  };

  // ✅ Move resetForm OUTSIDE handleSubmit
  const resetForm = () => {
    setFoodType("");
    setQuantity("");
    setExpirationDate("");
    setPickupAddress("");
    setPickupTime("");
    setFile(null);
    setActiveSection("");
  };

  // ✅ Move handleMoneyDonation OUTSIDE handleSubmit
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
      setRewardPoints(rewardPoints + 10);
      resetForm();
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const [openIndex, setOpenIndex] = useState(null); // Track open question

const faqData = [
  { question: "How does my donation help?", answer: "Your donation provides food to those in need through partner NGOs and charities." },
  { question: "Where will the donated food go?", answer: "The donated food is sent to homeless shelters, orphanages, and community kitchens." },
  { question: "Can I donate multiple times?", answer: "Yes! You can donate as many times as you want and earn reward points." }
];

const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index); // Toggle open/close
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
            <button onClick={() => setShowPopup(true)}>Donate Food 🍛</button>
            <button onClick={() => setShowPopup(true)}>Donate Waste 🗑️</button>
            <button onClick={() => setActiveSection("history")}>View Donation History 📜</button>
            <button onClick={() => setActiveSection("receive")}>Receive Food 🍽️</button>
          </div>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Donation Form</h2>
              <form onSubmit={handleSubmit} className="donation-form">
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

                <div className="form-group">
                  <label>Pickup Address:</label>
                  <input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required />
                  <LocationPicker onSelectLocation={handleLocationSelect} />
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
                <button type="button" className="close-button" onClick={() => setShowPopup(false)}>Close</button>
              </form>
            </div>
          </div>
        )}

     <div className="money-donation">
      <h2>Support Our Cause</h2>
      <input
        type="number"
        placeholder="Enter amount (₹)"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
      />
      <button onClick={handleMoneyDonation} className="donate-money-button">
        Donate Money
      </button>
    </div>

    {/* Common Queries Section */}
    <div className="common-queries">
      <h2>Common Queries</h2>
      <ul>
        {faqData.map((faq, index) => (
          <li key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question} {openIndex === index ? "▲" : "▼"}
            </button>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </li>
        ))}
      </ul>
    </div>

    {/* Benefits of Donating */}
    <div className="donor-benefits common-queries">
      <h2>Why Donate?</h2>
      <p>✨ Earn reward points for every donation!</p>
      <p>🌱 Help reduce food waste and support those in need.</p>
      <p>💖 Be a hero in your community!</p>
    </div>

      </div>

      <Footer />
    </>
  );
};

export default DonorDashboard;
