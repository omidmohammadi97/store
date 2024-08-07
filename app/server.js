const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const {allRoutes} = require("./router/router")
const morgan = require("morgan")
const swaggerUI = require("swagger-ui-express")
const swaggerJSDOC = require("swagger-jsdoc")
const createError = require("http-errors")
const { description } = require("@hapi/joi/lib/schemas")
 module.exports =  class application{
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT , DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToMongoDB();
        this.createServer();
        this.createRoutes();
        this.errorHandling();

    }

    configApplication(){
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extends : true}))
        this.#app.use(express.static(path.join(__dirname , '..', 'public')))
        this.#app.use("/apis" , swaggerUI.serve , swaggerUI.setup(swaggerJSDOC({
            swaggerDefinition : {
                info :{
                    title : "store apis",
                    version : "2.0.0.0",
                    description : "test apis for store project"
                },
                servers : [
                    {
                        url : "http://localhost:5000"
                    }
                ]
            },
            apis : ["./app/router/*/*.js"]
        })))

    }

    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT , ()=>{
            console.log("server runs on port " + this.#PORT)
        })
    }
    connectToMongoDB(){
        mongoose.connect(this.#DB_URI).then(()=>{
            console.log(this.#DB_URI);
            console.log("Connection established!");
     }).catch(error =>{
        console.log(this.#DB_URI);

        console.log(error?.message ?? "Failed to connect to DB")
    })
    mongoose.connection.on("disconnected" , ()=>{
        console.log("mongoose connection disconnected! ")
    })
    
    process.on("SIGINT" , async()=> {
        await mongoose.connection.close();
        process.exit(0)
    })
  
    }
    createRoutes(){
        this.#app.use(allRoutes);
    }
    errorHandling(){
        this.#app.use((req , res ,next)=>{
            next(createError(404 , "page not found")) 
        })
        this.#app.use((error , req , res, next)=>{
            const serverError = createError(500 , "internal server error")
            const statusCode = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                    errors : {
                         statusCode , 
                         message 
                    }
            })
        })
    }

 }