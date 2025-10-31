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

const deleteNotes =  async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await Notes.findById(noteId);
    if(!note) {
      return res.status(404).json({message : "Note not found"})
    }
    // delete the note
    await Notes.deleteOne({ _id: noteId })
    res.status(200).json({message : "Note deleted successfully"})
  } catch (error) {
    res.status(500).json({message : "server error", error : error})
  }
}

export { userNotes, shownotes, deleteNotes };
