const controller = require("../../controllers")
const {userModel} = require("../../../../models/users")
const {authSchema} = require("../../../validators/user/auth.schema")
const {randomNumber} = require("../../../../utils/functions")
const { EXPIRESIN , USER_ROLE } = require("../../../../utils/constans")
const createError = require("http-errors")
module.exports = new class authConrtoller extends controller{
  
     login =async (req , res ,next)=> {
        try {
        await authSchema.validateAsync(req.body)
        const {mobile} = req.body;
        const code = randomNumber();
        const result = await this.saveUser(mobile , code)
        console.log(result)
        if(!result) throw createError(401 , "unauthorized error")
        return res.status(200).send({
         data : {
            statusCode : 200,
            message : "otp has been sent successfully",
            code ,
            mobile 
         }
        })
         } catch (error) {
            next(error)
         }
   }

   saveUser = async (mobile , code) => { 
      let otp = {
         code ,
         expiresIn : EXPIRESIN
      }
      const user = await this.checkExistUser(mobile)
      if(user){
         return await this.updateUser(mobile , otp)
      }
      return !!(await userModel.create({
         mobile ,
         otp,
         Roles: [USER_ROLE]
      }))
      
   }

   checkExistUser = async (mobile) => {
      const user = await userModel.findOne({mobile})
      return !!user
      
   }
   updateUser = async (mobile , _data = {}) => {
      Object.keys(_data).forEach( key => { 
         if(["", " ", 0 , null , undefined, "0" , NaN].includes(_data[key])) delete _data[key]
      })
      const updateResult = await userModel.updateOne({mobile} , {$set : _data})
      return !!updateResult.modifiedCount
 }
}