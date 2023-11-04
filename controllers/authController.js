const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const {userModel, addressModel } = require("../models");
const generateJWT = require('../util/generateJwt');

exports.signupController = async (req, res) => {
  try {
    const error = validationResult(req);
    if(!error.isEmpty()) {
      return res.status(400).json({
        msg : error.array().map((m) => m.msg),
      })
    }
    
    const {
      name,
      email,
      password,
      phone,
      role,
      floor,
      street,
      region,
      city,
      township,
      tag,
    } = req.body;
    let newAddress;
    if (role === "customer") {
      const newAddress = await addressModel.create({
        floor,
        street,
        region,
        city,
        township,
        tag,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      addressId: role === "customer" ? newAddress._id : undefined,
    });

   const token = generateJWT(newUser._id);
   
   return res.json({ msg: "Successfully created.", token });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.signinController = async (req, res) => {
  try {

    const error = validationResult(req);
    if(!error.isEmpty()) {
      return res.status(400).json({
        msg : error.array().map((m) => m.msg),
      })
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
        const token = generateJWT(user._id);
      return res.status(200).json({
        token,
      });
    } else {
      return res.status(400).json({
        msg: "Password doesn't match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
