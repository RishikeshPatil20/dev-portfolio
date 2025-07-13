import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = MONGODB_URL;

async function connectToMongoose(params) {
    
    try {
        mongoose.connect(url);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error",error );
        throw new Error("Mongodb Server Not Connected :"); 
    }
}
export default connectToMongoose; 

