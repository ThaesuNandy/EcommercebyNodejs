const route = require("express").Router();
const userController = require("../controllers/userController");
const paymentController = require("../controllers/paymentController");
const orderController = require("../controllers/orderController");
const productController = require("../controllers/productController");
const wishlistController = require("../controllers/wishlistController");
const reviewController = require("../controllers/reviewController");
const notificationController = require("../controllers/notificationController");


route.get("/users/profile", userController.userProfileController);
route.put("/users/:userId", userController.updateUser);
route.delete("/users/:userId", userController.deleteUser);
route.get("/payment", paymentController.fetchAllPayments);
route.post("/orders", orderController.createOrderController);
//product
route.get("/products", productController.fetchProducts);
route.get("/products/discount", productController.fetchDiscountProducts);
route.get("/orders", orderController.fetchOrders);
route.get("/orders/:orderId", orderController.fetchOrderDetail);

//wishlist
route.post("/wishlist", wishlistController.addwishlistProduct);
route.delete("/wishlist", wishlistController.removeWishlistProduct);
route.get("/wishlist", wishlistController.fetchWishlistProducts);

//review
route.post("/review", reviewController.addReview);

//notification
route.get("/notification", notificationController.fetchNotification);
module.exports = route;
