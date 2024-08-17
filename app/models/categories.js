const { ref } = require("@hapi/joi/lib/compile");
const { Schema, default: mongoose, Types } = require("mongoose");

const categorySchema = new mongoose.Schema({
    title : {type : String , required : true},
    parent : {type : Types.ObjectId , ref : "category" , default : undefined}
},
{
    id : false,
    toJSON : {
        virtuals : true
    }
});

categorySchema.virtual("children", {
    ref : "category",
    localField : "_id",
    foreignField : "parent"
})

function autoPopulate(next){
 
        this.populate([{path : "children", select : {__v : 0 , id : 0}}])
        next()
}
categorySchema.pre('findOne' ,autoPopulate).pre("find" ,autoPopulate)

module.exports = {
    CategoryModel : mongoose.model("category" , categorySchema)
}