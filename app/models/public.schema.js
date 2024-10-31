const {  default: mongoose, Types } = require("mongoose");

const commnetSchema =new mongoose.Schema({
    user : {type : Types.ObjectId , ref : "user" , required : true },
    comment : {type : String,  required : true },
    createdAt : {type : Date , default : new Date().now },
    parent : {type : Types.ObjectId },
})

module.exports = {
    commnetSchema
}