const {CategoryController} = require("../../http/controllers/admin/category.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   - name: Admin Categories
 *     description: Admin pannel routes and data for categories
*/
/**
 * @swagger
 * /admin/category/create:
 *   post:
 *     summary: create new catgeory
 *     tags: 
 *       - Admin Categories
 *     description: Create new category from admin pannel
 *     parameters: 
 *       - name: title
 *         in: formData
 *         description: Title of category
 *         required: true
 *         schema:
 *           type: string
 *       - name: parent
 *         in: formData
 *         description: parent of category
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/
router.post("/create" , CategoryController.addCategory)
/**
 * @swagger
 * /admin/category/update/{id}:
 *   patch:
 *     summary: upadte  catgeory
 *     tags: 
 *       - Admin Categories
 *     description: update  category from admin pannel
 *     parameters: 
 *       - name: id
 *         in: path
 *         description: id of category
 *         required: true 
 *         schema:
 *           type: string
 *       - name: title
 *         in: formData
 *         description: title of category
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
*/

router.patch("/update/:id" , CategoryController.updateCategory)

/**
 * @swagger
 * /admin/category/parents:
 *   get:
 *     summary: get all parents
 *     tags: 
 *       - Admin Categories
 *     description: get all parents
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */


router.get("/parents" , CategoryController.getParents)
/**
 * @swagger
 * /admin/category/remove/{id}:
 *   delete:
 *     summary: delete category by id
 *     tags: 
 *       - Admin Categories
 *     description: delete category by id
 *     parameters:
 *          -   in : path
 *              name : id
 *              required : true
 *              type : string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/remove/:id" , CategoryController.deleteCategory)
/**
 * @swagger
 * /admin/category:
 *   get:
 *     summary: get all categories
 *     tags: 
 *       - Admin Categories
 *     description: get all categories
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get("/" , CategoryController.getAllCategories)
router.get("/getAllHeads" , CategoryController.getAllHeads)
/**
 * @swagger
 * /admin/category/{id}:
 *   get:
 *     summary: get category by id
 *     tags: 
 *       - Admin Categories
 *     description: get category by id
 *     parameters:
 *          -   in : path
 *              name : id
 *              required : true
 *              type : string
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/:id" , CategoryController.getCategoryById)
/**
 * @swagger
 * /admin/category/children/{parent}:
 *   get:
 *     summary: get all children parent
 *     tags: 
 *       - Admin Categories
 *     parameters : 
 *           -  in : path
 *              name : parent
 *              type : string
 *              required : true
 *     description: get all children parent
 *     responses:
 *       201:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401: 
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/children/:parent" , CategoryController.getChildsOfParents)


module.exports = {
    categoryRouter : router
}