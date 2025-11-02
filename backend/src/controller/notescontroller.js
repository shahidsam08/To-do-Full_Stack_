import Register from "../model/RegisterUser.js";
import Notes from "../model/UserNotes.js";
import jwt from "jsonwebtoken";

const userNotes = async (req, res) => {
  try {
    const { title, notes } = req.body;
    const data = req.user;
    const verifyuser = await Register.findOne({ email: data.email });
    if (verifyuser) {
      const notesuser = await Notes.create({
        title: title,
        notes: notes,
        userid: data.userId,
      });
      if (notesuser) {
        res.json("Created successfully.");
      }
    } else {
      res.json("some internal problem");
    }
  } catch (error) {
    res.json(error);
  }
};

/* show notes controller show all the related user history notes show on the page. */

const shownotes = async (req, res) => {
  try {
    const data = req.user;
    if (data) {
      const user = await Notes.find({ userid: data.userId });
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "UnauthoriseToken" });
    }
  } catch (error) {
    res.status(400).json({ message: "bad request" });
  }
};

// Delete the notes from the dashboard and also from the database.

const deleteNotes = async (req, res) => {
  try {
    const noteid = req.params.id;
    const deleteNotes = await Notes.findByIdAndDelete({ _id: noteid });
    if (deleteNotes) {
      res.status(200).json({ message: "DeleteSuccessfully" });
    } else {
      res.status(401).json({ message: "Notes not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

/** ----------------------- When I click on the edit button it send the id to the backend and edit some specific notes ------------------ */

// -------------------- notes edit send request -----------//
const editnotes = async (req, res) => {
  try {
    const noteid = req.params.id;
    const finduser = await Notes.findOne({ _id: noteid });
    if (finduser) {
      res.status(200).json({ message: "EditRequestsuccessfully" });
    }
  } catch (error) {
    res.json("Server error");
  }
};



// ---------------------- for editing notes ---------------------//

const updatenotes = async (req, res) => {
  try {
    const id = req.params.id;
    const {title, notes} = req.body
    const updateData = await Notes.findByIdAndUpdate(id, {title, notes}, {new : true});
    if(!updateData) {
      return res.status(404).json({message : "Note not found"})
    } else {
      res.status(200).json({message : "Note update successfully", data: updateData})
    }
  } catch (error) {
    res.status(500).json({message : "server error"})
  }
}

export { userNotes, shownotes, deleteNotes, editnotes, updatenotes };
