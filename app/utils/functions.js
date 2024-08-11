const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const { reject } = require("bcrypt/promises");
function randomNumber(){
    return Math.floor(Math.random() * 9000) + 10000
}

async function  signAccessToken(userId){
    return new Promise(async (resolve , reject)=>{
        const user = await userModel.findById(userId)
        const payload = {
            mobile : user.mobile,
        };
        const secret ="";
        const options = {
            expiresIn : "1h"
        };
        jwt.sign(payload , ACCESS_TOKEN_SECRET_KEY , options , (err , token)=>{
            if(err) reject(createError(500 , " internal server error" ))
            resolve(token)
        })

    })
}
async function  signRefreshToken(userId){
    console.log("hll" , userId)
    return new Promise(async (resolve , reject)=>{
        const user = await userModel.findById(userId)
        console.log("YSER" , user)
        const payload = {
            mobile : user.mobile,
        };
        const secret ="";
        const options = {
            expiresIn : "1y"
        };
        jwt.sign(payload , REFRESH_TOKEN_SECRET_KEY , options , (err , token)=>{
            if(err) reject(createError(500 , " internal server error" ))
            resolve(token)
        })

    })
}
async function VerifyRefreshToken(token){

    return new Promise(async (resolve , reject)=>{
            jwt.verify(token , REFRESH_TOKEN_SECRET_KEY , async (err , payload)=>{
            if(err) reject(createError(401 , "plase sign in again"))
                const {mobile} = payload || {};
                const user = await userModel.findOne({mobile} , {password : 0 , token : 0 , otp : 0 , bills : 0 , birthday : 0 , discount : 0 , __v : 0 , Roles:0 })
                if(!user) reject(createError(404 , "user not found"))
            resolve(mobile)
        })
     
    })

}
module.exports = {
    randomNumber,
    signAccessToken,
    signRefreshToken,
    VerifyRefreshToken
}