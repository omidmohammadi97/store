const { ProductModel } = require("../../../models/products");
const { creatProductSchmea } = require("../../validators/admin/product.schema")
const {deleteFileInPublic , listOfImagesFromRequest} = require("../../../utils/functions")

const path = require("path")
const createError = require("http-errors");

const Contoller = require("../controllers");
const { objectIdValidator } = require("../../validators/public.validator");

class ProductController extends Contoller{
    async AddProduct(req , res ,next){
        try {
            console.log(req.body)
            const images = listOfImagesFromRequest(req?.files || [] , req.fileUploadPath)
            const productBody = await creatProductSchmea.validateAsync(req.body)
            // req.body.image = path.join(productBody.fileUploadPath , productBody.filename)
            // const images = req.body.image.replace(/\\/g ,"/");
            const supplier = req.user._id
            const {title  , shortDesc  , fullDesc , tags , category , price , discount,count,height,width,wieght,length} = productBody;
            let features = {} , type = "physical" 
            if(width || height || wieght || length){

                if(!width) features.width = 0;
                else features.width = width
                if(!height) features.height = 0;
                else features.height = height
                if(!wieght) features.wieght = 0;
                else features.wieght = wieght
                if(!length) features.length = 0;
                else features.length = length
            } else{
                type = "virtual"
            }

            const product = await ProductModel.create({
                title,
                shortDesc,
                fullDesc,
                category,
                tags,
                count,
                price,
                discount,
                images,
                features,
                supplier,
                type
              })
            return res.status(200).json({
                statusCode : 201 , 
                message : "new product created successfully"
            })
        } catch (error) {
            console.log("error", error)
            deleteFileInPublic(req.file.path.replace(/^.*public[\\/]/, ''))
            next(error)
        }
    } 

    async getAllProducts(req , res ,next) {
        try {
            const products = await ProductModel.find({});
            return res.status(200).json({
                data : {
                    statusCode : 200,
                    products
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async getOneProduct(req , res ,next) {
      try {
          const {id} = req.params;
          const product = await this.findProductById(id);
          return res.status(200).json({
            data : {
                statusCode : 200,
                product
            }
          })
      } catch (error) {
        next(error)
      }

    }
    async findProductById(productId) {
        const {id} = await objectIdValidator.validateAsync({id: productId});
        const product = await ProductModel.findById(id);
        if(!product) throw new Error("Product not found")
        return product;

    }
    async deleteOneProduct(req , res ,next) {
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const removeProduct = await ProductModel.deleteOne({_id : product._id})
            if(removeProduct.deletedCount ==0) throw createError.HttpError()
            return res.status(200).json({
              data : {
                  statusCode : 200,
                  message : "product removed successfully"
              }
            })
        } catch (error) {
          next(error)
        }
  
      }
}
module.exports = { 
    ProductController : new ProductController()
}