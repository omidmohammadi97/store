const { Schema, default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    author : {type : Types.ObjectId , required : true},
    title : {type : String , required : true },
    content : {type : String , required : true},
    image : { type : String , required : true},
    tags : {type : [String] , default : []},
    category : {type : Types.ObjectId , required : true},
    comments : {type : [] , default : []},
    like : {type :[Types.ObjectId] , default : [] },
    dislike : {type :[Types.ObjectId] , default : [] } , 
    bookmark : {type :[Types.ObjectId] , default : [] } 
})

module.exports = {
    BlogModel : mongoose.model("blog" , Schema)
}