import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";

function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5004/api/login_users",
        {
          email: email,
          password: password,
        }
      );
      if (response.data === "Email is wrong!") {
        return alert("Incorrect Email.");
      } else if (response.data === "Invalid password!") {
        return alert("Invalid password");
      } else if (response.data === "Log in successfully") {
          return navigate("/homepage")
      }
    } catch (error) {
      console.log("Error is : ", error);
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
        <h1 className="text-center text-4xl">Welcome Back to WokeMind</h1>
        <p className="text-center text-3xl mb-8">
          <span className="text-3xl font-bold">Log In</span> to Make Your plan,
          Store Online, Change anytime from anywhere.{" "}
        </p>
        <form
          action=""
          className="flex flex-col gap-4 w-[90%] align-middle justify-center items-center"
          onSubmit={handleLogin}
        >
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
            autoComplete="true"
            className="border-2 border-black w-[90%] p-2 text-2xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%]"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* for sign up */}
          <button
            type="submit"
            className="border-2 border-black w-[90%] p-2 text-3xl rounded-2xl indent-2 outline-blue-500 md:w-[75%] lg:w-[50%] hover:bg-black hover:text-white transition duration-1000 ease-in-out font-bold cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
      <p className="text-center text-3xl mt-5">
        Don't have an account?{" "}
        <Link to="/signUp_page" className="underline font-bold">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Loginpage;
