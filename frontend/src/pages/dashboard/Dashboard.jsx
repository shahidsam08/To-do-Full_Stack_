import { FaUserAlt } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Dashboard() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  // for showing the notes.
  const [submitnotes, setSubmitnotes] = useState(false);

  /** database notes and title name */
  const [shownotes, setshowNotes] = useState([]);


  /** for deleting and id  */
  const [noteid, setId] = useState("");

  /**---------------- call first time when the website load ----------------------------*/
  useEffect(() => {
    try {
      axios
        .post(
          "http://localhost:5004/api/dashboard",
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.success === true) {
            return setEmail(response.data.useremail);
          } else if (response.data.message === "badRequest") {
            return navigate("/");
          } else if (response.data === "token is expired") {
            return navigate("/");
          } else {
            return (
              <p className="font-bold text-4xl text-center">
                404 page not found
              </p>
            );
          }
        })
        .catch((err) => {
          navigate("/");
        });
    } catch (error) {
      console.log("The error is: ", error);
    }
  }, []);

  /* --------- This api axios call for store the data into the db and show on the dashboard page -----------------------------*/

  const noteshandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5004/user/notes",
        {
          title: title,
          notes: notes,
        },
        { withCredentials: true }
      );

      if (res.data === "Created successfully.") {
        setSubmitnotes(true); // check the nodtes created succesfully
        window.location.reload()
      } else if (res.data === "token is expired") {
        alert("token is expired!");
      } else if ((res.data.message = "badRequest")) {
        alert("Bad request happen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*---------------- Use the useEffect for the when i save the data and that one time is reloading the page.----------------- */
  // function for the clear input fields

  useEffect(() => {
    if (submitnotes) {
      alert("Notes are submitted successfully;");
    }
  }, [noteshandle]);

  /**------------ take the data from /user/shownotes ----------------*/

  const fetchnotes = () => {
    try {
      axios
        .get("http://localhost:5004/user/shownotes", { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            setshowNotes(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchnotes();
  }, [submitnotes]);

  /* --------------- Logic for editing the notes ---------------------------- */

  /* ----------------------- Deleting the Notes ------------------------- */
  const delnotesHandle = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5004/user/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "DeleteSuccessfully") {
            alert("note Delete successfully")
            window.location.reload()
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="bg-black scroll-smooth h-screen w-full pb-15">
      <div className="flex flex-col p-5 gap-10 bg-black">
        <div className=" flex flex-row flex-nowrap items-center justify-between align-middle">
          <div>
            <Link to="/profile">
              <FaUserAlt className="text-7xl cursor-pointer text-white" />
            </Link>
          </div>
          <div className="font-bold text-2xl bg-blue-200 border-2 border-white px-3 rounded-2xl">
            {email}
          </div>
          <div className="border-2 border-white w-25 h-25 rounded-full flex flex-col align-middle justify-center items-center p-1">
            <div className="bg-white w-22 h-23 rounded-full flex items-center align-center justify-center text-center ">
              userimage
            </div>
          </div>
        </div>

        <form
          action=""
          onSubmit={noteshandle}
          className="flex flex-col  align-middle justify-center items-center gap-5"
        >
          <div className="w-[90%] flex flex-col gap-5 p-8 bg-gray-900 rounded-2xl">
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
                className="border-2 w-[70%] text-2xl indent-3 h-15 border-white ml-2 text-white outline-offset-2 outline-blue-500 rounded-2xl"
                onChange={(e) => setTitle(e.target.value)}
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
                className="border-2 w-[70%] h-18 text-2xl indent-3 border-white text-white outline-offset-2 outline-blue-500 rounded-2xl"
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-500 hover:bg-blue-500 px-5 py-3 text-3xl cursor-pointer rounded-2xl"
          >
            Create
          </button>
        </form>
        <button
          onClick={() => {
            if (show === true) {
              setshow(false);
            } else {
              setshow(true);
            }
          }}
          className=" w-fit mb-4"
        >
          <div className=" text-4xl mt-4 w-fit bg-gray-300  border-2 border-white  indent-8   flex flex-row items-center gap-4 pt-3 pr-4 rounded-2xl ml-5">
            <p className="pb-3">History</p>{" "}
            {show ? <SlArrowDown className="font-extrabold" /> : <SlArrowUp />}
          </div>
        </button>

        {/* All the history will be shown here */}

        {shownotes.length === 0 ? (
          <p className="text-pink-500 text-2xl ml-10 ">No Notes found</p>
        ) : (
          shownotes.map((shownote) => (
            <div className="flex flex-row justify-around align-middle items-center">
              <div className="border-2 border-white w-full p-6 ml-10 rounded-2xl flex flex-col gap-7">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5" key={shownote._id}>
                    <h1 className="text-3xl text-white">
                      <span className="text-4xl font-bold text-pink-700 order-2 border-pink-500 bg-amber-200 p-1 rounded-2xl mr-3">Title:</span> {shownote.title}{" "}
                    </h1>
                    <p className="text-3xl text-white">
                      <span className="text-4xl font-bold text-pink-700 border-2 border-pink-500 bg-amber-200 p-1 rounded-2xl mr-3">Notes:</span> {shownote.notes}{" "}
                    </p>
                  </div>
                  <div className="flex lg:flex-row gap-4 flex-wrap">
                    <button className="text-white bg-blue-500 px-5 py-3 text-3xl rounded-2xl" onClick={() => {const value = window.confirm("Are you sure to confirm?")
                      if(value === true) {
                        navigate("/editNotes")
                      }
                    }}>
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-600 px-5 py-3 text-3xl rounded-2xl cursor-pointer hover:bg-red-800 transition duration-1000 ease-in-out"
                      onClick={ () => {delnotesHandle(shownote._id)}}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* This is the end of the element of the database. */}
      </div>
    </div>
  );
}

export default Dashboard;
