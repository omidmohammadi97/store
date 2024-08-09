const controller = require("../../controllers")
const {userModel} = require("../../../../models/users")
const {authSchema} = require("../../../validators/user/auth.schema")
const {randomNumber} = require("../../../../utils/functions")
const createError = require("http-errors")
module.exports = new class authConrtoller extends controller{
  
     login =async (req , res ,next)=> {
        try {
        const  result =await authSchema.validateAsync(req.body)
        const {mobile} = req.body;

        const otp = randomNumber();
        return res.status(200).send(result)
         } catch (error) {
            next(error)
         }
   }

   saveUser = async (mobile) => { //20MIN
      const user = await this.checkExistUser(mobile)
      if(!user) throw new createError(404 , "user not found")
      return await this.updateUser(mobile , {
         otp : {
            code ,
            expiresIn 
         }
      })
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