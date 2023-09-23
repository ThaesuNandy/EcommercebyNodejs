const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    title : {
        type : String
    },
    image : {
        type : String
    },
    productId : {
        type : Number
    },
   
 
    
});

module.exports = mongoose.model("promotion", promotionSchema);