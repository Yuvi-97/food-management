import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
// import loginImage from "/assets/login-image.jpg"; // Correct image import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userRole === "admin") navigate("/admin");
    else if (userRole === "ngo") navigate("/ngo-dashboard");
    else if (userRole === "donor") navigate("/donordashboard");
  };

  return (
    <div className="auth-page">
      {/* Left Side Image (Outside Container) */}
      <div className="auth-bg">
        <img src="/assets/login-image.jpg" alt="Login" />
      </div>

      {/* Right Side Form Container */}
      <div className="auth-container">
        <div className="auth-form-container">
          <h2 className="auth-title">Welcome Back!</h2>
          <p className="auth-subtitle">Login to continue your journey with us.</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
