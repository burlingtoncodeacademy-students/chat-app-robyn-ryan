const router = require("express").Router();
const mongoose = require("mongoose");
const MessageSchema = require("../models/Message");
const Message = mongoose.model("messages", MessageSchema);

// login route
/* 
router.route("/post").post(async (req, res) => {
  const { when, user, room, body } = req.body;
  console.log(when, user, room, body);
  res.send("register route hit");
}); 
*/

router.post("/new-message", async (req, res) => {
  const { date, user, room, body } = req.body;
  try {
    if (!date || !user || !room || !body) {
      res.status(406).json({
        //specific error
        status: "Failed. Insufficient data.",
      });
    } else {
      // create new instance of model schema and pass an object that binds each req.body property to the svhema properties. Wrap it into a variable (newOwner).
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

// all GET route that sends just a random response
router.get("/all-messages", async (req, res) => {
  let allMessages = await Message.find({});
  res.status(200).json({
    status: "getting all items",
    allMessages,
  });
});

module.exports = router;
