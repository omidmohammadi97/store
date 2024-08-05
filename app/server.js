 const express = require("express")
 const mongoose = require("mongoose")
 const path = require("path")
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
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extends : true}))
        this.#app.use(express.static(path.join(__dirname , '..', 'public')))

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
      
    }
    createRoutes(){

    }
    errorHandling(){
        this.#app.use((req , res ,next)=>{
            return res.status(404).json({
                statusCode : 404 , 
                message : "page not found :)"
            })
        })
        this.#app.use((error , req , res, next)=>{
            const statusCode = error.status || 500;
            const message = error.message || "Internal server error";
            return res.status(statusCode).json({
                    statusCode , 
                    message 
            })
        })
    }

 }