import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbconnect from "./src/Database/dbconnections.js";
import Register_user from "./src/model/RegisterUser.js"; //model
import dashboard from "./src/model/dashboard.js"; // homepage model
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

dbconnect();

app.get("/", (req, res) => {
  res.send("This is the upi homepage");
});

// sign up logic
app.post("/api/register_user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Register_user.findOne({ email: email });
    if (user) {
      return res.status(200).json("already registered!");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      Register_user.create({
        name: name,
        password: hashedpassword,
        email: email,
      });
      res.status(200).json("NewUserCreated");
    }
  } catch (error) {
    console.log(error);
  }
});

// Secret key for token based authentication and authorisations
const secret_token = process.env.ACCESS_TOKEN_KEY;

// Login logic and redirect to the homepage.
app.post("/api/login_users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register_user.findOne({ email: email });
    if (user) {
      const databasepassword = await bcrypt.compare(password, user.password);
      if (databasepassword) {
        // making the jwt token and send to the frontend.
        const token = jwt.sign(
          { email: email, userId: user._id },
          secret_token,
          { expiresIn: "5m" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        return res.json("Log in successfully");
      } else {
        return res.json("Invalid password!");
      }
    } else {
      return res.json("Email is wrong!");
    }
  } catch (error) {
    console.log("The error is ", error);
  }
});

// dashboard page : show all the data of the user and gives access to save the title and notes of yours.
app.post("/api/notes", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.json("Authorisation denied!");
    } else {
      try {
        jwt.verify(token, secret_token);
        res.json("Logged In successfully");
      } catch (error) {
        console.log("The error is : ", error);
      }
    }
  } catch (error) {
    console.log("The error is ", error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
