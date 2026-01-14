require("dotenv").config();
const express = require("express");
const cors = require("cors");

const MyRoute = require("./routes/profile");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/profile", MyRoute);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
