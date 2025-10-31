import React, { useEffect } from "react";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import { SlArrowRightCircle } from "react-icons/sl";
import { LiaPencilAltSolid } from "react-icons/lia";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

axios.defaults.withCredentials = true;
function Profile() {
  const [username, setUsername] = useState("");
  const [email, setUseremail] = useState("");
  const [isLoggedout, setIsLoggedOut] = useState(false);

  /*---- Automatic useEffect axios API GET Request --------------- */
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:5004/api/profile", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "successfull") {
            setUsername(res.data.username);
            setUseremail(res.data.useremail);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("try catch block error", error);
    }
  }, []);

  /* -------- Log Out API request ------------ */
  const logouthandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("http://localhost:5004/api/logout", {
        withCredentials: true,
      });
      if (res.data.message === "Tokencleared") {
        setIsLoggedOut(true);
        navigate(-2);
      } else if ((res.data.message = "badRequest")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  /* --------------- use another useEffect for the refresh the webpage ------------ */

  useEffect(() => {
    if (isLoggedout) {
      alert("You are logged out!");
      navigate("/");
    }
  }, [logouthandler]);

  /*--------------------------- File upload using MULTER ------------------*/
  const fileupload = () => {};

  return (
    <div className="bg-black w-full h-screen flex flex-col align-middle justify-center items-center gap-5">
      <h1 className="text-white text-6xl">Profile</h1>
      <div className="border-white border-2 rounded-2xl w-[90%] md:w-[35%] h-[75%] flex flex-col gap-4 items-center px-1 py-5">
        <form
          encType="multipart/form-data"
          className="border-2 border-white w-30 h-30 rounded-full flex flex-col align-middle justify-center items-center p-1 mb-8"
        >
          <div className="bg-white w-28 h-29 rounded-full flex items-center align-center justify-center text-center ">
            userimage
          </div>
        </form>
        <div className=" bg-green-500 w-[95%] text-2xl rounded-2xl text-black text-center p-3 flex flex-row items-center align-middle justify-between">
          <p>Upload photo </p>
          <MdOutlineFileUpload className="text-3xl" />
        </div>
        <div className=" bg-black border-2 border-white w-[95%] text-2xl text-white rounded-2xl p-3 flex flex-row align-middle justify-between items-center">
          <p>
            {isLoggedout ? <p className="text-white">User name</p> : username}{" "}
          </p>
          <LiaPencilAltSolid />
        </div>
        <div className=" bg-black border-2 border-white w-[95%] text-2xl text-white rounded-2xl p-3 flex flex-row align-middle justify-between items-center">
          <p>
            {isLoggedout ? <p className="text-white">User name</p> : email}{" "}
          </p>
          <LiaPencilAltSolid />
        </div>
        <Link to="/history" className="w-[95%]">
          <div className=" bg-green-500 text-2xl rounded-2xl text-black text-center p-3 flex flex-row items-center align-middle justify-between">
            <p>History of Notes</p>
            <SlArrowRightCircle className="text-white text-2xl font-bold" />
          </div>
        </Link>
        <button
          onClick={logouthandler}
          className=" bg-red-500 w-[95%] text-white text-center text-2xl rounded-2xl p-3 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
