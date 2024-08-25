const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createError = require("http-errors");
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
        const filePath = createRoute(req);
        cb(null , filePath)
    },
    filename : (req ,file ,cb)=>{
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        cb(null , fileName)
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
const uploadFile = multer({
    storage ,filterUploads
})
module.exports =uploadFile