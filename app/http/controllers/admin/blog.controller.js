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

            const {title  , short_text  , content , tags , category } = blogDataBody;
            const blog = await BlogModel.create({title  , short_text  , content , tags , category , image});
            return res.json({
                blog,
                blogDataBody , 
                image :  req.body.image
            })
            
        } catch (error) {
            console.log(error)
            deleteFileInPublic(req.file.path.replace(/^.*public[\\/]/, ''))
            next(error)
        }
    }
    async getById(req , res ,next) {
        try {
            const {id} = req.params;
            const blog = await BlogModel.findById({id})
            if(!blog) throw createError(404 , "blog does not exist")
            res.status(200).json({
                    date : {
                        statusCode: 200,
                        blog
                    }
                })
        } catch (error) {
            
        }
    }
    async getList(req , res ,next) {
        try {
            const blogs = await BlogModel.find();
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
            
        } catch (error) {
            
        }
    }
    async updateById(req , res ,next) {
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = {
    BlogController : new BlogController()
}