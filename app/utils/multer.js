const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
const { status } = require("express/lib/response");
function createRoute(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const directory =  path.join(__dirname , ".." , ".." , "public" , "uploads" , "blogs" , year , month , day)
    req.body.fileUploadPath = path.join("uploads" , "blogs" , year , month , day)
    fs.mkdirSync(directory, { recursive: true });

    return directory;
}
const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        if(file?.originalname){
          const filePath = createRoute(req);
          return  cb(null , filePath)
        }
        cb(null , null)
    },
    filename : (req ,file ,cb)=>{
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null , fileName)

        }
        return cb(null,null)
    }
});

function filterUploads(req , file ,cb){
    const ext = path.extname(file.originalname);
    const mimTypes = ["image/jpg","image/jpeg","image/gif","image/png",]
    if(mimTypes.includes(ext)){
        return cb(null , true)
    }
    return cb(createError(504 , "file is not valid"))
}
const maxSize = 1 * 100 *100 //1MB
const uploadFile = multer({
    storage,filterUploads , limits  : {fileSize : maxSize}
})
module.exports =uploadFile