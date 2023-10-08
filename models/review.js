const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text : {
        type : String
    },
    rating : {
        type : String
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