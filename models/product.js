const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String
    },
    image : {
        type : String
    },
    description : {
        type : String
    },
    category : {
        type : String
    },
    quantity : {
        type : String
    },
    price : {
        type : Number
    },
    discountPrice : {
        type : Number
    },
    review : {
        type : String
    }
    
});

module.exports = mongoose.model("product", productSchema);