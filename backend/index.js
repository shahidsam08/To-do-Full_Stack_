import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbconnect from "./src/Database/dbconnections.js";
import cookieParser from "cookie-parser";
import AuthRouter from './src/Router/AuthRouter.js'
import Register from "./src/model/RegisterUser.js";


dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


dbconnect();  // database connection.


// server home
app.get("/", (req, res) => {
  res.send("This is the upi homepage");
});


// sign up logic ( Authrouter file from the router file.)
app.use("/api", AuthRouter )


app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
