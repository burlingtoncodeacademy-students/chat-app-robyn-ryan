const router = require("express").Router();
const mongoose = require("mongoose");
// Import the model
const MessageSchema = require("../models/Message");
const Message = mongoose.model("messages", MessageSchema);

// Post a new message (including error handling)
router.post("/new-message", async (req, res) => {
  const { date, user, room, body } = req.body;
  try {
    if (!date || !user || !room || !body) {
      res.status(406).json({
        //specific error
        status: "Failed. Insufficient data.",
      });
    } else {
      // create new instance of model schema and pass an object that binds each req.body property to the schema properties. Wrap it into a variable (newMessage).
      const newMessage = new Message({
        date: date,
        user: user,
        room: room,
        body: body,
      });

      // Save entry to collection in database
      await newMessage.save();

      res.status(200).json({
        status: "Message received:",
        date: date,
        user: user,
        room: room,
        body: body,
      });
    }
  } catch (error) {
    // general error
    res.status(500).json({
      status: `${error}`,
    });
  }
});
// Get data based on "room" using the .find() method with a room filter
router.get("/main", async (req, res) => {
  let allMessages = await Message.find({ room: "main" });
  res.send(allMessages);
});
router.get("/outerspace", async (req, res) => {
  let allMessages = await Message.find({ room: "outerspace" });
  res.send(allMessages);
});
router.get("/cars", async (req, res) => {
  let allMessages = await Message.find({ room: "cars" });
  res.send(allMessages);
});

module.exports = router;
