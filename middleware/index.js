const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.verifyToken = async ( req, res, next ) => {
    const token = req?.headers?.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "E-Commerce Website");
    const userId = decoded?._id;
    const user = await userModel.findById(userId);
    console.log(user);
    // next();
    
}



