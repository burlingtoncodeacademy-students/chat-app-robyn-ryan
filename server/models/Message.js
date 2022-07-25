const mongoose = require("mongoose");

// Data model for messages
const Message = new mongoose.Schema({
  date: Date,
  user: String,
  room: String,
  body: String,
});

module.exports = Message;
