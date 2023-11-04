const route = require("express").Router();
const { body, param } = require("express-validator");
const productController = require("../controllers/productController");
const paymentController = require("../controllers/paymentController");
const orderController = require("../controllers/orderController");
const notificationController = require("../controllers/notificationController");

route.post(
  "/products",
  [
    body("name", "Name is not Valid").notEmpty(),
    body("description", "Description is not Valid").optional(),
    body("category", "Category is not Valid").notEmpty(),
    body("quantity", "Quantity is not Valid").isInt(),
    body("price", "Price is not Valid").isFloat(),
    body("discountPrice", "Discount Price is not Valid").isFloat(),
  ],
  productController.createProductController
);

route.post(
  "/payments",
  [
    body("type", "Type is not Valid").notEmpty(),
    body("accountName", "Account Name is not Valid").notEmpty(),
    body("accountNumber", "Account Number is not Valid").notEmpty(),
  ],
  paymentController.createPayment
);

route.put(
  "/products/:productId",
  param("productId", "ProductId must not be empty").notEmpty(),
  productController.updateProduct
);

route.delete(
  "/products/:productId",
  param("productId", "ProductId must not be empty").notEmpty(),
  productController.deleteProduct
);

route.put(
  "/orders/:orderId",
  param("orderId", "OrderId must not be empty").notEmpty(),
  orderController.updateOrder
);
//notification
route.post(
  "/notification",
  [
    body("title", "Title is not Valid").notEmpty(),
    body("type", "Type is not Valid").notEmpty(),
    body("reference", "Reference is not Valid").notEmpty(),
  ],
  notificationController.createNotification
);

module.exports = route;
