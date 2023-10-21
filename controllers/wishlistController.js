const userModel = require("../models/user");

exports.addwishlistProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const { wishlist } = await userModel.findById(user._id);
    const isExist = wishlist.some((id) => id.toString() === productId);
    if (isExist) {
      return res.status(200).json({
        msg: "Product is already exist in the wishlist",
      });
    }
    wishlist.push(productId);
    const updatedUser = await userModel.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          wishlist,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.removeWishlistProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;
    const { wishlist } = await userModel.findById(user._id);
    const isExist = wishlist.some((id) => id.toString() === productId);
    if (!isExist) {
      return res.status(200).json({
        msg: "Product isn't existing in wishlist",
      });
    }
    const updatedWishlist = wishlist.filter(
      (id) => id.toString() !== productId
    );
    const updatedUser = await userModel.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          wishlist : updatedWishlist,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.fetchWishlistProducts = async (req, res) => {
    try {
        const { wishlist } = await userModel.findById(req.user._id).populate("wishlist");
        return res.status(200).json({
            wishlist
        })
    } catch (error) {
        return res.status(400).json({
            msg: error.message,
          });
    }
}
