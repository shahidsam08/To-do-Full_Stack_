import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password : {
      type : String,
      require: true,
    }
  },
  { timestamps: true }
);

const Register = mongoose.model("Register", UserSchema);
export default Register
