const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  date: Date,
  user: String,
  room: String,
  body: String,
});

module.exports = Message;
