import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbconnect from "./src/Database/dbconnections.js";
import Register_user from "./src/model/RegisterUser.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dbconnect();

app.get("/", (req, res) => {
  res.send("This is the upi homepage");
});

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
      res.status(200).json("NewUserCreated")
    }
  } catch (error) {
    console.log(error);
  }
});

// Login logic and redirect to the homepage.
app.post("/api/login_users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register_user.findOne({ email: email });
    if (!user) {
      res.status(400).json("user not found!");
    } else {
       bcrypt.compare(password, user.password).then((isMatch)=> {
        if (!isMatch) {
        res.status(401).json("Invalid password!");
      } else {
        // Generate the jwt token
        const token = jwt.sign({ id: user._id, email: user.email }, "user12", {
          expiresIn: "2m",
        });
        res.cookie("token", token)
        res.json({ message: "token send" }, token);
      }
      }).catch((error) => {
        console.log(error)
      })
      
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error!" });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
