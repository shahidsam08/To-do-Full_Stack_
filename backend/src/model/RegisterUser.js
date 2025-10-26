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

const Register_user = mongoose.model("Register_user", UserSchema);
export default Register_user
