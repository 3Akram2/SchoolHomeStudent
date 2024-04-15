import express from 'express';
import { decodeCustomToken } from '../middleware/customToken.js';
import {sendMail,getSentMails,getReceivedtMails} from '../contollers/mailController.js';

const router = express.Router();
router.post('/send',decodeCustomToken,sendMail);
router.get('/sent',decodeCustomToken,getSentMails);
router.get('/received',decodeCustomToken,getReceivedtMails);
export default router;