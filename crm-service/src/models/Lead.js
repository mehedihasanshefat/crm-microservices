const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    company: String,
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Lead", leadSchema);
