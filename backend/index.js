require("dotenv").config();
const express = require("express");
const app = express();

const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoutes = require("./routes/jobTypeRoutes");
const jobsRoutes = require("./routes/jobsRoutes");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    name: "session",
    keys: ["ameerah"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", jobTypeRoutes);
app.use("/api", jobsRoutes);

app.use(errorHandler);

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
