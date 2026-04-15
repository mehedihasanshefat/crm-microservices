const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    email: String,
    company: String,
    phone: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Customer", customerSchema);
