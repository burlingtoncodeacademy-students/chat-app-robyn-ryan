require("dotenv").config();

const Express = require("express"),
  //cors = require("cors"),
  mongoose = require("mongoose"), // Import mongoose
  app = Express(),
  PORT = process.env.PORT || 8000,
  HOST = process.env.HOST || "127.0.0.1";

//db = require("./db");
authmiddleware = require("./controllers/mainRoutes");

//app.use(cors());
app.use(Express.json());
app.use("/api/message", authmiddleware);

mongoose.connect("mongodb://localhost:27017/react-chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection-error"));

const Message = require("./models/Message");

app.listen(PORT, HOST, () => {
  try {
    console.log(`Server running on ${HOST}:${PORT}`);
  } catch (err) {
    console.log(`Server error: ${err}`);
  }
});