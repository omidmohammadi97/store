const redisClient = require("../utils/init_redis");
const { HomeRoutes } = require("./api");
const { authRoutes } = require("./user/auth");
(async()=>{
    await redisClient.set("key" , "value")
    const value = await redisClient.get("key")
    console.log(value)
})()
const router = require("express").Router();

router.use("/" ,HomeRoutes)
router.use("/user" ,authRoutes)
module.exports = {
    allRoutes : router
}