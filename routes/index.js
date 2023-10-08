const route = require("express").Router();
const userController = require("../controllers/userController");
const paymentController = require("../controllers/paymentController");
const orderController = require("../controllers/orderController");
const productController = require("../controllers/productController");

route.get("/users/profile", userController.userProfileController);
route.put("/users/:userId", userController.updateUser);
route.delete("/users/:userId", userController.deleteUser);
route.get("/payment", paymentController.fetchAllPayments);
route.post("/orders", orderController.createOrderController);
//product
route.get("/products", productController.fetchProducts);
module.exports = route;
