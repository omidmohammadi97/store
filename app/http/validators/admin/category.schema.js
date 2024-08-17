const Joi= require("@hapi/joi");

const categorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("title must be between 3 and 30 characters")),
    parent : Joi.string().allow('').allow("").error(new Error("selected parent is not valid "))
})
const categorySchemaUpdate = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("title must be between 3 and 30 characters"))
})
module.exports={
    categorySchema,
    categorySchemaUpdate
}