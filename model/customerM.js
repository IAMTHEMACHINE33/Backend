const mongoose = require("mongoose");
const { mainModule } = require("process");
const { StringDecoder } = require("string_decoder");

const customer = new mongoose.Schema({
    firstname :{
        type: String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    username:{
        type :String,
        required: true
    },
    age:{
        type : Number,
    },
    password : {
        type : String,
        required: true
    },
    email :{
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Customer',customer);