const { default: mongoose, Types } = require("mongoose");
const {commnetSchema} = require("./public.schema")


const blogSchema = new mongoose.Schema({
    author : {type : Types.ObjectId , required : true, ref : "user"},
    title : {type : String , required : true },
    short_text : {type : String , required : true },
    content : {type : String , required : true},
    image : { type : String , required : false},
    tags : {type : [String] , default : []},
    category : {type : Types.ObjectId , required : true},
    comments : {type : [commnetSchema] , default : []},
    like : {type :[Types.ObjectId] ,ref : "users", default : [] },
    dislike : {type :[Types.ObjectId] , ref : "users",default : [] } , 
    bookmark : {type :[Types.ObjectId] ,ref : "users", default : [] } ,
},
{
    timestamps :true ,
    versionKey : false,
    id : false,
    toJSON : {
        virtuals : true
    }
    
})

blogSchema.virtual("user", {
    ref : "user",
    localField : "author",
    foreignField : "_id"
})
blogSchema.virtual("category_deatail", {
    ref : "category",
    localField : "category",
    foreignField : "_id"
})


module.exports = {
    BlogModel : mongoose.model("blog" , blogSchema)
}