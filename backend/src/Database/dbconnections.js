import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = async () => {
  // check the mongo uri set or not.
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) throw new Error("MONGO_URI is not set!");
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "TODO_database" });
    console.log("database is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default dbconnect;
