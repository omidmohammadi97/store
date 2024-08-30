const authController = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();



/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth page routes and data
 */

/**
 * @swagger
 * /user/getOtp:
 *   post:
 *     summary: Log in user to user panel with phone number
 *     tags: 
 *       - Auth
 *     description: One-time password login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
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

/**
 * @swagger
 * /user/checkOtp:
 *   post:
 *     summary: check otp that sent to user mobile
 *     tags: 
 *       - Auth
 *     description: check otp
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *               code :
 *                 type: string
 *         application/x-www-form-urlencoded:
 *             type: object
 *             properties:
 *               mobile:
 *                 type: string
 *               code :
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
/**
 * @swagger
 * /user/refreshToken:
 *   post:
 *     summary: create resfresh token for get new token and refresh token
 *     tags: 
 *       - Auth
 *     description: refresh Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             type: object
 *             properties:
 *               refreshToken :
 *                   type: string
 *         application/x-www-form-urlencoded:
 *             type: object
 *             properties:
 *               refreshToken :
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

router.post("/getOtp", authController.getOtp);
router.post("/checkOtp", authController.checkOtp);
router.post("/refreshtoken", authController.refreshToken);

module.exports = {
    authRoutes: router
};
