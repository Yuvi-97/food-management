import React, { useState } from "react";
import axios from "axios";

const CommunityHub = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:8080/api/chatbot", {
        message: input,
      });

      const botMessage = { sender: "Bot", text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h3>Community Hub</h3>
      <div style={{ minHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.sender === "You" ? "right" : "left", margin: "5px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "70%", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ width: "25%", padding: "5px", marginLeft: "5px" }}>Send</button>
    </div>
  );
};

export default CommunityHub;
