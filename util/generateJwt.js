const jwt = require("jsonwebtoken");


const generateJWT = (userId) => {
    const token = jwt.sign({ _id: userId }, "E-Commerce Website", {
        expiresIn: "86400s",
      });
    return token;
}

module.exports = generateJWT;