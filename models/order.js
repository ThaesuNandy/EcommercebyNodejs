const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "payment",
    enum: ["payments", "pending", "delivered"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderProduct",
    },
  ],
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},
{
  timestamps : true
});

module.exports = mongoose.model("order", orderSchema);
