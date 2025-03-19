const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // "Alice" or "You"
  receiver: { type: String, required: true }, // Contact name
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }, // New field for read receipts
});

module.exports = mongoose.model("Message", messageSchema);
