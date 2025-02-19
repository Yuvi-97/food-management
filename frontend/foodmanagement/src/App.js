import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/ngo/ngocomponents/Dashboard";
import LiveTracking from "./components/ngo/ngocomponents/LiveTracking";
import FoodManagement from "./components/ngo/ngocomponents/FoodManagement";
import WasteManagement from "./components/ngo/ngocomponents/WasteManagement";
import Reports from "./components/ngo/ngocomponents/Reports";
import Navigation from "./components/ngo/ngocomponents/Navigation";
import Login from "./components/login-signup/login";
import SignUp from "./components/login-signup/signup";
import DonorDashboard from "./components/donors/DonorDashboard";
import AdminDashboard from "./components/Admin/Dashboard";
import ChatBot from "./components/ngo/ngocomponents/ChatBot";
import ChatBotIcon from "./components/ngo/ngocomponents/ChatBotIcon"; // Import chatbot icon

const Layout = () => {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  // Pages that should show navigation
  const showNavPages = [
    "/ngo-dashboard",
    "/live-tracking",
    "/food-management",
    "/waste-management",
    "/reports",
    "/chatbot"
  ];
  const shouldShowNav = showNavPages.includes(location.pathname);

  // Exclude chatbot icon from login & signup pages
  const excludeChatBot = ["/", "/signup"];
  const shouldShowChatBot = !excludeChatBot.includes(location.pathname);

  return (
    <>
      {shouldShowNav && <Navigation />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/ngo-dashboard" element={<Dashboard />} />
          <Route path="/live-tracking" element={<LiveTracking />} />
          <Route path="/food-management" element={<FoodManagement />} />
          <Route path="/waste-management" element={<WasteManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/donordashboard" element={<DonorDashboard />} />
        </Routes>
      </div>

      {/* Floating ChatBot Icon */}
      {shouldShowChatBot && <ChatBotIcon onClick={() => setChatOpen(!chatOpen)} />}

      {/* ChatBot Popup */}
      {chatOpen && (
        <div className="chat-popup">
          <button className="close-btn" onClick={() => setChatOpen(false)}>✖</button>
          <ChatBot />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
