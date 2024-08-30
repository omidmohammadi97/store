const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const createError = require("http-errors");
const { userModel } = require("../../models/users");
const { request } = require("express");

function getToken(headers){
    const [bearer , token] = headers?.authorization?.split(" ") || [];
    console.log("headers",headers);
    
    if(token && bearer?.toLowerCase() == "bearer") return {token , bearer};
    throw createError(503,"your token is not valid")
}

function VerifyAccessToken(req , res ,next){
    try {
        const {token , bearer} = getToken(req.headers);
        console.log("bearer", bearer)
        console.log("token", token)
    
        if(token && bearer?.toLowerCase() == "bearer"){
            jwt.verify(token , ACCESS_TOKEN_SECRET_KEY , async (err , payload)=>{
                try {
                    if(err) throw next(createError(401 , "plase sign in again"))
                        const {mobile} = payload || {};
                        const user = await userModel.findOne({mobile} , {password : 0 , token : 0 , otp : 0 , bills : 0 , birthday : 0 , discount : 0 })
                        if(!user)throw createError(404 , "user not found")
                        request.user = user;
                        return next();
                } catch (error) {
                    next(error)
                }
            })
        }
        else return next(createError(401 , "your token is not valid"))
    } catch (error) {
     next(error)   
    }
   
}

function checkRole(role){
    return function(req,res,next){
       try {
         const user = req.user;
         if(user.Roles.includes(role)) return next();
         throw createError(403 , "access denied")
       } catch (error) {
        next(error)
       }
    }
}

module.exports = {
    VerifyAccessToken,
    checkRole
}