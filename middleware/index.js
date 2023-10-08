const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const user = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }
  try {
    const decoded = jwt.verify(token, "E-Commerce Website");
    const userId = decoded?._id;
    const user = await userModel.findById(userId).populate("addressId");
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
        error : error.message,
    })
  }
 
};

exports.isAdmin = (req, res, next ) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      error: "You have no permission for this request",
    });
  }
};
