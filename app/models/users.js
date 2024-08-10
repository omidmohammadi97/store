const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {type : String},
    lastName : {type : String},
    userName : {type : String ,  lownercase : true},
    mobile : {type : String},
    email : {type : String , lownercase : true},
    password : {type : String},
    otp : {type : Object , default : {
        code : 0,
        expiresIn : 0
    }},
    bills: { type : [] , default : []},
    discount : {type : Number , default : 0},
    birthday : { type : String  },
    Roles : {type : [String] , default : ["USER"]}
})

module.exports = {
    userModel : mongoose.model("user" , userSchema)
}