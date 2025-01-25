require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const documentRoutes = require("./routes/document");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/documents", documentRoutes);

app.listen(5001, () => console.log("Document Service running on port 5001"));
