const { Schema, default: mongoose, Types } = require("mongoose");

const productSchema = new mongoose.Schema({
    title : { type : String , required : true},
    shortDesc : { type : String , required : true},
    fullDesc : { type : String , required : true},
    images : { type : [String] , required : true, default : []},
    tags : {type : [String] , default : [] ,  required : true},
    category : { type : Types.ObjectId ,  ref:"category" , required : true},
    comments : { type : [], required : true},
    likes : { type : [Types.ObjectId] , default : [], required : true},
    dislikes : { type : [Types.ObjectId] , default : [], required : true},
    bookmarks : { type : [Types.ObjectId], default : [] , required : true},
    price : { type : Number , required : true},
    discount : { type : Number , default : 0 },
    count : { type :Number , default : 0},
    type : { type : String , required : true}, 
    supplier : {type: mongoose.Types.ObjectId, ref:"user", required : true},
    time : { type : String },
    format : { type : String },
    owner : { type : Types.ObjectId },
    features : { type : Object , default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        model : [],
        madein : "",
    } },


})
productSchema.index({title : "text" , shortDesc : "text" , fullDesc : "text"})
module.exports = {
    ProductModel : mongoose.model("product" , productSchema)
}