const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumber } = require("../../utils/functions");
/**
 * @swagger
 * tags:
 *   name: Developer
 *   description: Developer routes and data
 */

/**
 * @swagger
 * /developer/password-hash/{password}:
 *   get:
 *     tags: 
 *       - Developer
 *     summary: Hash data with bcrypt
 *     description: Create a hash from the provided password
 *     parameters:
 *       - in: path
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *     responses: 
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /developer/random-number:
 *   get:
 *     tags: 
 *       - Developer
 *     summary: Hash data with bcrypt
 *     description: random number
 *     responses: 
 *       200:
 *         description: Success
 */
router.get("/password-hash/:password" , (req , res , next)=>{
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password , salt))
})
router.get("/random-number" , (req , res , next)=>{

    return res.send(randomNumber().toString())
})
module.exports = {
    developerRoutes : router
}