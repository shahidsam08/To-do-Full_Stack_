import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./src/Database/dbconnections.js";
import cookieParser from "cookie-parser";
import Authrouter from "./src/Router/AuthRouter.js";

const app = express();
dotenv.config();
app.use(cors({ origin:'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

dbconnect(); // database connection.

// server home
app.get("/", (req, res) => {
  res.send("This is the upi homepage");
});

// Authlogic ( sign up logic, sign in logic )
app.use("/api", Authrouter);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
