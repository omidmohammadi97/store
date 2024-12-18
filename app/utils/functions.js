const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
// const fs = require("file-system");
const fs = require('fs'); 
const path = require('path');
const redisClient = require("./init_redis");
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
    return new Promise(async (resolve , reject)=>{
        const user = await userModel.findById(userId)
        const payload = {
            mobile : user.mobile,
        };
        const options = {
            expiresIn : "1y"
        };
        jwt.sign(payload , REFRESH_TOKEN_SECRET_KEY , options ,async (err , token)=>{
            if(err) reject(createError(500 , " internal server error" ));
            await redisClient.SETEX(userId.toString() , (360 * 24*60*60) , token)
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
                const refreshToken = await redisClient.get(user._id)
                if(token == refreshToken) return resolve(mobile)
                reject(createError(401,"please signin again to your account"))
        })
     
    })

}
function deleteFileInPublic(fileAddress){
    try {
        if(fileAddress){
            const pathFile = path.join(__dirname  ,"..","..","public", fileAddress)
            if(fs.existSync(pathFile)) fs.unlinkSync(pathFile);   
        }
    
    } catch (error) {
        throw error
    }

}
function listOfImagesFromRequest(files , fileUploadPath){
    if(files?.length >0){
        return (files.map(file => path.join( fileUploadPath , file.filename))).map(item => item.replace(/\\/g ,"/"))
    }else{
        return []
    }
}

function copyObject(object){
    return JSON.parse(JSON.stringify(object)) 
}
function setFeatures(body){
    const {colors, width, height , length , wieght} = body;

    let features = {};
    features.colors = colors
    if(width || height || wieght || length){

        if(!width) features.width = 0;
        else features.width = width
        if(!height) features.height = 0;
        else features.height = height
        if(!wieght) features.wieght = 0;
        else features.wieght = wieght
        if(!length) features.length = 0;
        else features.length = length
    } 
    return features;
}
module.exports = {
    listOfImagesFromRequest,
    randomNumber,
    signAccessToken,
    signRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    copyObject,
    setFeatures
}