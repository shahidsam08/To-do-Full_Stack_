import Register from "../model/RegisterUser.js";
import Notes from "../model/UserNotes.js";
import jwt from "jsonwebtoken";

const userNotes = async (req, res) => {
  try {
    const { title, notes } = req.body;
    const data = req.user;
    const verifyuser = await Register.findOne({email: data.email})
      if (verifyuser) {
        const notesuser = await Notes.create({
            title: title,
            notes: notes,
            userid : data.userId 
        })
        if(notesuser) {
          res.json("Created successfully.")
        }        
      } else {
        res.json("some internal problem")
      }
  } catch (error) {
    res.json(error);
  }
};

export default userNotes;
