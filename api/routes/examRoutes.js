import express from 'express';
import { decodeCustomToken } from '../middleware/customToken.js';
import {create,deleteExam,update } from '../contollers/examController.js';

const router = express.Router();
router.post('/',create);
router.delete('/:subjectId/:examId',deleteExam);
router.patch('/:examId/:subjectId',update);
// router.delete('/subject/:id',decodeCustomToken,deleteSubject);

// router.get('/subject/:id',decodeCustomToken,findOne);
// router.get('/subjects',decodeCustomToken,find);
// router.patch('/subjects/join',decodeCustomToken,joinSubject);


export default router;


