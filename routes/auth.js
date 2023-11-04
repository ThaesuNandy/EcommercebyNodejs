const route = require("express").Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

route.post(
  "/users/signup",
  limiter,
  [
    body("name", "Name is not Valid").isLength({ min: 3 }),
    body("email", "Email is not Valid").isLength({ min: 6 }),
  ],
  authController.signupController
);

route.post(
  "/users/signin",
  limiter,
  [
    body("email", "Email is not Valid").isEmail(),
    body("password", " Password is not Valid").isLength({ min: 6 }),
  ],

  authController.signinController
);

module.exports = route;
