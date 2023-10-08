const orderModel = require("../models/order");
const orderedProductsModel = require("../models/orderProduct")



exports.createOrderController = async (req, res) => {
    try {
        const { orderedProducts, paymentId } = req.body;
        const products = JSON.parse(orderedProducts);

        const newOrderedProductIds = await Promise.all(
            product.map( async (product) => {
                const newOrderedProducts = await orderedProducts.create({
                    product : product.productId,
                    price : product.price,
                    quantity : product.quantity,
                    totalPrice : product.total,
                });
                return newOrderedProductIds._id;
            })
        );
        await orderModel.create({
            payment : paymentId,
            products : newOrderedProductIds,
            user : req.user._id,
        });
        return res.status(201).json({
            msg : "Order created Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            error : error.message
        });
    }
};