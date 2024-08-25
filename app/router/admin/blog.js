const {BlogController} = require("../../http/controllers/admin/blog.controller");
const StringToArray = require("../../http/middlewares/stringToArray");
const uploadFile = require("../../utils/multer");

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
router.get("/" , BlogController.getList)
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
router.post("/add" ,uploadFile.single("image"), StringToArray("tags"),BlogController.createBlog)
module.exports = {
    blogRouter : router
}