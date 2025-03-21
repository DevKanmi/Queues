import { config } from "dotenv";
import mongoose from "mongoose";
import Redis from 'ioredis'
import { Queue } from "bullmq";


config()

const MONGO_URI: any = process.env.MONGO_URI

export const dbConnection = async() =>{
    try{
    await mongoose.connect(MONGO_URI)
    console.log(`Connected to Database successfuly`)
    }
    catch(error: any){
        console.log(`Error Connecting to the Database: ${error.message}`)
    }
}

//Redis connection
const emailQueue = new Queue("emailQueue", {
  connection: {
    host: process.env.REDIS_HOST, // Your Redis Cloud host
    port: Number(process.env.REDIS_PORT), // Your Redis Cloud port
    password: process.env.REDIS_PASS, // Your Redis Cloud password
  },
});

export default emailQueue;
