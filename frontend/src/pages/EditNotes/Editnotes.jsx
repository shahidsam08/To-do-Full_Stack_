import React, { useEffect, useState } from "react";
import axios from "axios";

function Editnotes() {

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center align-middle justify-center">
      <div className="w-[60%] h-[70%] p-5 bg-gray-800 rounded-2xl gap-10 flex flex-col align-middle justify-center items-center">
        <h1 className="text-white text-6xl font-stretch-ultra-condensed">
          Edit Your Notes
        </h1>
          <form
            className="flex flex-col gap-5 align-middle justify-center items-center w-[90%]"
            action=""
          >
            <div className="flex flex-col gap-5 w-full">
              <input
                className="border-2 border-pink-400 w-full p-3 text-white text-3xl rounded-2xl"
                type="text"
                name="title"
              />
              <input
                className="border-2 border-pink-400 w-full p-3 text-white text-3xl rounded-2xl"
                type="text"
                name="notes"
              />
            </div>
            <div>
              <button className="text-white bg-blue-500 text-3xl p-5 rounded-2xl">
                Save Changes
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default Editnotes;
