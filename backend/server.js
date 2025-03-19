require("dotenv").config();
const express = require("express");
const mongoose = require("./config");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const Message = require("./models/Message");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map(); // Store socket ID -> user name
const userSocketMap = new Map(); // Store user name -> socket ID

io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // Register user when they connect
  socket.on("addUser", (userName) => {
    userName = userName.trim().toLowerCase(); // Normalize name

    // Store mapping: socket ID -> user name
    onlineUsers.set(socket.id, userName);
    // Store reverse mapping: user name -> socket ID
    userSocketMap.set(userName, socket.id);

    console.log("🟢 Online Users:", userSocketMap);

    // Send updated user list to all clients
    io.emit("getUsers", Array.from(userSocketMap.keys()));
  });

  // Handle sending messages
  socket.on("sendMessage", async (data) => {
    let { sender, receiver, text } = data;

    sender = sender.trim().toLowerCase();
    receiver = receiver.trim().toLowerCase();

    console.log(`📩 Message from ${sender} to ${receiver}:`, data);

    const receiverSocketId = userSocketMap.get(receiver);
    console.log(`🔍 Checking receiver's socket ID: ${receiverSocketId}`);

    if (!receiverSocketId) {
      console.log(`⚠️ Receiver ${receiver} is offline or not found.`);
      return;
    }

    // Save message
    const newMessage = new Message({ sender, receiver, text, isRead: false });
    await newMessage.save();

    // Send message to receiver
    io.to(receiverSocketId).emit("receiveMessage", newMessage);
    console.log(
      `📬 Sent to receiver ${receiver} at socket ${receiverSocketId}`
    );

    // Send message back to sender
    io.to(socket.id).emit("receiveMessage", newMessage);
  });

  // Remove user from online list when they disconnect
  socket.on("disconnect", () => {
    const userName = onlineUsers.get(socket.id);

    if (userName) {
      onlineUsers.delete(socket.id);
      userSocketMap.delete(userName);
    }

    console.log("🔴 User Disconnected:", userSocketMap);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
