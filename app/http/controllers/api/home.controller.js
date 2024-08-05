const controller = require("../controllers")
module.exports = new class HomeConrtoller extends controller{
    indexPage = (req , res ,next)=> {
        return res.status(200).send("index page store")
    }
}