const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    phone : {
        type : Number
    },
    role : {
        type : String,
    },
    
});

module.exports = mongoose.model("user", userSchema);