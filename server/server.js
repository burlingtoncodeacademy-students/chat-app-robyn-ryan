require("dotenv").config();

const Express = require("express"),
  mongoose = require("mongoose"), // Import mongoose
  cors = require("cors"),
  app = Express(),
  PORT = process.env.PORT || 8000,
  UN = process.env.UN
  PW = process.env.PW

mainRoutes = require("./controllers/mainRoutes");
app.use(cors());
app.use(Express.json());
app.use("/api/messages", mainRoutes);

//mongoose.connect("mongodb://localhost:27017/react-chat",

mongoose.connect(`mongodb+srv://${UN}:${PW}@cluster0.emgkbsh.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection-error"));

const Message = require("./models/Message");

app.listen(PORT, () => {
  try {
    console.log(`Server running on ${PORT}`);
  } catch (err) {
    console.log(`Server error: ${err}`);
  }
});
