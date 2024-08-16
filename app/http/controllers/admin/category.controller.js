const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Contoller = require("../controllers")
const {categorySchema} = require("../../validators/admin/category.schema");
const mongoose  = require("mongoose");
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
    async updateCategory(req , res , next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteCategory(req , res , next){ 
        try {
            
            const {id} = req.params
            const category =  await this.checkCategoryExists(id);
            console.log("category " , category)
            const deleteCategory = await CategoryModel.deleteMany({
                $or : [
                     {_id : category._id},
                     {parent : category._id}
            ]})
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
            // const category = await CategoryModel.aggregate([
            //     {
            //         $lookup:{
            //             from : "categories",
            //             localField : "_id",
            //             foreignField : "parent" ,
            //             as : "children"
            //         }
            //     },
            //     {
            //         $project :{ 
            //             __v : 0,
            //         "children.__v" : 0 ,
            //         "children.parent" : 0
            //         } 
            //     }, 
            //     {
            //         $match : {
            //             parent : undefined
            //         }
            //     }
            // ]);
            const category = await CategoryModel.aggregate([
                {
                    $graphLookup:{
                        from : "categories",
                        startWith :"$_id",
                        connectFromField : "_id" ,
                        connectToField : "parent",
                        maxDepth : 5,
                        depthField : "depth",
                        as : "children"
                    }
                },
                {
                    $project :{ 
                        __v : 0,
                    "children.__v" : 0 ,
                    "children.parent" : 0
                    } 
                }, 
                {
                    $match : {
                        parent : undefined
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
    async getCategoryById(req , res , next){
        try {
             const {id} = req.params
              const category = await CategoryModel.aggregate([
                {
                    $match : {_id :new  mongoose.Types.ObjectId(id)}
                },
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
            return res.status(201).json({
                data : {
                    category
                }
            })
            
        } catch (error) {
            next(error)
        }
    }
    async getAllHeads(req , res , next){
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
        return category
    }

}
module.exports = {
    CategoryController : new CategoryController()
}