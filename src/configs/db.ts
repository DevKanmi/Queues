import { config } from "dotenv";
import mongoose from "mongoose";
import Redis from 'ioredis'

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


