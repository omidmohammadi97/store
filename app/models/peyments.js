const { Schema, default: mongoose, Types } = require("mongoose");

const Schema = new mongoose.Schema({

})

module.exports = {
    BlogModel : mongoose.model("blog" , Schema)
}