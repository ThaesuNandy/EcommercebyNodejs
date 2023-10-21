const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
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
    order : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "order",
    }
 
    
},
{
    timestamps:  true
});

module.exports = mongoose.model("orderProduct", orderProductSchema);