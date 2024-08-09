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
 * /user/login:
 *   post:
 *     summary: Log in user to user panel with phone number
 *     tags: 
 *       - Auth
 *     description: One-time password login
 *     parameters: 
 *       - name: mobile
 *         in: formData
 *         description: fa_IR phone number
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

router.post("/login", authController.login);

module.exports = {
    authRoutes: router
};
