"use client"; // For Next.js 13+ (app directory)

import { useEffect, useState } from "react";
import AgoraRTM from "agora-rtm-sdk";

const APP_ID = "25592bc161ec440d866726e9895c1f5c"; // Replace with your Agora App ID
const CHANNEL_NAME = "test-channel";
const USER_ID = `user_${Math.floor(Math.random() * 10000)}`;
const TOKEN = null; // If you have token authentication, add it here

const AgoraChat = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initRTM = async () => {
      try {
        const rtmClient = AgoraRTM.createInstance(APP_ID);
        await rtmClient.login({ uid: USER_ID, token: TOKEN });

        const chatChannel = await rtmClient.createChannel(CHANNEL_NAME);
        await chatChannel.join();

        chatChannel.on("ChannelMessage", (message, senderId) => {
          setMessages((prev) => [...prev, { text: message.text, sender: senderId }]);
        });

        setClient(rtmClient);
        setChannel(chatChannel);
      } catch (error) {
        console.error("Agora RTM Error:", error);
      }
    };

    initRTM();

    return () => {
      if (client) {
        client.logout();
      }
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() === "" || !channel) return;
    await channel.sendMessage({ text: message });
    setMessages((prev) => [...prev, { text: message, sender: "Me" }]);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h3>Agora Chat</h3>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "Me" ? "my-message" : "other-message"}>
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AgoraChat;
