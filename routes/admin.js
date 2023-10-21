const route = require("express").Router();
const productController = require("../controllers/productController");
const paymentController = require("../controllers/paymentController");
const orderController = require("../controllers/orderController");
const notificationController = require("../controllers/notificationController");

route.post("/products", productController.createProductController);
route.post("/payments", paymentController.createPayment);

route.put("/products/:productId", productController.updateProduct);
route.delete("/products/:productId", productController.deleteProduct);

route.put("/orders/:orderId", orderController.updateOrder);
//notification
route.post("/notification", notificationController.createNotification);

module.exports = route;
