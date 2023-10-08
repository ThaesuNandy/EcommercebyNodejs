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
   
 
    
},{
    timestamps : true
});

module.exports = mongoose.model("promotion", promotionSchema);