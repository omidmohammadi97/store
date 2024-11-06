const { ProductModel } = require("../../../models/products");
const { creatProductSchmea } = require("../../validators/admin/product.schema")
const {deleteFileInPublic , listOfImagesFromRequest, copyObject, setFeatures} = require("../../../utils/functions")

const path = require("path")
const createError = require("http-errors");

const Contoller = require("../controllers");
const { objectIdValidator } = require("../../validators/public.validator");
const {StatusCodes :httpStatus } = require("http-status-codes")
class ProductController extends Contoller{
    async AddProduct(req , res ,next){
        try {
            console.log(req.body)
            const images = listOfImagesFromRequest(req?.files || [] , req.fileUploadPath)
            const productBody = await creatProductSchmea.validateAsync(req.body)
            const supplier = req.user._id
            const {title  , shortDesc  , fullDesc , tags , category , price , discount,count,height,width,wieght,length} = productBody;
            setFeatures(req.body)

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
            return res.status(httpStatus.CREATED).json({
                statusCode : httpStatus.CREATED, 
                message : "new product created successfully"
            })
        } catch (error) {
            console.log("error", error)
            deleteFileInPublic(req.file.path.replace(/^.*public[\\/]/, ''))
            next(error)
        }
    } 
    async editProduct(req , res ,next){
        try {
            const data = copyObject(req.body);
            data.images = listOfImagesFromRequest(req?.files || [] , req.fileUploadPath);
           
        } catch (error) {
            console.log("error", error)
            next(error)
        }
    } 
    async getAllProducts(req , res ,next) {
        try {
            const search = req?.query.search ||"";
            let products;
            if(search){
                 products = await ProductModel.find({
                    $text : {
                        $search : search
                    }
                });

            }else{
                products = await ProductModel.find({});
            }
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
          return res.status(httpStatus.OK).json({
            data : {
                statusCode : httpStatus.OK,
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
            return res.status(httpStatus.OK).json({
              data : {
                  statusCode : httpStatus.OK,
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