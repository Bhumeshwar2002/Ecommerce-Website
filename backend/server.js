const app=require("./app");

const dotenv = require("dotenv");

const connectDatabase=require("./config/database")


// handling the uncaught exception
process.on("uncaughtException",(err)=>{
    console.log( `Error: ${err.message}`);
    console.log(`shutting down the server due to uncaught error`);
    process.exit(1)
})

//config
dotenv.config({path:"backend/config/config.env"});

//connecting to the database

connectDatabase()



const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});


// inhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to unhandeled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})