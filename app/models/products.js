const { Schema, default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    title : { type : String , required : true},
    shortDesc : { type : String , required : true},
    fullDesc : { type : String , required : true},
    images : { type : [String] , required : true, default : []},
    tags : {type : [String] , default : []},
    category : { type : Types.ObjectId , required : true},
    comments : { type : [], required : true},
    like : { type : [Types.ObjectId] , default : [], required : true},
    dislike : { type : [Types.ObjectId] , default : [], required : true},
    bookmark : { type : [Types.ObjectId], default : [] , required : true},
    price : { type : Number , required : true},
    discount : { type : Number , default : 0 },
    count : { type :Number , default : 0},
    type : { type : String , required : true},
    time : { type : String },
    format : { type : String },
    teacher : { type : Types.ObjectId },
    feture : { type : Object , default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        model : [],
        madein : "",
    } },


})

module.exports = {
    ProdcutModel : mongoose.model("product" , Schema)
}