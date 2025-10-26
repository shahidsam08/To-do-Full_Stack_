import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Homepage() {
  const [username, setuserName] = useState("shahid ali");
  return (
    <div className="bg-black scroll-smooth h-auto w-full pb-15">
      <div className="flex flex-col p-4 gap-10 bg-black">
        <div className=" flex flex-row flex-nowrap items-center justify-between align-middle">
          <div>
            <GiHamburgerMenu className="text-7xl cursor-pointer text-white" />
          </div>
          <div className="font-bold text-2xl bg-blue-200 border-2 border-white px-3 rounded-2xl">
            {username}
          </div>
          <div className="border-2 border-white w-25 h-25 rounded-full flex flex-col align-middle justify-center items-center p-1">
            <div className="bg-white w-22 h-23 rounded-full flex items-center align-center justify-center text-center ">
              userimage
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full align-middle justify-center items-center">
          <form
            action=""
            className="flex flex-col sm:flex-col md:flex-col lg:flex-col  w-[95%] items-center gap-5 align-middle justify-center"
          >
            <textarea
              className="text-white text-2xl w-full h-50 border-2 border-white py-2 px-4 outline-offset-2 outline-blue-500"
              name="textarea"
              id="notes"
              placeholder="Enter your notes"
            ></textarea>
            <button
              type="submit"
              className="text-white bg-blue-500 px-5 py-3 text-3xl rounded-2xl"
            >
              Create
            </button>
          </form>
        </div>
        <h1 className="text-white self-start text-4xl mb-4 indent-8">
          History
        </h1>
        {/* All the history will be shown here */}
        <div className="w-full flex flex-col lg:flex-row align-middle justify-center items-center lg:self-start gap-4 md:gap-6 ">
          <textarea
            name="db_text"
            id="text-area"
            className="text-white text-2xl w-[95%] md:w-[80%] h-50 border-2 border-white py-2 px-4 outline-offset-2 outline-blue-500"
          ></textarea>
          <div className="flex flex-row lg:flex-col gap-4">
            <button className="text-white bg-blue-500 px-5 py-3 text-3xl rounded-2xl">
              Edit
            </button>
            <button className="text-white bg-red-500 px-5 py-3 text-3xl rounded-2xl">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
