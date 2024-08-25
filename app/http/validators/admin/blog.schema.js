const Joi = require("@hapi/joi");
const creatBlogSchmea = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("title must between 3 and 30 characters")),
    short_text : Joi.string().error(new Error("invalid short text")),
    content : Joi.string().error(new Error("content must be string")),
    // filename : Joi.string().pattern(/(\.png | \.jpg | \.jpeg | \.gif)$/).error(new Error("Invalid image")),
    filename: Joi.string().pattern(/\.(png|jpg|jpeg|gif)$/i).error(new Error("Invalid image")),
    tags : Joi.array().min(0).max(20).error(new Error("tags must between 0 and 20 characters")),
    category : Joi.string().error(new Error("category is not valid")),
    fileUploadPath : Joi.allow()

})
module.exports = {
    creatBlogSchmea
}