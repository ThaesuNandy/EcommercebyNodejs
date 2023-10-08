const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    image : {
        type : Buffer,
        required: true,
    },
    mimetype : {
        type : String,
        required: true,
    },
    accountName : {
        type : String,
        required : true
    },
    accountNumber : {
        type : String,
        required : true
    },
 
    
},{
    timestamps : true,
});

module.exports = mongoose.model("payment", paymentSchema);