import express from 'express';
import { decodeCustomToken } from '../middleware/customToken.js';
import { create,deleteSubject,update ,findOne, find,joinSubject} from '../contollers/subjectController.js';
const router = express.Router();
router.post('/subject',decodeCustomToken,create);
router.delete('/subject/:id',decodeCustomToken,deleteSubject);
router.patch('/subject/:id',decodeCustomToken,update);
router.get('/subject/:id',decodeCustomToken,findOne);
router.get('/subjects',decodeCustomToken,find);
router.patch('/subjects/join',decodeCustomToken,joinSubject);


export default router;


