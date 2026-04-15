require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const { startConsumer } = require("./kafka/consumer");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("CRM DB connected"));

app.use("/api/leads", require("./routes/leadRoutes"));

app.listen(process.env.PORT, () => {
  console.log("CRM Service running");
  startConsumer();
});
