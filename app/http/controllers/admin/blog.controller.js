const createError = require("http-errors");
const { BlogModel } = require("../../../models/blogs");
const controller = require("../controllers");
const { creatBlogSchmea } = require("../../validators/admin/blog.schema");
const path = require("path")
const {deleteFileInPublic} = require("../../../utils/functions")
class BlogController extends controller{
    async createBlog(req , res ,next) {
        try {            
            const blogDataBody =  await creatBlogSchmea.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath , blogDataBody.filename)
            const image = req.body.image;
            req.body.image = req.body.image.replace(/\\/g ,"/");
            const author = req.user._id
            const {title  , short_text  , content , tags , category } = blogDataBody;
            const blog = await BlogModel.create({title  , short_text  , content , tags , category , image , author});
            return res.status(200).json({
                statusCode : 200 , 
                message : "new blog created"
            })
            
        } catch (error) {
            console.log(error)
            deleteFileInPublic(req.file.path.replace(/^.*public[\\/]/, ''))
            next(error)
        }
    }
    async getById(req , res ,next) {
        try {
            console.log("req.params" , req.params)
            const {id} = req.params;
            const blog = await this.findBlog({_id : id})
            res.status(200).json({
                    data : {
                        statusCode: 200,
                        blog
                    }
                })
        } catch (error) {
            next(error)
        }
    }
    async getList(req , res ,next) {
        try {
            const blogs = await BlogModel.aggregate([
                {$match : {}},
                {$lookup : {
                    from : "users",
                    localField : "author",
                    foreignField : "_id",
                    as : "author"
                }},
                {$lookup : {
                    from : "categories",
                    localField : "category",
                    foreignField : "_id",
                    as : "category"
                }},
                {$unwind : "$category"},

                {$unwind : "$author"},
                {$project : {
                    "author.otp" : 0,
                    "author.bills" : 0,
                    "author.discount" : 0,
                    "author.Roles" : 0,
                    "author.__v" : 0 ,
                    "category.__v" : 0,
                    "category.parent" : 0,

                }}
            ]);
            if(!blogs) throw createError(404 , "no blogs has been found")
            res.status(200).json({
                date : {
                    statusCode: 200,
                    blogs
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getCommnects(req , res ,next) {
        try {
            
        } catch (error) {
            
        }
    }
    async deleteById(req , res ,next) {
        try {
            const {id} = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({_id : id})
            if(result.deletedCount == 0) throw createError(500 , "delete was not successfull")
            return res.status(200).json({
            data : {
                statusCode : 200 , 
                message : "delete blog successfully"
           }})
            
        } catch (error) {
            
        }
    }
    async updateById(req , res ,next) {
        try {
            const {id} = req.params;
            await this.findBlog(id)
            if(req?.body?.fileUploadPath && req?.body?.filename){
                
                req.body.image = path.join(req.body.fileUploadPath , req.body.filename)
                req.body.image = req.body.image.replace(/\\/g ,"/");
            }
            const data = req.body;
            let nullish = ["" , " " , "0" , 0 , null , undefined]
            let blackList = ["bookmarks" , "dislike" , "like" , "comments" , "author"]
            Object.keys(data).forEach(key => {
                if(blackList.includes(key)) delete data[key]
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim());
                if(nullish.includes(data[key])) delete data[key] 
            })

            const updateResult = await BlogModel.updateOne({_id :id}, {data});
            if(updateResult.modifiedCount == 0) throw createError(500 , "update failed")
            return res.status(200).json({
                statusCode : 200 , 
                message : "blog updated"
            })
            
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async  findBlog(id){
          const blog = await BlogModel.findById(id).populate([{path : "category_deatail" ,  select : {_id : 1 , title : 1}} , {path : "user" , select : {_id : 1 , mobile : 1}}])
          if(!blog) throw createError(404 , "blog not found");
          delete  blog.category_deatail.children;
          return blog
      
    }
}
module.exports = {
    BlogController : new BlogController()
}