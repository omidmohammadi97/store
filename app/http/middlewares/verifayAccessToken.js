const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const createError = require("http-errors");
const { userModel } = require("../../models/users");
const { request } = require("express");

function VerifyAccessToken(req , res ,next){
    const headers = req.headers;
    // console.table(headers)
    const [bearer , token] = headers?.accesstoken?.split(" ") || [];
    if(token && bearer?.toLowerCase() == "bearer"){
        jwt.verify(token , ACCESS_TOKEN_SECRET_KEY , async (err , payload)=>{
            if(err) return next(createError(401 , "plase sign in again"))
            const {mobile} = payload || {};
            const user = await userModel.findOne({mobile} , {password : 0 , token : 0 , otp : 0 , bills : 0 , birthday : 0 , discount : 0 })
            if(!user) createError(404 , "user not found")
            request.user = user;
            return next();
        })
    }
    else return next(createError(401 , "your token is not valid"))
}

module.exports = {
    VerifyAccessToken
}