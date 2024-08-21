const { blogRouter } = require("./blog");
const { categoryRouter } = require("./category");

const router = require("express").Router();
router.use("/category" , categoryRouter);
router.use("/blogs" , blogRouter);

module.exports = {
    adminRoutes : router
}