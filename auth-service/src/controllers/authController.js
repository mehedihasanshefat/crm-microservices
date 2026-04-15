const User = require("../models/User");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const { generateTokens } = require("../utils/jwt");
const { sendEvent } = require("../kafka/producer");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role });

  // publish event
  await sendEvent("user-created", {
    userId: user._id,
    email: user.email,
    name: user.name,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json("Invalid");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json("Invalid");

  const tokens = generateTokens(user);

  // store refresh token in redis
  await redis.set(
    `refresh_${user._id}`,
    tokens.refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );

  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: false,
  });

  res.json(tokens);
};
