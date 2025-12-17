import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.once("connected", () => {
      console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
