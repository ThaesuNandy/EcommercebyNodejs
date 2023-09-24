const route = require('express').Router();
const authController = require("../controllers/authController");

route.post("/users/signup", authController.signupController);
route.post("/users/signin", authController.signinController);


module.exports = route;