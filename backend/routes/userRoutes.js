const express = require("express");
const User = require("../models/User.js");

const router = express.Router();

// Get all users (excluding the current logged-in user)
router.get("/:userId", async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userId } }).select(
      "name _id"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
