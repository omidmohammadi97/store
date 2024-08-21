const { type } = require("express/lib/response");
const { Schema, default: mongoose, Types } = require("mongoose");

const commnetSchema =new mongoose.Schema({
    user : {type : Types.ObjectId , ref : "users" , required : true },
    comment : {type : String,  required : true },
    createdAt : {type : Date , default : new Date().now },
    parent : {type : Types.ObjectId },
})

const Schema = new mongoose.Schema({
    author : {type : Types.ObjectId , required : true},
    title : {type : String , required : true },
    short_text : {type : String , required : true },
    content : {type : String , required : true},
    image : { type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : [Types.ObjectId] , required : true},
    comments : {type : [commnetSchema] , default : []},
    like : {type :[Types.ObjectId] ,ref : "users", default : [] },
    dislike : {type :[Types.ObjectId] , ref : "users",default : [] } , 
    bookmark : {type :[Types.ObjectId] ,ref : "users", default : [] } 
},
{
    timestamps :true , versionKey : false
})

module.exports = {
    BlogModel : mongoose.model("blog" , Schema)
}