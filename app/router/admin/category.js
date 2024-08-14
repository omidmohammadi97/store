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
/**
 * @swagger
 * /admin/category/update:
 *   post:
 *     summary: upadte  catgeory
 *     tags: 
 *       - Admin Categories
 *     description: update  category from admin pannel
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
router.post("/update" , CategoryController.updateCategory)
router.delete("/delete/:id" , CategoryController.deleteCategory)
router.get("/" , CategoryController.getAllCategories)
router.get("/getAllHeads" , CategoryController.getAllHeads)
router.get("/categoryById/:id" , CategoryController.getCategoryById)
router.get("/getChildOfParents/:id" , CategoryController.getChildsOfParents)


module.exports = {
    categoryRouter : router
}