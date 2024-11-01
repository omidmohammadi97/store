const controller = require("../../controllers")
const {userModel} = require("../../../../models/users")
const {checkOtpSchema , getOtpSchema} = require("../../../validators/user/auth.schema")
const {randomNumber , signAccessToken, VerifyRefreshToken, signRefreshToken} = require("../../../../utils/functions")
const { USER_ROLE } = require("../../../../utils/constans")
const createError = require("http-errors")
module.exports = new class authConrtoller extends controller{
  
     getOtp =async (req , res ,next)=> {
        try {
        await getOtpSchema.validateAsync(req.body)
        const {mobile} = req.body;
        const code = randomNumber();
        const result = await this.saveUser(mobile , +code)
        console.log("resss" ,result)
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
   refreshToken =async (req , res ,next)=> {
      try {
         const {refreshToken} = req.body;
         const mobile = await VerifyRefreshToken(refreshToken);
         const user = await userModel.findOne({mobile});
         const accessToken = await signAccessToken(user._id);
         const newRefreshToken = await signRefreshToken(user._id);
         return res.json({
            data : {
               accessToken,
               refreshToken  : newRefreshToken
            }
         })
       } catch (error) {
          next(error)
       }
 }

    checkOtp = async (req , res, next)=>{
       try {
          await checkOtpSchema.validateAsync(req.body)
         const {mobile , code} = req.body;

         const user = await userModel.findOne({mobile})
         if(!user) throw  createError(404 , "user not found")

         if(user.otp.code != parseInt(code) ) throw  createError(401 ,"unauthorized error")
         const now = Date().now;
         if(user.otp.expiresIn < now) throw createError(401, "The code has expired");
         const accessToken = await signAccessToken(user._id)
         const refreshToken = await signRefreshToken(user._id)
         return res.json({
            data : {
               accessToken,
               refreshToken
            }
         })
       }
       catch(error){
         // console.log("err",error)
         next(error)
       }
    }
   saveUser = async (mobile , code) => { 
      console.log("new Date().now" ,  Date.now() )
      let otp = {
         code ,
         expiresIn :  Date.now() + 120000
      }
      console.log("otp" , otp)
      const user = await this.checkExistUser(mobile)
      console.log("user" , user)

      if(user){
         return await this.updateUser(mobile , otp)
      }
      return !!(await userModel.create({
         mobile ,
         otp,
         Roles: USER_ROLE.USER
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
      const updateResult = await userModel.updateOne({mobile} , {otp : _data})
      return !!updateResult.modifiedCount
 }
}