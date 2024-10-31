const Joi = require("@hapi/joi");
const creatProductSchmea = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("title must between 3 and 30 characters")),
    shortDesc : Joi.string().error(new Error("invalid short text")),
    fullDesc : Joi.string().error(new Error("content must be string")),
    price : Joi.number().error(new Error("inccorect price number format")),
    discount : Joi.number().error(new Error("inccorect discount number format")),
    count : Joi.number().error(new Error("inccorect count number format")),
    height : Joi.number().empty().allow(null , 0 , "0", "").error(new Error("inccorect height number format")),
    width : Joi.number().empty().allow(null , 0 , "0", "").error(new Error("inccorect width number format")),
    wieght : Joi.number().empty().allow(null , 0 , "0", "").error(new Error("inccorect wieght number f ormat")),
    length : Joi.number().empty().allow(null , 0 , "0", "").error(new Error("inccorect length number format")),
    filename: Joi.string().pattern(/\.(png|jpg|jpeg|gif)$/i).error(new Error("Invalid image")),
    tags : Joi.array().min(0).max(20).error(new Error("tags must between 0 and 20 characters")),
    category : Joi.string().error(new Error("category is not valid")),
    fileUploadPath : Joi.allow(),
    type : Joi.string().regex(/(virtual|physical)/i)

})
module.exports = {
    creatProductSchmea 
}