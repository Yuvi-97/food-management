import React from "react";
import "../ngostyles/ChatBotIcon.css";

const ChatBotIcon = ({ onClick }) => {
  return (
    <button className="chatbot-icon" onClick={onClick} aria-label="Open ChatBot">
      💬
    </button>
  );
};

export default ChatBotIcon;
