import React from "react";
import "../ngostyles/ChatBotIcon.css"; // Ensure this file exists

const ChatBotIcon = ({ onClick }) => {
  return (
    <button className="chatbot-icon" onClick={onClick}>
      💬
    </button>
  );
};

export default ChatBotIcon;
