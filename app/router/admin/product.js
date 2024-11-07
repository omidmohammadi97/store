const { ProductController } = require("../../http/controllers/admin/product.contoller");
const {stringToArray} = require("../../http/middlewares/stringToArray")
const uploadFile = require("../../utils/multer");
const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */ 
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - shortDesc
 *         - fullDesc
 *         - tags
 *         - category
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product
 *         shortDesc:
 *           type: string
 *           description: The short description of the product
 *         fullDesc:
 *           type: string
 *           description: The full description of the product
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the product
 *         images:
 *           type: array
 *           items:
 *              type: string
 *              format : binary
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: integer
 *           description: The price of the product
 *         height:
 *           type: string
 *           example: 0
 *           description: The height of product
 *         wieght:
 *           type: string
 *           example: 0
 *           description: The wieght of product
 *         width:
 *           type: string
 *           example: 0
 *           description: The width of product
 *         length:
 *           type: string
 *           example: 0
 *           description: The length of product
 *         type:
 *            type: string
 *            description: the type of product 
 *            example: virtual - physical
 *         colors:
 *           $ref: '#/components/schemas/Color'
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Product-edit:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product
 *         shortDesc:
 *           type: string
 *           description: The short description of the product
 *         fullDesc:
 *           type: string
 *           description: The full description of the product
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the product
 *         images:
 *           type: array
 *           items:
 *              type: string
 *              format : binary
 *         category:
 *           type: string
 *           description: The category of the product
 *         price:
 *           type: integer
 *           description: The price of the product
 *         height:
 *           type: string
 *           description: The height of product
 *         wieght:
 *           type: string
 *           description: The wieght of product
 *         width:
 *           type: string
 *           description: The width of product
 *         length:
 *           type: string
 *           description: The length of product
 *         type:
 *            type: string
 *            description: the type of product 
 *            example: virtual - physical
 *         colors:
 *           $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 * /admin/products/add:
 *   post:
 *     tags: [Admin Product]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Created new Product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/publicDefinition'
 */
router.post("/add", uploadFile.array("images" , 10), stringToArray("tags", "colors"), ProductController.AddProduct);
/**
 * @swagger
 * /admin/products:
 *   get:
 *     tags: [Admin Product]
 *     summary: Get all products
 *     parameters:
 *          - in : query 
 *            name : search
 *            type : string
 *            description : text for search in title 
 *     responses:
 *       201:
 *         description: Get all products
 */
router.get("/", ProductController.getAllProducts);
/**
 * @swagger
 * /admin/products/{id}:
 *   get:
 *     tags: 
 *       - Admin Product
 *     summary: Get One product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId of the product
 *     responses:
 *       200:
 *         description: Get One product
 */
router.get("/:id", ProductController.getOneProduct);
/**
 * @swagger
 * /admin/products/remove/{id}:
 *   delete:
 *     tags: 
 *       - Admin Product
 *     summary: Delete One product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId of the product
 *     responses:
 *       200:
 *         description: Delete One product
 */
router.delete("/remove/:id", ProductController.deleteOneProduct);
/**
 * @swagger
 * /admin/products/edit/{id}:
 *   patch:
 *     tags: [Admin Product]
 *     summary: Edit product
 *     parameters:
 *            - in: path
 *              name: id
 *              type : string
 *              required: true
 *              description: ObjectId of the product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product-edit'
 *     responses:
 *       201:
 *         description: Edit product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/publicDefinition'
 */
router.patch("/edit/:id", uploadFile.array("images" , 10), stringToArray("tags", "colors"), ProductController.editProduct);
module.exports = {
  AdminApiProductRouter: router,
};
