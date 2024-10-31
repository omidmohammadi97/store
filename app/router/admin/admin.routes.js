const { VerifyAccessToken } = require("../../http/middlewares/verifayAccessToken");
const { blogRouter } = require("./blog");
const { categoryRouter } = require("./category");
const { AdminApiProductRouter } = require("./product");

const router = require("express").Router();
router.use("/category" , categoryRouter);
router.use("/blogs" , blogRouter);
router.use("/products"  ,AdminApiProductRouter);

module.exports = {
    adminRoutes : router
}