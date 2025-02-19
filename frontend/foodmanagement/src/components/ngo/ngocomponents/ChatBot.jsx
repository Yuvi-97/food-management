import React, { useState } from "react";
import axios from "axios";
import "../ngostyles/ChatBot.css";

// Use environment variables to hide API keys
const API_KEY = "AIzaSyCVathu0L83oeArCLZd9VcUYp_SEMvx8to"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const predefinedResponses = {
  "how can i donate food?":
    "You can donate food by visiting our nearest donation center or scheduling a pickup through our platform.",
  "what types of food can be donated?":
    "You can donate non-perishable food items, fresh fruits and vegetables, dairy products, and cooked meals that are safely packed.",
  "how does food waste management work?":
    "Food waste management involves reducing, reusing, and recycling food to minimize waste. We help by redirecting surplus food to those in need.",
  "where can i find nearby donation centers?":
    "You can find nearby donation centers using our interactive map on the website or by entering your location in the 'Find Centers' section.",
  "how is donated food distributed?":
    "Donated food is collected, checked for safety, and distributed through NGOs, food banks, and community kitchens to those in need.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = { sender: "You", text: messageText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    // Check predefined responses (case-insensitive)
    const normalizedText = messageText.toLowerCase();
    if (predefinedResponses[normalizedText]) {
      setTimeout(() => {
        const botMessage = { sender: "Bot", text: predefinedResponses[normalizedText] };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false);
      }, 500); // Simulate response delay
      return;
    }

    // Fetch AI-generated response from Gemini API
    try {
      const response = await axios.post(
        API_URL,
        {
          contents: [{ role: "user", parts: [{ text: messageText }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      const botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure about that. Please check our website for more information.";

      const botMessage = { sender: "Bot", text: botReply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: "Sorry, I'm having trouble responding right now." },
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <h3 className="chat-title">Food Donation & Waste ChatBot</h3>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="bot typing">Bot is typing...</div>}
      </div>

      <div className="predefined-questions">
        {Object.keys(predefinedResponses).map((question, index) => (
          <button key={index} className="question-button" onClick={() => sendMessage(question)}>
            {question}
          </button>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
          disabled={loading}
        />
        <button onClick={() => sendMessage(input)} className="chat-button" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
