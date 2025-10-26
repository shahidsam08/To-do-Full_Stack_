import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

function Register() {
  // client side logic
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const registerData = await axios.post(
      "http://localhost:5004/api/register_user",
      { name: name, email: email, password: password }
    );
      if(registerData.data === "already registered!") {
        alert("Already registered")
        navigate("/")
      } else if(registerData.data === "NewUserCreated") {
        alert("New User")
      } else {
        alert("Nothing happen!")
      }
    } catch(error) {
      console.log(error)
    }
  };
  return (
    <div className="w-full h-screen flex flex-col align-middle justify-center items-center">
      <div className="flex flex-col w-[95%] align-middle justify-center items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/128/8521/8521476.png"
          alt="wokemindimage"
          width="130"
        />
        <h1 className="text-center text-4xl">Welcome to WokeMind</h1>
        <p className="text-center text-3xl mb-8">
          Make Your plan, Store Online, Change anytime from anywhere.{" "}
        </p>
        <form
          action=""
          className="flex flex-col gap-4 w-[90%] align-middle justify-center items-center"
          onSubmit={handlesubmit}
        >
          <input
            type="text"
            required
            name="name"
            placeholder="Enter your name"
            maxLength={20}
            className="border-2 border-black w-[90%] p-2 text-2xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%]"
            onChange={(e) => setName(e.target.value)}
          />
          {/* for taking email */}
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            className="border-2 border-black w-[90%] p-2 text-2xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%]"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* for taking password */}
          <input
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            maxLength={15}
            className="border-2 border-black w-[90%] p-2 text-2xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%]"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* for sign up */}
          <button
            type="submit"
            className="border-2 border-black w-[90%] p-2 text-3xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%] hover:bg-black hover:text-white transition duration-1000 ease-in-out font-bold cursor-pointer"
          >
            Sign up
          </button>
        </form>
        <p className="text-3xl mt-3">
          Already have an Account?
          <Link to="/" className="underline font-bold">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
