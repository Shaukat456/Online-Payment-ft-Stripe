import mongoose from "mongoose";

const mongoURI = "mongodb://localhost:27017/stripe";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToMongoDB;
