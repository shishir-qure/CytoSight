"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ChatTab({ currentPatient }) {
  const router = useRouter();
  const { patient_uid } = router.query;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentPatient) {
      setMessages(currentPatient?.messages);
    }
  }, [currentPatient]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients/${patient_uid}/messages/add/`,
        {
          method: "POST",
          body: JSON.stringify({ message: newMessage }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      setMessages([{ message: newMessage }, ...messages]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleActionButton = (action) => {
    const actionMessage = {
      id: Date.now(),
      type: "system",
      content: `${action} initiated...`,
      timestamp: new Date(),
    };
    setMessages([...messages, actionMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Chat Content */}
      <div className="flex-1 overflow-y-auto bg-[url('/chat-bg.svg')] bg-cover bg-center">
        {/* Patient Info Cards */}

        {/* Chat Messages */}
        <div className="px-4 py-4 flex flex-col-reverse w-full">
          {messages?.map((message, index) => (
            <div
              key={index}
              className="mb-4 bg-gray-700 p-4 rounded-lg max-w-3/4 ml-auto"
            >
              <p>{message?.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-800 p-4">
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Start a new message (Press Enter to send or Shift + Enter for new line)"
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 resize-none max-h-[120px]"
            rows="1"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
