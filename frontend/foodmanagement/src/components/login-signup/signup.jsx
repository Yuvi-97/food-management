import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
// import signupImage from "/assets/signup-image.jpg"; // Correct image import

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
      return;
    }

    // Redirect to login page after successful signup
    navigate("/");
  };

  return (
    <div className="auth-page">
      {/* Left Side Image (Outside Container) */}
      <div className="auth-bg">
        <img src="/assets/signup-image.jpg" alt="Sign Up" />
      </div>

      {/* Right Side Form Container */}
      <div className="auth-container">
        <div className="auth-form-container">
          <h2 className="auth-title">Join Us!</h2>
          <p className="auth-subtitle">Create an account and be part of something great.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="auth-input"
            />
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
              className="auth-select"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="ngo">NGO</option>
              <option value="donor">Donor</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="auth-input"
            />
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Already have an account? <a href="/">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
