const createError = require("http-errors");
const { BlogModel } = require("../../../models/blogs");
const controller = require("../controllers");
const { date } = require("@hapi/joi/lib/template");

class BlogController extends controller{
    async createBlog(req , res ,next) {
        try {
            
        } catch (error) {
            
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