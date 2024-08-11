const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("./constans");
function randomNumber(){
    return Math.floor(Math.random() * 9000) + 10000
}

async function  signAccessToken(userId){
    console.log("hll" , userId)
    return new Promise(async (resolve , reject)=>{
        const user = await userModel.findById(userId)
        console.log("YSER" , user)
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
module.exports = {
    randomNumber,
    signAccessToken
}