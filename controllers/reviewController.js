const { reviewModel, productModel } = require("../models");

exports.addReview = async (req, res) => {
  try {
    const { productId, content, rating } = req.body;
    const user = req.user;
    const newReview = await reviewModel.create({
      content,
      rating,
      user: user._id,
    });
    const product = await productModel.findById(productId);

    const updatedProduct = await productModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        rating : product.rating + parseInt(rating),
        $push: {
          review: newReview._id,
        },
      },
      {
        new: true,
      }
    ).populate("review");
    return res.status(200).json({
        updatedProduct
    })
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};
