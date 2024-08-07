const Joi= require("@hapi/joi");

const authSchema = Joi.object({
    // email : Joi.string().email().required().lowercase().trim().error(new Error("فرمت وارد شده صحیح نمیباشد")),
    // password : Joi.string().min(6).max(16).trim().required().error(new Error("پسورد باید بین 6 تا 16 کاراکتر باشد"))
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("please enter  currect format for mobile!"))
})
module.exports={
    authSchema
}