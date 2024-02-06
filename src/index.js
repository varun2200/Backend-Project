// require('dotenv').config({path:'./env'});

import dotenv from "dotenv";

dotenv.config({path:'./env'});

import mongoose from 'mongoose';

// import { DB_NAME } from './constants.js';

import express from "express";

const app=express();

import connectdb from './db/index.js';

connectdb();
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