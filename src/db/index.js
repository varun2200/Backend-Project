import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectdb=async ()=>{
    try {
        const connectionresponse=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected!! DB:Host:${connectionresponse.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection error");
        process.exit(1);
    }
}

export default connectdb;