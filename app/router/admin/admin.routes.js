const { categoryRouter } = require("./category");

const router = require("express").Router();
router.use("/category" , categoryRouter);

module.exports = {
    adminRoutes : router
}