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
    },
    addressId : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "address",
        }
    ]
    
});

module.exports = mongoose.model("user", userSchema);