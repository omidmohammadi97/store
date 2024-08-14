const { Schema, default: mongoose, Types } = require("mongoose");

const categorySchema = new mongoose.Schema({
    title : {type : String , required : true},
    parent : {type : Types.ObjectId}
})

module.exports = {
    CategoryModel : mongoose.model("category" , categorySchema)
}