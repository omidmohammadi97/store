const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifayAccessToken");
const redisClient = require("../utils/init_redis");
const {adminRoutes} = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const {developerRoutes} = require("./developer/developer.routes");
const { authRoutes } = require("./user/auth");
(async()=>{
    await redisClient.set("key" , "value")
    const value = await redisClient.get("key")
})()
const router = require("express").Router();

router.use("/" ,HomeRoutes)
router.use("/admin" , VerifyAccessToken , checkRole("ADMIN"),adminRoutes)
router.use("/user" ,authRoutes)
router.use("/developer" , developerRoutes)
module.exports = {
    allRoutes : router
}