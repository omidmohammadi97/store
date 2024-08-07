const homeController = require("../../http/controllers/api/home.controller");
const router = require("express").Router();
/**
 * @swagger
 *     tags:
 *       name : indexPage
 *       description : index page routes and data
 */
/**
 * @swagger
 * tag: indexPage
 * /:
 *   get:
 *     summary: Index of routes
 *     tags : [indexPage]
 *     description: Get all routes
 *     responses:
 *       200:
 *         description: DONE
 */
router.get("/", homeController.indexPage)
module.exports = {
    HomeRoutes : router
}