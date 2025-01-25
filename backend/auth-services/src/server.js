require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Necessary for logging server status in production
  console.log(`Auth Service  running on ${PORT}`); // skipcq: JS-0002
});
