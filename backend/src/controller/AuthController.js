import Register from "../model/RegisterUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ---------------- Sign up controller------------------- */
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Register.findOne({ email: email });
    if (user) {
      return res
        .status(200)
        .json({ message: "already registered", success: false });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);
      Register.create({
        name: name,
        password: hashedpassword,
        email: email,
      });
      res.status(200).json({ message: "newUserCreated", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

/* ---------------- login controller ------------------- */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        // making the jwt token and send to the frontend.
        const token = jwt.sign(
          { email: email, userId: user._id },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/"
        });
        return res
          .status(200)
          .json({ message: "Log in successfully", success: true });
      } else {
        return res.status(401).json({ message: "Invalid password!" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Email is wrong!", success: false });
    }
  } catch (error) {
    console.log("The error is ", error);
  }
};

/* ---------------- dashboard controller ------------------- */
const dashboard = async (req, res) => {
  res.status(200).json({ useremail: req.user.email, success: true });
};

/* ---------------- profile controller ------------------- */
const profile = async (req, res) => {
  const token = req.cookies
  try {
    const user = await Register.findOne({ email: req.user.email });
    if (user) {
      res.status(200).json({
        message: "successfull",
        useremail: user.email,
        username: user.name,
      });
    } else {
      res.status(400).json({ message: "NO data found!" });
    }
  } catch (error) {
    res.json(error);
  }
};

/* ---------------- logout controller logic ------------------- */

const logout = async (req, res) => {
  const token = req.cookies;
  try {
    if(token) {
      res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/"
    });
    res.status(200).json({ message: "Tokencleared", success: true });
    } 
    
  } catch (error) {
    res.status(404).json({ message: "Internal error" });
  }
};

export { signup, login, dashboard, profile, logout };
