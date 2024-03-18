// require('dotenv').config({path:'./env'});

import dotenv from "dotenv";

dotenv.config({path:'./env'});

import mongoose from 'mongoose';

// import { DB_NAME } from './constants.js';

import express from "express";

import { app } from "./app.js";

// const app=express();

import connectdb from './db/index.js';

connectdb()
.then(() => {
    // app.on("error",()=>{
    //     console.log("Error!!");
    // })
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`Server is listening at port:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed");
});
/*


(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",()=>{
            console.log("Error: ",error);
            throw error;
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port: ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("ERROR: ",error);
        throw error;
    }
})()

*/