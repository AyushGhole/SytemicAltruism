import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://sytemicaltruism-backend.onrender.com");

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  let typingTimeout;

  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  // Register user when component mounts
  useEffect(() => {
    if (user) {
      socket.emit("addUser", user.name.trim().toLowerCase());
    }
  }, [user]);

  // Load messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      socket.emit("loadMessages", {
        sender: user.name,
        receiver: selectedChat.name,
      });

      socket.on("chatHistory", (history) => {
        setMessages(history); // Load previous chat messages
      });
    }

    return () => {
      socket.off("chatHistory");
    };
  }, [selectedChat, user]);

  // Handle receiving new messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("📥 Received message at frontend:", data);

      if (!selectedChat) return; // Prevent errors when no chat is selected

      // Ensure message is for the selected chat
      if (
        (data.sender.toLowerCase() === selectedChat.name.toLowerCase() &&
          data.receiver.toLowerCase() === user.name.toLowerCase()) ||
        (data.sender.toLowerCase() === user.name.toLowerCase() &&
          data.receiver.toLowerCase() === selectedChat.name.toLowerCase())
      ) {
        //  Prevent sender from adding duplicate messages
        if (data.sender.toLowerCase() === user.name.toLowerCase()) return;

        console.log(" Message added to UI:", data);
        setMessages((prev) => [...prev, data]); // Append message to UI
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedChat, user]);

  // Listen for typing events
  useEffect(() => {
    socket.on("userTyping", ({ sender, receiver }) => {
      if (receiver === user.name && sender === selectedChat?.name) {
        setIsTyping(true);
      }
    });

    socket.on("userStoppedTyping", ({ sender, receiver }) => {
      if (receiver === user.name && sender === selectedChat?.name) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, [selectedChat, user]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!selectedChat) return;

    socket.emit("typing", { sender: user.name, receiver: selectedChat.name });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", {
        sender: user.name,
        receiver: selectedChat.name,
      });
    }, 2000);
  };

  // Send message
  const sendMessage = () => {
    if (!selectedChat || input.trim() === "") return;

    const newMessage = {
      sender: user.name,
      receiver: selectedChat.name,
      text: input,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    console.log("🚀 Sending message:", newMessage);
    setMessages((prev) => [...prev, newMessage]); // Optimistically update UI
    socket.emit("sendMessage", newMessage);
    setInput("");
  };

  // Auto-scroll when new messages arrive
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-3/4 h-screen flex flex-col bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 text-lg font-semibold">
        {selectedChat?.name || "Select a chat"}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            ref={chatRef}
            className={`flex ${
              msg.sender === user.name ? "justify-end" : "justify-start"
            }`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === user.name ? "bg-blue-500" : "bg-gray-700"
              }`}>
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs text-gray-300">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-gray-400 text-sm italic">Typing...</div>
        )}
      </div>

      <div className="p-4 bg-gray-800 flex">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleTyping}
          className="flex-1 p-2 bg-gray-700 rounded-lg text-white"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
