const {BlogController} = require("../../http/controllers/admin/blog.controller");
const StringToArray = require("../../http/middlewares/stringToArray");
const uploadFile = require("../../utils/multer");
const {VerifyAccessToken} = require("../../http/middlewares/verifayAccessToken")
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
 *     parameters:
 *          - in : header
 *            name : accesstoken
 *            type : string
 *            required : true
 *            value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEzNDQyMzEyNCIsImlhdCI6MTcyNDYwODY3NCwiZXhwIjoxNzI0NjEyMjc0fQ.dW7TkQe2Opu7XjZUbvnATzsj4hYNLuFXxkfXqlMcn4w
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
router.get("/" , BlogController.getList)
/**
 * @swagger
 * /admin/blogs/{id}:
 *   get:
 *     summary: get all blogs
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
router.get("/:id" , BlogController.getById)
/**
 * @swagger
 * /admin/blogs/add:
 *   post:
 *     summary:  create a new blog
 *     tags: 
 *       - Admin Blogs
 *     consumer :
 *             - multipart/form-data
 *     parameters:
 *          - in : header
 *            name : accesstoken
 *            type : string
 *            required : true
 *            value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEzNDQyMzEyNCIsImlhdCI6MTcyNDYwODY3NCwiZXhwIjoxNzI0NjEyMjc0fQ.dW7TkQe2Opu7XjZUbvnATzsj4hYNLuFXxkfXqlMcn4w
 *          - in : formData
 *            name : title
 *            required : true
 *            type: string
 *          - in : formData
 *            name : short_text
 *            required : true
 *            type: string
 *          - in : formData
 *            name : content
 *            required : true
 *            type: string
 *          - in : formData
 *            name : tags
 *            required : true
 *            type: string
 *            example : tag1#tag2#tag3
 *          - in : formData
 *            name : category
 *            required : true
 *            type: string
 *          - in : formData
 *            name : image
 *            required : false
 *            type: file
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
router.post("/add" ,VerifyAccessToken , uploadFile.single("image"), StringToArray("tags"),BlogController.createBlog)
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
 * /admin/blogs/update/:id:
 *   patch:
 *     summary:  update  blog
 *     tags: 
 *       - Admin Blogs
 *     consumer :
 *             - multipart/form-data
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
 *          - in : formData
 *            name : title
 *            type: string
 *          - in : formData
 *            name : short_text
 *            type: string
 *          - in : formData
 *            name : content
 *            type: string
 *          - in : formData
 *            name : tags
 *            type: string
 *            example : tag1#tag2#tag3
 *          - in : formData
 *            name : category
 *            required : true
 *            type: string
 *          - in : formData
 *            name : image
 *            required : false
 *            type: file
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
router.patch("/update/:id" ,VerifyAccessToken ,  StringToArray("tags"),BlogController.updateById)

module.exports = {
    blogRouter : router
}