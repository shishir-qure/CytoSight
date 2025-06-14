"use client";

import { useState } from "react";

export default function ChatTab({}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "reminder",
      content: "Remind me to... | Due in 18 days",
      status: "AI Included: ✓",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          type: "user",
          content: newMessage,
          timestamp: new Date(),
        },
      ]);
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
      <div className="flex-1 overflow-y-auto">
        {/* Patient Info Cards */}
        <p>Messgae</p>

        {/* Chat Messages */}
        <div className="px-4 pb-4">
          {messages.slice(1).map((message) => (
            <div key={message.id} className="mb-4">
              {message.type === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-md">
                    {message.content}
                  </div>
                </div>
              ) : message.type === "system" ? (
                <div className="flex justify-center">
                  <div className="bg-gray-600 text-white p-2 rounded-lg text-sm">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="bg-orange-600 text-white p-3 rounded-lg flex items-center justify-between">
                  <span>{message.content}</span>
                  <span className="bg-green-500 px-2 py-1 rounded text-sm">
                    {message.status}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Medical Assistant Bottom Section */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {/* AI Assistant Label and Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">
              AI Medical
              <br />
              Assistant
            </div>
          </div>

          <button
            onClick={() => handleActionButton("Start Transcription")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center space-x-5 transition-colors"
          >
            <span className="text-lg">🎤</span>
            <div className="text-xs text-center">
              <div>Start</div>
              <div>Transcription</div>
            </div>
          </button>

          <button
            onClick={() => handleActionButton("Generate Order Forms")}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center space-x-5 transition-colors"
          >
            <span className="text-lg">📋</span>
            <div className="text-xs text-center">
              <div>Generate Order</div>
              <div>Forms</div>
            </div>
          </button>

          <button
            onClick={() => handleActionButton("Generate Physician Notes")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg flex items-center space-x-5 transition-colors"
          >
            <span className="text-lg">📄</span>
            <div className="text-xs text-center">
              <div>Generate Physician</div>
              <div>Notes</div>
            </div>
          </button>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Start a new message (Press Enter to send or Shift + Enter for new line)"
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 resize-none min-h-[50px] max-h-[120px]"
            rows="2"
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
