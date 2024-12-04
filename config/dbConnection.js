import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbConnection = async () => {
    try {
        const instance = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nambaird25");
        // console.log(process.env.MONGO_URI)
        console.log("DB Connected Successfuly");
    } catch (error) {
        console.log("failed to connect db");
    }
};

export default dbConnection;