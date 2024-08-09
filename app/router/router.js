const { HomeRoutes } = require("./api");
const { authRoutes } = require("./user/auth");

const router = require("express").Router();

router.use("/" ,HomeRoutes)
router.use("/user" ,authRoutes)
module.exports = {
    allRoutes : router
}