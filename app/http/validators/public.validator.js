const Joi = require("@hapi/joi")
const { MongoIDPattern } = require("../../utils/constans")

const objectIdValidator= Joi.object({
    id: Joi.string().pattern(MongoIDPattern).error(new Error("Invalid Object ID")),

})
module.exports = {
    objectIdValidator
}