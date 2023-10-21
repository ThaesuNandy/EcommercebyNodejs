const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content : {
        type : String
    },
    rating : {
        type : Number,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
    
},
{
    timestamps : true
});

module.exports = mongoose.model("review", reviewSchema);