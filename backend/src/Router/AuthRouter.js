import express from 'express'
import { signupvalidation, loginvalidation } from '../middleware/Authvalidation.js';
import {signup , login, dashboard, profile, logout,} from '../controller/AuthController.js';
import isVerified from '../middleware/tokenValidations.js';


const router = express.Router();

/* ---------------- Sign up logic ------------------- */
router.post("/signup", signupvalidation, signup );


/* ---------------- Login logic ------------------- */
router.post("/login",loginvalidation, login);


/* ---------------- Dashboard page logic ( is verified a middleware for token validation) ------------------- */
router.post("/dashboard", isVerified, dashboard)


/* ---------------- profile page callling ------------------- */
router.get("/profile", isVerified, profile )


/* ---------------- logout api calling logic ------------------- */
router.get("/logout", logout)

export default router