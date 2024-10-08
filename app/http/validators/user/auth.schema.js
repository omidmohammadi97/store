const Joi= require("@hapi/joi");

const getOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("please enter  currect format for mobile!"))
})
const checkOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("please enter  currect format for mobile!")),
    code : Joi.string().min(4).max(6).error(new Error("code is not valid"))
})
module.exports={
    getOtpSchema,
    checkOtpSchema
}