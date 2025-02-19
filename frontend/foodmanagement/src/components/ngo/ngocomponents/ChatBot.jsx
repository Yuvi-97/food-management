import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../ngostyles/ChatBot.css";

const API_KEY = "AIzaSyCVathu0L83oeArCLZd9VcUYp_SEMvx8to"; // Replace with a valid API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const predefinedResponses = {
  "How can I donate food?":
    "You can donate food by visiting our nearest donation center or scheduling a pickup through our platform.",
  "What types of food can be donated?":
    "You can donate non-perishable food items, fresh fruits and vegetables, dairy products, and cooked meals that are safely packed.",
  "How does food waste management work?":
    "Food waste management involves reducing, reusing, and recycling food to minimize waste. We help by redirecting surplus food to those in need.",
  "Where can I find nearby donation centers?":
    "You can find nearby donation centers using our interactive map on the website or by entering your location in the 'Find Centers' section.",
  "How is donated food distributed?":
    "Donated food is collected, checked for safety, and distributed through NGOs, food banks, and community kitchens to those in need.",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = { sender: "You", text: messageText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    if (predefinedResponses[messageText]) {
      const botMessage = { sender: "Bot", text: predefinedResponses[messageText] };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    } else {
      try {
        const response = await axios.post(API_URL, {
          contents: [{ role: "user", parts: [{ text: messageText }] }],
        });

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
    }

    setInput("");
  };

  return (
    <div className="chat-popup">
      <h3 className="chat-title">Food Donation & Waste ChatBot</h3>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div className="bot typing">Bot is typing...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="predefined-questions-container">
        <div className="predefined-questions">
          {Object.keys(predefinedResponses).map((question, index) => (
            <button key={index} className="question-button" onClick={() => sendMessage(question)}>
              {question}
            </button>
          ))}
        </div>
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
