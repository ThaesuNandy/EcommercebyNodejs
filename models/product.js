const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Buffer,
    },
    mimetype : {
      type : String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    rating : {
      type : Number,
      default : 0,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
