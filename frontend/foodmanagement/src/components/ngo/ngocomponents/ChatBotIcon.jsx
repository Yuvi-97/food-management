import React from "react";
import "../ngostyles/ChatBotIcon.css"

const ChatBotIcon = ({ onClick }) => {
  return (
    <button className="chatbot-icon" onClick={onClick}>
      💬
    </button>
  );
};

export default ChatBotIcon;
