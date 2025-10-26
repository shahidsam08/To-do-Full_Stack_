import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "New_User" });
    console.log("database is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default dbconnect;
