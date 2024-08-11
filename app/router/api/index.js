const homeController = require("../../http/controllers/api/home.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifayAccessToken");
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
 *     parameters:
 *         -  in: header
 *            name : accessToken
 *            example : Bearer your Token
 *     responses:
 *       200:
 *         description: DONE
 */
router.get("/",VerifyAccessToken, homeController.indexPage)
module.exports = {
    HomeRoutes : router
}
