import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterUser",
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
