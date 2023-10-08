const fs = require("fs");
const path = require("path");

const productModel = require("../models/product");
const { upload } = require("../util/file");
const product = require("../models/product");

exports.createProductController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const { name, description, category, quantity, price, discountPrice } =
        req.body;
      const image = fs.readFileSync(
        path.resolve(__dirname, `../uploads/${req.file.originalname}`)
      );
      const mimetype = req.file.mimetype;
      await productModel.create({
        name,
        image,
        mimetype,
        description,
        category,
        quantity,
        price,
        discountPrice,
      });
      return res.status(201).json({
        msg: "Product Created Successfully",
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.fetchProducts = async (req, res) => {
  try {
    // const { name, category, skip, limit } = req.query;
    const { name, category, page } = req.query;
    const productPerPage = 2;
    const options = {
      name: {
        $regex: name || "",
        $options: "i",
      },
    };
    if (category) {
      options["category"] = {
        $in: category.split(","),
      };
    }
    const products = await productModel
      .find(options)
      .sort({
        price: 1,
      })
      .skip((page - 1) * productPerPage)
      .limit(productPerPage);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          msg: err.message,
        });
      }
      const { productId } = req.params;
      let image;
      let mimetype;
      if (req.file) {
        image = fs.readFileSync(
          path.resolve(__dirname, `../uploads/${req.file.originalname}`)
        );
        mimetype = req.file.mimetype;
      }
      const { name, description, category, quantity, price, discountPrice } =
        req.body;
      const updatedProduct = await productModel.findByIdAndUpdate(
        {
          _id: productId,
        },
        {
          name,
          image,
          mimetype,
          description,
          category,
          quantity,
          price,
          discountPrice,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(updatedProduct);
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productModel.findByIdAndDelete({
      _id : productId
    });
    return res.status(201).json({
      msg: "Product Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};
