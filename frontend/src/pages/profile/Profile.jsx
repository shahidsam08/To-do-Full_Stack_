import React, { useEffect } from "react";
import axios from 'axios'

function Profile() {
  useEffect(() => {
    try {
      axios.get("http://localhost:5004/api/profile",{
        withCredentials: true
      }).then((res) => {

      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      
    }
  })
  return (
    <div className="bg-black w-full h-screen flex flex-col align-middle justify-center items-center">
      <div className="border-blue-500 border-2 rounded-2xl w-[35%] h-[70%] flex flex-col gap-4 items-center p-5">
        <div className="border-2 border-white w-30 h-30 rounded-full flex flex-col align-middle justify-center items-center p-1 mb-8">
          <div className="bg-white w-28 h-29 rounded-full flex items-center align-center justify-center text-center ">
            userimage
          </div>
        </div>
        <div className=" bg-gray-300 w-[95%] text-2xl rounded-2xl text-black p-3">Upload photo</div>
        <div className=" bg-gray-300 w-[95%] text-2xl rounded-2xl text-black p-3">user_name</div>
        <div className=" bg-gray-300 w-[95%] text-2xl rounded-2xl text-black p-3">User_email</div>
        <div className=" bg-gray-300 w-[95%] text-2xl rounded-2xl text-black p-3">History_notes</div>
        <div className=" bg-red-500 w-[95%] text-white text-center text-2xl rounded-2xl  p-3">Logout</div>
      </div>
    </div>
  );
}

export default Profile;
