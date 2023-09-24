const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require("../models/user");
const addressModel = require("../models/address");

exports.signupController = async (req, res) => {
 try{
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
      } = req.body;
      const newAddress = await addressModel.create({
        floor,
        street,
        region,
        city,
        township,
      });
    
     const hashedPassword =  bcrypt.hashSync(password, 10);
     const newUser = await userModel.create({
        name,
        email,
        password : hashedPassword,
        phone,
        role,
        addressId : newAddress._id,
      });

      const token = jwt.sign({ _id : newUser._id }, "E-Commerce Website");
      return res.json({ msg : "Successfully created.", token });
 } catch (error) {
    console.log(error);
 }
};

exports.signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email : email});
       if(!user) {
        return res.status(404).json({
            msg : "User not found",
        })
       }
        const isMatch =  bcrypt.compareSync(password, user.password );
        if(isMatch){
            const token = jwt.sign({ _id: user._id }, "E-Commerce Website");
            return res.status(200).json({
                token,
            });
        }else {
            return res.status(400).json({
                msg : "Password doesn't match",
            });
        }
    } catch (error) {
        console.log(error);
    
    }
};
