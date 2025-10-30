import express from "express"
import userNotes from "../controller/notescontroller.js"
import isVerified from "../middleware/tokenValidations.js"


const router = express.Router()


/* ---------------- save notes on the usernotes db and show on the dashboard page ---------------- */
router.post("/notes",isVerified,  userNotes)


export default router