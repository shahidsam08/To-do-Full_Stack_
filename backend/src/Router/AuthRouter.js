import express from 'express'
import { signupvalidation, loginvalidation } from '../middleware/Authvalidation.js';
import {signup , login, dashboard, profile,} from '../controller/AuthController.js';
import isVerified from '../middleware/tokenValidations.js';


const router = express.Router();

// sign up logic 
router.post("/signup", signupvalidation, signup );


/// login logic: --
router.post("/login",loginvalidation, login);


// dashboard logic
//* is verified from the token validation file.
router.post("/dashboard", isVerified, dashboard)


// profile page calling
router.post("/profile", isVerified, profile )

export default router