const mongoose = require("mongoose");
const { mainModule } = require("process");
const { StringDecoder } = require("string_decoder");


const admin = new mongoose.Schema({
    Aname : {
        type : String,
        required : true
    },
    Apassword : {
        type : String,
        required : true
    },
    Aemail :{
        type : String,
        required: true
    },
    Aphone :{
        type : String,
        required: true
    },
})

module.exports = mongoose.model('Admin',admin);