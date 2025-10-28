import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import Register from '../model/RegisterUser';


const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Register.findOne({ email: email });
    if (user) {
      return res.status(200).json("already registered!");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      Register.create({
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


/// login logic: --
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email: email });
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



export default router