import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from 'helmet'
import dbconnect from "./src/Database/dbconnections.js";
import cookieParser from "cookie-parser";
import Authrouter from "./src/Router/AuthRouter.js";
import notesrouter from './src/Router/notesrouter.js'

const app = express();
dotenv.config();
app.use(cors({ origin:'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet())

dbconnect(); // database connection.

// server home
app.get("/", (req, res) => {
  res.send("This is the upi homepage");
});

/* ------------- Authlogic handle [ signup, login, validation, profile, dashboard] */
app.use("/api", Authrouter);



/* notes handle ( show notes on the frontend, show other details.) */
app.use("/user", notesrouter)



app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
