const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Contoller = require("../controllers")
const {categorySchema} = require("../../validators/admin/category.schema");
const { date } = require("@hapi/joi/lib/template");
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
    async deleteCategory(req , res , next){
        try {
            console.log("req.params" , req.params)
            const {id} = req.params
            const category = await this.checkCategoryExists(id);
            console.log("category" , category)

            const deleteCategory = await CategoryModel.deleteOne({_id : id})
            console.log("deleteCategory" , deleteCategory)
            if( deleteCategory.deletedCount == 0) throw createError(500 , "delete was not successfull");
            res.status(200).json({
                data : {
                    statusCode : 201,
                    message : "delete was successfully"
                }
            })
        } catch (error) {
            next(error)
        } 
    }
   async getParents(req , res , next){
        try {
            const parents =  await CategoryModel.find({parent : undefined} , {__v : 0});
            return res.status(200).json({
              data : {
                parents
              }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllCategories(req , res , next){
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup:{
                        from : "categories",
                        localField : "_id",
                        foreignField : "parent" ,
                        as : "children"
                    }
                },
                {
                    $project :{ 
                        __v : 0,
                    "children.__v" : 0 ,
                    "children.parent" : 0
                    } 
                }
            ]);
            return res.status(200).json({
                data : {
                    category
                }
            })
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
    async getChildsOfParents(req , res , next){
        try {
            const {parent}  =  req.params;
            const children = await CategoryModel.find({parent} , {__V : 0})
            return res.status(200).json({
                data : {
                    children
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async checkCategoryExists(id){
        console.log("ID" , id)
        const category = await CategoryModel.findById({_id : id});
        if(!category) throw createError(404 , "category not found");
        return !!category
    }

}
module.exports = {
    CategoryController : new CategoryController()
}