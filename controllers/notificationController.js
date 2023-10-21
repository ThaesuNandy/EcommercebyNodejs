const path = require("path");
const fs = require("fs");
const { upload } = require("../util/file");
const notificationModel = require("../models/notificaiton");

exports.createNotification = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: err.message,
        });
      }
      const { title, type, reference } = req.body;
      const image = fs.readFileSync(
        path.resolve(__dirname, `../uploads/${req.file.originalname}`)
      );
      const notificaiton = await notificationModel.create({
        title,
        image,
        mimetype: req.file.mimetype,
        type,
        reference,
      });
      return res.status(200).json({
        notificaiton,
      });
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

exports.fetchNotification = async (req, res) => {
    try {
        const notification = await notificationModel.find().sort({ _id : -1});
        return res.status(200).json({
            notificaiton,
        });
    } catch (error) {
        return res.status(400).json({
            msg: error.message,
          });
    }
}
