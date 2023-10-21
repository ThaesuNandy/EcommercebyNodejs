const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: {
      type: Buffer,
    },
    mimetype: {
      type: String,
    },
    type: {
      type: String,
      enum: ["discount", "order"],
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      default : null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", notificationSchema);
