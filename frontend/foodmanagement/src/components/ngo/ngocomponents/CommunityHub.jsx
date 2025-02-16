import React, { useState } from "react";
import axios from "axios";
import "../ngostyles/CommunityHub.css";

const API_KEY = "AIzaSyDMJBTfQ4q6oK5RGGCN5ZPW1CuIBmAKYIE";  // Security Risk: Exposed API Key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const CommunityHub = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(API_URL, {
        contents: [{ parts: [{ text: input }] }],
      });

      const botReply =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      const botMessage = { sender: "Bot", text: botReply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...messages, userMessage, { sender: "Bot", text: "Error fetching response" }]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h3 className="chat-title">Community Hub</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-button">Send</button>
      </div>
    </div>
  );
};

export default CommunityHub;
