const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    productId : {
        type : Number
    },
    quantity : {
        type : Number
    },
    price : {
        type : Number
    },
    totalPrice : {
        type : Number
    },
 
    
});

module.exports = mongoose.model("orderProduct", orderProductSchema);