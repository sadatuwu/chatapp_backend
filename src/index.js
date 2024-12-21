// const express = require("express") // require function loads module, loaded into variable called express

//instead to writing the previous syntax in commonjs syntax, you can use import export syntax
//to do so, add "type": "module" in packege.json, by default its type: commonjs


import express from "express" // now you can write it like this because of type:module
// and calling it express

import authRoutes from "./routes/auth.route.js" //importing the default export of that path
import messageRoutes from "./routes/message.route.js" //importing the default export of that path

//and calling it autoRoutes, so its a varible, no need to use curly braces
import {connectDB} from "./lib/db.js" // importing connectDB, not default
// so use curly braces, and same name as it was in the export...

import cookieParser from "cookie-parser"

import dotenv from "dotenv"


dotenv.config()

const app = express(); // create an instance/object of express named 'app'

app.use(express.json()); //to extract json data, needed, to fetch user given data

app.use(cookieParser());

app.use("/api/auth", authRoutes) // so Route is like view of django
app.use("/api/messages",messageRoutes)


const PORT = process.env.PORT  // gets port from .env 
app.listen(PORT, ()=>{
    console.log("server is running on port localhost:"+PORT);
    connectDB();

})
/**
 * this is a modern ES6+ syntax
 * here, listen is a asyncronous method taking 2 parameter, a port number, and a call back function
 * ()=> {  }    this is the syntax of a callback funtion
 * a call back funtion executes when the aysncronous method executes
 * meaning, only  when the server is succesfully started at port PORT, the callback funtion will execute  
 */
