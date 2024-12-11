import React, { useState } from "react";
import axios from "axios";
import "./AIHelper.css";

function AIHelper() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_ENDPOINT = "http://localhost:4000/v1/api/AI/message"; // Replace with your backend endpoint

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post(API_ENDPOINT, { message: input });
      const botReply = response.data.message;
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <div className="container">
      <div className="app">
        {/* Add a header for the title */}
        <header className="app-header">
          <h1>SpartanFinance.AI</h1>
        </header>
        <div className="chat-container">
          <div className="chat-display">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                <span>{msg.sender === "user" ? "You: " : "Bot: "}</span>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIHelper;
