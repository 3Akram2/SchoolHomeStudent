import express from "express";
import {updateProfile} from '../contollers/userController.js';
import { decodeCustomToken } from "../middleware/customToken.js";




const router = express.Router();
router.patch('/updateprofile',decodeCustomToken,updateProfile)

export default router;
