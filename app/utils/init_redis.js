const redis = require("redis");
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect" , ()=> {
    console.log("connect to redis")
});
redisClient.on("error" , (err)=> {
    console.log("error",err )
});
redisClient.on("connected" , ()=> {
    console.log("connected to redis")
});
redisClient.on("end" , ()=> {
    console.log("disconnected from redis")
});
module.exports =redisClient;