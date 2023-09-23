const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status : {
        type : String
    },
    products : {
        type : String
    },
    paymentId : {
        type : Number
    },
    userId : {
        type : Number
    },
 
    
});

module.exports = mongoose.model("order", orderSchema);