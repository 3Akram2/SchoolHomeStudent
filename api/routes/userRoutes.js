import express from "express";
import multer from 'multer';
import {updateProfile,addChild,viewProfile,addTeacher,updateFcm} from '../contollers/userController.js';
import { decodeCustomToken } from "../middleware/customToken.js";
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});
const upload = multer({ storage: storage });

const router = express.Router();
//  localhowt3002/user/updateprofile
router.patch('/updateprofile',decodeCustomToken, upload.single('file'),updateProfile);
router.post('/addchild',decodeCustomToken,addChild);
router.get('/viewProfile/:userId',decodeCustomToken,viewProfile);
router.post('/addteacher',decodeCustomToken,addTeacher);
router.put('/fcm',decodeCustomToken,updateFcm);

export default router;
