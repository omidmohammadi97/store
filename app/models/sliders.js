const { type } = require("express/lib/response");
const { Schema, default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String },
    text : {type : String },
    image  : {type : String , required : true},
})

module.exports = {
    SliderModel : mongoose.model("slider" , Schema)
}