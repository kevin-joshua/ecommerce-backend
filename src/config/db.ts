import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
        await mongoose.connect(connectionString);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
