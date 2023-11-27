const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
//const morgan = require("morgan"),
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const connection_string =
  "mongodb+srv://Ameerah14:Basic1012@hyperiondevtasks.y7esotx.mongodb.net/JobPortal";

// Connect to MongoDB using the defined connection URI
mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Storing the reference to the MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});