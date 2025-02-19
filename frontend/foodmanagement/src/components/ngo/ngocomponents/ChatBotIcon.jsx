import React from "react";
import "../ngostyles/ChatBotIcon.css"; // Ensure this file exists

const ChatBotIcon = ({ onClick }) => {
  return (
    <button className="chatbot-icon" onClick={onClick} aria-label="Open ChatBot">
      💬
    </button>
  );
};

export default ChatBotIcon;
