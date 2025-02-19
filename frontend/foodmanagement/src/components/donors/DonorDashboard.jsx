import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./DonorDashboard.css";
import api from "../api/apiInstance";
import LocationPicker from "./locationPicker";
const API_URL = "/api/donations";

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
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/all`)
      .then(response => setHistory(response.data))
      .catch(error => console.error("Error fetching donations:", error));
  }, []);

  const handleLocationSelect = (location) => {
    setPickupAddress(`Lat: ${location.lat}, Lng: ${location.lng}`);
  };

  const handleMoneyDonation = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      await axios.post(`${API_URL}/donate-money, { amount: donationAmount }`);
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
      const response = await api.post(`${API_URL}/add`, formData, {
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

  const resetForm = () => {
    setFoodType("");
    setQuantity("");
    setExpirationDate("");
    setPickupAddress("");
    setPickupTime("");
    setFile(null);
    setActiveSection("");
  };

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

      <div className="donation-options">
            <button onClick={() => setShowPopup(true)}>Donate Food 🍛</button>
            <button onClick={() => setShowPopup(true)}>Donate Waste 🗑️</button>
            <button onClick={() => setActiveSection("history")}>View Donation History 📜</button>
            <button onClick={() => setActiveSection("receive")}>Receive Food 🍽️</button>
        </div>
      
      <div className="stats-section">
        <h2>India's Hunger Crisis</h2>
        <p>⚠️ Over 190 million people in India go hungry daily.</p>
        <p>⚠️ 7,000 people die of hunger-related causes every day.</p>
        <p>⚠️ 40% of the food produced in India goes to waste.</p>
        <h3>How You Can Help:</h3>
        <p>🍽️ Donating food helps bridge the gap between excess and scarcity.</p>
        <p>🌱 Reducing waste means a more sustainable planet.</p>
      </div>
      
      <div className="donor-benefits">
        <h2>Why Donate?</h2>
        <p>✔️ Earn Reward Points for Every Donation</p>
        <p>✔️ Help those in need while reducing food waste</p>
        <p>✔️ Get recognized as a responsible contributor to society</p>
      </div>

      <div className="donor-benefits">
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

      <div className="tax-benefits">
        <h2>Tax Benefits of Donating Food in India</h2>
        <p>Under Section 80G of the Income Tax Act, 1961, donations to registered charities and NGOs are eligible for tax deductions. Donors can claim deductions of up to 50% or 100% of the donated amount, depending on the organization. Contributions in kind, such as food donations, may also be eligible if routed through approved organizations.</p>
        <p>By donating, not only do you help fight hunger, but you also receive financial benefits through tax deductions. Make sure to obtain a valid donation receipt from the registered organization to claim your tax exemption.</p>
        <p>Additionally, corporate donors can benefit from CSR (Corporate Social Responsibility) tax benefits under Section 135 of the Companies Act, 2013. Companies that donate food or funds to eligible organizations can include such contributions in their mandatory CSR spending, making food donation a viable and impactful corporate social initiative.</p>
        <p>Beyond tax benefits, donating food contributes to social welfare, ensuring that no edible food goes to waste while nourishing underprivileged communities. It helps reduce the burden on food banks and NGOs, fostering a culture of generosity and sustainability.</p>
      </div>
      
      
      
      {activeSection && (
        <button className="reset-button" onClick={resetForm}>Go Back</button>
      )}

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
                  <input type="file"/>
                </div>

                <button type="submit" className="submit-button">Submit Donation</button>
                <button type="button" className="close-button" onClick={() => setShowPopup(false)}>Close</button>
              </form>
            </div>
          </div>
        )}
      <Footer />
    </>
  );
};

export default DonorDashboard;



