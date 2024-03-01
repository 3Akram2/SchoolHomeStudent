import express from "express";
import {addSchool,getAllUsers} from '../contollers/adminController.js';
import { decodeCustomToken } from "../middleware/customToken.js";




const router = express.Router();
router.post('/addschool',decodeCustomToken,addSchool);
router.get('/allusers',decodeCustomToken,getAllUsers);


export default router;
