const {ObjectId} = require("mongodb");
const { userModel, addressModel } = require("../models");
const bcrypt = require("bcrypt");

exports.userProfileController = async (req, res) => {
  try {
    const user = req.user;
    delete user.password;
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, password } = req.body;
    let hashedPassword;
    if ( userId !== req.user._id.toString()) {
      return res.status(401).json({
        msg: "You cant update this profile",
      });
    }
    if( password) {
       hashedPassword =  bcrypt.hashSync(password, 10);
    }
    const updatedUser = await userModel.findById(
      {
        _id: userId,
      },
      {
        name,
        password : hashedPassword,
        email,
        phone,
      }
    );
    return res.status(200).json({ updatedUser});
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if ( userId !== req.user._id.toString()) {
          return res.status(401).json({
            msg: "You cant update this profile",
          });
        }
        const deleteUser = await userModel.findByIdAndDelete({
            _id : userId,
        });
    
        return res.status(200).json({
            msg: "Delete User Successfully",
         });
      } catch (error) {
        return res.status(400).json({
          msg: error.message,
        });
      }
}

exports.updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        const { floor, street, region, city, township } = req.body;
        const updatedAddress = await addressModel.findByIdAndUpdate({
            _id : addressId,
        },{
            floor,
            street,
            region,
            city,
            township,
        },{
            new : true,
        });
        return res.status(200).json({ updatedAddress});
    } catch (error) {
        return res.status(400).json({
            msg: error.message,
          });
    }
}
