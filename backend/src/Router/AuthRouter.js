import express from 'express'
import { signupvalidation, loginvalidation } from '../middleware/Authvalidation.js';
import {signup , login} from '../controller/AuthController.js';


const router = express.Router();

// sign up logic 
router.post("/signup", signupvalidation, signup );


/// login logic: --
router.post("/login",loginvalidation, login);



export default router