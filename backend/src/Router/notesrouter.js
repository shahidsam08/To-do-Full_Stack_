import express from "express"
import  {userNotes, shownotes, deleteNotes } from "../controller/notescontroller.js"
import isVerified from "../middleware/tokenValidations.js"


const router = express.Router()


/* ---------------- save notes on the usernotes db and show on the dashboard page ---------------- */
router.post("/notes",isVerified,  userNotes)


/* shownotes api call the database to show the user history notes on the page. */

router.get("/shownotes", isVerified, shownotes)



router.delete("/:id", deleteNotes);


export default router