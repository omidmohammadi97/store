const {BlogController} = require("../../http/controllers/admin/blog.controller");
const {stringToArray} = require("../../http/middlewares/stringToArray");
const uploadFile = require("../../utils/multer");
const {VerifyAccessToken} = require("../../http/middlewares/verifayAccessToken");
const { VerifyRefreshToken } = require("../../utils/functions");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   - name: Admin Blogs
 *     description:  blog routes and data 
*/
/**
 * @swagger
 * /admin/blogs:
 *   get:
 *     summary: get all blogs
 *     tags: 
 *       - Admin Blogs
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
router.get("/" ,BlogController.getList)
/**
 * @swagger
 * /admin/blogs/{id}:
 *   get:
 *     summary: get all blogs
 *     tags: 
 *       - Admin Blogs
 *     content:
 *         application/json:
 *             type: object
 *             properties:
 *               id :
 *                   type: string
 *         application/x-www-form-urlencoded:
 *             type: object
 *             properties:
 *               id :
 *                   type: string       
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
router.get("/:id" , BlogController.getById)
/**
 * @swagger
 * /admin/blogs/add:
 *   post:
 *     summary:  create a new blog
 *     tags: 
 *       - Admin Blogs
 *     requestBody:
 *       required: true
 *     content :
 *       application/json:
 *             schema:
 *             type: object
 *             properties :
 *                title :
 *                  type: string
 *                  required: true
 *                short_text :
 *                  type : string
 *                  required: true
 *                content :
 *                  type : string
 *                  required: true
 *                tags :
 *                  type: string
 *                  required: true
 *                category :
 *                  type: string
 *                  required: true 
 *                image : 
 *                  type : file
 *           
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
router.post("/add" ,VerifyAccessToken , uploadFile.single("image"), stringToArray("tags"),BlogController.createBlog)
/**
 * @swagger
 * /admin/blogs/{id}:
 *   delete:
 *     summary: delete one blog by id
 *     tags: 
 *       - Admin Blogs
 *     parameters:
 *          - in : header
 *            name : accesstoken
 *            type : string
 *            required : true
 *            value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEzNDQyMzEyNCIsImlhdCI6MTcyNDYwODY3NCwiZXhwIjoxNzI0NjEyMjc0fQ.dW7TkQe2Opu7XjZUbvnATzsj4hYNLuFXxkfXqlMcn4w
 *          - in : path
 *            name : id
 *            type : string
 *            required : true
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
router.delete("/:id" , BlogController.deleteById)
/**
 * @swagger
 * /admin/blogs/update/{id}:
 *   patch:
 *     summary: Update blog
 *     tags: 
 *       - Admin Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               short-text:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: string
 *               category:
 *                 type: string
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
router.patch("/update/:id" ,  stringToArray("tags"),BlogController.updateById)

module.exports = {
    blogRouter : router
}