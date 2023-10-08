const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title : {
        type : String
    },
    image : {
        type : String
    },
    type : {
        type : Number
    },
    referenceId : {
        type : Number
    },
 
    
},{
    timestamps : true
});

module.exports = mongoose.model("notification", notificationSchema);