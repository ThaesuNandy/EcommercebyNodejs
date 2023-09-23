const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    text : {
        type : String
    },
    rating : {
        type : String
    },
    
});

module.exports = mongoose.model("review", reviewSchema);