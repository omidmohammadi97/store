const { type } = require("express/lib/response");
const { Schema, default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    firstName : {type : String},
    lastName : {type : String},
    userName : {type : String},
    phone : {type : String},
    email : {type : String},
    password : {type : String},
    otp : {type : Object , default : {
        code : 0,
        expires :0
    }},
    bills: { type : [] , default : []},
    discount : {type : Number , default : 0},
    birthday : { type : String  }
})

module.exports = {
    userModel : mongoose.model("user" , Schema)
}