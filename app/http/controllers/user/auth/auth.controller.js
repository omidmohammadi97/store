const controller = require("../../controllers")
const {authSchema} = require("../../../validators/user/auth.schema")
module.exports = new class authConrtoller extends controller{
  
     auth =async (req , res ,next)=> {
        try {
        const  result =await authSchema.validateAsync(req.body)
        return res.status(200).send(result)
         } catch (error) {
            next(error)
         }
   }
}