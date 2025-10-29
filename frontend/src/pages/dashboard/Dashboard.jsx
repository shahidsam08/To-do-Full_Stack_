import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useEffect } from "react";


axios.defaults.withCredentials = true;

function Dashboard() {

  useEffect(async () => {
    try {
      const res = await axios.post("http://localhost:5004/api/dashboard", {
        withCredentials: true,
      });

      const data = res.data;
    } catch (error) {
      console.log("The error is: ",error)
    }
  }, []);

  return (
    <div className="bg-black scroll-smooth h-auto w-full pb-15">
      <div className="flex flex-col p-4 gap-10 bg-black">
        <div className=" flex flex-row flex-nowrap items-center justify-between align-middle">
          <div>
            <GiHamburgerMenu className="text-7xl cursor-pointer text-white" />
          </div>
          <div className="font-bold text-2xl bg-blue-200 border-2 border-white px-3 rounded-2xl">
            User_name
          </div>
          <div className="border-2 border-white w-25 h-25 rounded-full flex flex-col align-middle justify-center items-center p-1">
            <div className="bg-white w-22 h-23 rounded-full flex items-center align-center justify-center text-center ">
              userimage
            </div>
          </div>
        </div>

        <form
          action=""
          className="flex flex-col  align-middle justify-center items-center gap-5"
        >
          <div className="w-[90%] flex flex-col gap-5 p-8 bg-gray-900 rounded-2xl">
            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="email" className="text-white text-3xl">
                Email :{" "}
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                className="border-2 w-[70%] text-2xl indent-3 h-15 border-white ml-2 text-white outline-offset-2 outline-blue-500 pr-3 "
                list="browser"
              />
              <datalist id="browser">
                <option value="habiba@gmail.com"></option>
                <option value="shahid@gmail.com"></option>
                <option value="irshad@gmail.com"></option>
              </datalist>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <label htmlFor="title" className="text-white text-4xl">
                Title :{" "}
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Notes Title..."
                required
                minLength={10}
                maxLength={50}
                autoComplete="off"
                className="border-2 w-[70%] text-2xl indent-3 h-15 border-white ml-2 text-white outline-offset-2 outline-blue-500"
              />
            </div>
            <div className="flex flex-row gap-4 align-middle items-center">
              <label htmlFor="text" className="text-white text-3xl">
                Notes :{" "}
              </label>
              <input
                type="text"
                name="notes"
                id="text"
                placeholder="Enter your Notes.."
                required
                autoComplete="off"
                maxLength={200}
                className="border-2 w-[70%] h-15 text-2xl indent-3 border-white text-white outline-offset-2 outline-blue-500 "
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 px-5 py-3 text-3xl rounded-2xl"
          >
            Create
          </button>
        </form>
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

export default Dashboard;
