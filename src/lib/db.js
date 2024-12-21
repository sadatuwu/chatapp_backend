import mongoose from "mongoose"

export const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connectecd successfully: "+conn.connection.host);
    }
    catch(error){
        console.log("mongodb connection error:",error.message); 
    }
};

/**
 * creates an aynchronous function, and stores it in connectDB then exports that
 * asyncronous, so that it can use the await
 * need to learn more about await, promise etc
 */