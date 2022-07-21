const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  when: Date,
  user: String,
  room: String,
  body: String,
});

module.exports = Message;
