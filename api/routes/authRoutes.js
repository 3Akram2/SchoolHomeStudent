import express from "express";
import {registerUserWithGoogle,registerWithEmailPass,authUser,logOut} from '../contollers/authController.js';
import { decodeToken } from "../middleware/firebaseToken.js";
const router = express.Router();
router.post('/registerWithGoogle',decodeToken,registerUserWithGoogle)
router.post('/registerWithEmailPass',decodeToken,registerWithEmailPass)
router.post('/login',decodeToken,authUser)
router.post('/logout',logOut)

export default router;