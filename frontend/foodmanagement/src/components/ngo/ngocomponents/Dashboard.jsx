import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../ngostyles/Dashboard.css"

const ApplicationForm = ({ ngoName, closeForm }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    availability: "",
    reference: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.acceptTerms
    ) {
      alert("Please fill in all the required fields.");
    } else {
      alert("Application submitted successfully!");
      closeForm();
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h3>Join {ngoName}</h3>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
          
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            required
          />
          
          <label>Experience in Volunteering (Optional)</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Tell us about your previous volunteer work or interest"
          />

          <label>Availability (Hours per week)</label>
          <input
            type="number"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="How many hours can you volunteer per week?"
            required
          />
          
          <label>Reference (Optional)</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder="Provide a reference (if any)"
          />

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              required
            />
            I accept the terms and conditions.
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Submit Application</button>
            <button type="button" className="btn-secondary" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNgo, setSelectedNgo] = useState("");

  const handleJoinNowClick = (ngoName) => {
    setSelectedNgo(ngoName);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedNgo("");
  };

  const ngoData = [
    {
      id: 1,
      name: "Food For All",
      image: "https://img.freepik.com/free-photo/begging-bridge-with-person-who-handed-bread_1150-22948.jpg?ga=GA1.1.128649846.1723439761&semt=ais_incoming",
      mission: "Providing meals to underprivileged communities.",
    },
    {
      id: 2,
      name: "Waste Free Earth",
      image: "https://img.freepik.com/free-photo/planet-earth-surrounded-by-nature-vegetation_23-2151587916.jpg?ga=GA1.1.128649846.1723439761&semt=ais_incoming",
      mission: "Reducing food waste and promoting sustainability.",
    },
    {
      id: 3,
      name: "Hope Hunger Relief",
      image: "https://img.freepik.com/free-photo/diverse-people-refugee-camps_23-2151561494.jpg?ga=GA1.1.128649846.1723439761&semt=ais_incoming",
      mission: "Feeding homeless individuals and families in need.",
    },
  ];

  const foodManagementData = [
    { name: "Jan", food: 400 },
    { name: "Feb", food: 600 },
    { name: "Mar", food: 700 },
    { name: "Apr", food: 500 },
    { name: "May", food: 650 },
    { name: "Jun", food: 800 },
    { name: "Jul", food: 750 },
    { name: "Aug", food: 900 },
    { name: "Sep", food: 850 },
    { name: "Oct", food: 950 },
    { name: "Nov", food: 1100 },
    { name: "Dec", food: 1200 },
  ];

  const wasteManagementData = [
    { name: "Jan", waste: 300 },
    { name: "Feb", waste: 450 },
    { name: "Mar", waste: 350 },
    { name: "Apr", waste: 400 },
    { name: "May", waste: 380 },
    { name: "Jun", waste: 500 },
    { name: "Jul", waste: 420 },
    { name: "Aug", waste: 460 },
    { name: "Sep", waste: 540 },
    { name: "Oct", waste: 600 },
    { name: "Nov", waste: 700 },
    { name: "Dec", waste: 800 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">NGO Dashboard</h2>
      <p className="dashboard-description">Monitor donations, manage inventory, and track food distribution.</p>

      {/* NGO Details and Cards */}
      <div className="ngo-grid">
        {ngoData.map((ngo) => (
          <div key={ngo.id} className="ngo-card">
            <img src={ngo.image} alt={ngo.name} className="ngo-image" />
            <div className="ngo-content">
              <h3 className="ngo-name">{ngo.name}</h3>
              <p className="ngo-mission">{ngo.mission}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleJoinNowClick(ngo.name)}
              >
                Join {ngo.name}
              </button>
              <button className="btn btn-secondary">Donate Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs for Food and Waste Management */}
      <h3 className="chart-title">Food Management</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={foodManagementData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="food" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="chart-title">Waste Management</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={wasteManagementData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="waste" fill="#FF5722" />
        </BarChart>
      </ResponsiveContainer>

      {/* Conditions to Join the NGO */}
      <div className="ngo-conditions">
        <h3>Conditions to Join the NGO</h3>
        <ul>
          <li>Must be 18 years or older.</li>
          <li>Commit to volunteering at least 5 hours per week.</li>
          <li>Support the mission of food donation and waste reduction.</li>
          <li>Participate in community outreach programs.</li>
        </ul>
      </div>

      {/* Application Form Popup */}
      {isFormOpen && <ApplicationForm ngoName={selectedNgo} closeForm={closeForm} />}
    </div>
  );
};

export default Dashboard;
