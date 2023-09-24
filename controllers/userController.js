const userModel = require("../models/user")


exports.userProfileController = async (req, res) => {
    try{
        const users = await userModel.find().populate("addressId");
        return res.json(users);
    } catch  (error) {
        console.log(error);
    }
};