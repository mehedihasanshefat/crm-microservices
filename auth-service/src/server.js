require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const logger = require("./utils/logger");
const { connectProducer } = require("./kafka/producer");

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  }),
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => logger.info("Auth DB connected"))
  .catch((err) => logger.error(err));

connectProducer().catch((err) => logger.error(err));

app.use("/api/auth", require("./routes/authRoutes"));

app.listen(process.env.PORT, () =>
  logger.info(`Auth Service running on ${process.env.PORT}`),
);
