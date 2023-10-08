const route = require('express').Router();
const productController = require('../controllers/productController');
const paymentController = require('../controllers/paymentController')

route.post('/products', productController.createProductController);
route.post('/payments', paymentController.createPayment);

route.put("/products/:productId", productController.updateProduct);
route.delete("/products/:productId", productController.deleteProduct);

module.exports = route;