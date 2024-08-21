const {BlogController} = require("../../http/controllers/admin/blog.controller");

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
module.exports = {
    blogRouter : router
}