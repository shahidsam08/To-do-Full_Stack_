import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbconnect from "./src/Database/dbconnections.js";
import Register_user from "./src/model/RegisterUser.js"; //model
import dashboard from "./src/model/dashboard.js"; // homepage model

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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

// Login logic and redirect to the homepage.
app.post("/api/login_users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register_user.findOne({ email: email });
    if (user) {
      const databasepassword = await bcrypt.compare(password, user.password);
      if (databasepassword) {
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
    const { title, notes, email } = req.body;
    const user = await Register_user.findOne({ email: email });
    if (user) {
      const dashboarduser = await dashboard.findOne({email : email})
      if (dashboarduser) {
         res.json("make only one notes!")
      } else {
        await dashboard.create({
          email: email,
          title: title,
          notes: notes,
        });
       res.json("Notes created!")
      }
    } else {
      return res.json("user not found!");
    }
  } catch (error) {
    console.log("The error is ", error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
