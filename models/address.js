const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    floor: {
      type: String,
    },
    street: {
      type: String,
    },
    region: {
      type: String,
    },
    city: {
      type: String,
    },
    township: {
      type: String,
    },
    tag: {
      type: String,
      enum: ["home", "work"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("address", addressSchema);
