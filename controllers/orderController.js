const orderModel = require("../models/order");
const orderedProductsModel = require("../models/orderProduct");

exports.createOrderController = async (req, res) => {
  try {
    const { orderedProducts, paymentId } = req.body;
    const products = JSON.parse(orderedProducts);

    const newOrderedProductIds = await Promise.all(
      products.map(async (product) => {
        const newOrderedProducts = await orderedProducts.create({
          product: product.productId,
          price: product.price,
          quantity: product.quantity,
          totalPrice: product.total,
        });
        return newOrderedProducts._id;
      })
    );
    const newOrder = await orderModel.create({
      payment: paymentId,
      products: newOrderedProductIds,
      user: req.user._id,
    });

    await Promise.all(
      newOrderedProductIds.map(async (newOrderedProductId) => {
        await orderedProductsModel.findByIdAndUpdate(
          { _id: newOrderedProductId },
          {
            order: newOrder._id,
          }
        );
      })
    );
    return res.status(201).json({
      msg: "Order created Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.fetchOrders = async (req, res) => {
  try {
    const { _id, role } = req.user;
    const { orderId, status, page } = req.query;
    const orderPerPage = 5;

    let options = {};
    if (orderId) {
      options[_id] = orderId;
    }
    if (status) {
      options["status"] = status;
    }
    if (role === "customer") {
      options["user"] = _id;
    }
    const orders = await orderModel
      .find(options)
      .populate(["payment", "products"])
      .skip((parseInt(page) - 1) * orderPerPage)
      .limit(orderPerPage);
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.fetchOrderDetail = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await orderedProductsModel
      .find({
        order: orderId,
      })
      .populate(["product"]);
    return res.sratus(200).json({
      orderDetail,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await orderModel.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        status: status,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ updatedOrder });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

