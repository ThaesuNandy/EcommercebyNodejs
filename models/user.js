const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
    },
    password : {
        type : String,
    },
    phone : {
        type : String,
    },
    role : {
        type : String,
        enum : ["admin", "customer"],
    },
    addressId : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "address",
        }
    ],
    wishlist : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "product",
        }
    ]
    
},
{
    timestamps : true
});

module.exports = mongoose.model("user", userSchema);