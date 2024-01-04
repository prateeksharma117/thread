import mongoose from "mongoose";

let isConnected = false;

export const  connectedToDb=async() => {
    mongoose.set("strictQuery",true)

    if(!process.env.MONGODB_URL) return console.log("MONGODB_URL not found")
    if(isConnected) return console.log("Connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log("Mongoose is connected");
        
    } catch (e) {
        console.log(e);
        
    }
    
}