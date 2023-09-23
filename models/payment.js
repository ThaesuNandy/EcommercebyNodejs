const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    type : {
        type : String
    },
    image : {
        type : String
    },
    accountName : {
        type : String
    },
    accountNumber : {
        type : String
    },
 
    
});

module.exports = mongoose.model("payment", paymentSchema);