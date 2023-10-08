const paymentModel = require("../models/payment");
const {upload} = require("../util/file");
const path = require("path");
const fs = require('fs');


exports.createPayment = async (req, res) => {
    try {

         upload(req, res, async (err) => {
            if(err){
                return res.status(400).json({
                    error : err.message
                });
            }
            const { type , accountName, accountNumber }  = req.body;
            const imageBuffer = fs.readFileSync(path.resolve(__dirname, `../uploads/${req.file.originalname}`));
            await paymentModel.create({
                type , 
                image : imageBuffer,
                mimetype : req.file.mimetype,
                accountName,
                accountNumber
            })
            return res.status(200).json({
                msg : "Successfully created",
            });
           
        });
      
    } catch (error) {
        return res.status(400).json({
            error : error.message
        });
    }
};

exports.fetchAllPayments = async ( req, res) => {
    try {
        const payment = await paymentModel.find();
        return res.status(200).json(payment);
    } catch (error) {
        return res.status(400).json({
            error : error.message
        });
    }
};