const authController = require("../../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();

router.post("/auth", authController.auth)
module.exports = {
    authRoutes : router
}