const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Contoller = require("../controllers")
const {categorySchema} = require("../../validators/admin/category.schema")
class CategoryController extends Contoller{
  async  addCategory(req , res , next){
        try {
            await categorySchema.validateAsync(req.body)
            const {title , parent} = req.body;
            const category =await CategoryModel.create({title , parent})
            if(!category) createError(500 , "internal Server Error")
            return res.status(201).json({
                statusCode : 201,
                message : "category has been created successfully"
            })
            
        } catch (error) {
            next(error)
        }
    }
    updateCategory(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    deleteCategory(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getAllCategories(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getCategoryById(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    getAllHeads(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    } 
    getChildsOfParents(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

}
module.exports = {
    CategoryController : new CategoryController()
}