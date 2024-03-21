import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import cors from "cors";
import dbConnection from './db/index.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import examRoutes from './routes/examRoutes.js'
import admin from './config/firebase-config.js';
import path from 'path';
import notificationJob from './cronJob.js'



const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(express.static('public'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();


app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/admin',adminRoutes)
app.use(subjectRoutes)
app.use('/exam',examRoutes)

const db = admin.firestore();
notificationJob.start()
// const message = {
//     notification: {
//       title: 'Upcoming Exam 2',
//       body: 'You have an exam scheduled in two days.'
//     },
//     token: 'ftj1CMcFM_uGVj3ou64c_8:APA91bHuKImeKrgtStcqoDG_5KtWqbh6iVRemb3D3QgwTu9IjNJ2sr6gIT2ClAFT9bL1MxB2SOwvlNdzh4yf4UI939gu_eob3bTatsTNHqi8WdBoy6Su3L89BeW3d_SpiRe6DeEpgnt5'
//   };
  
//   admin.messaging().send(message)
//     .then((response) => {
//       console.log('Notification sent successfully:', response);
//     })
//     .catch((error) => {
//       console.error('Error sending notification:', error);
//     });
// const addDocumentToFirestore = async () => {
//   try {
//     const docRef = await db.collection('notifications').add({
//       // Document data
//       title: 'noot 3',
//       body: 'not body 3',
//       uid:'QUyTTEeDx8OZRhxz5KC7zLrdo2c2',
//       time:Date.now()
//       // Add more fields as needed
//     });
//     console.log('Document added with ID: ', docRef.id);
//   } catch (error) {
//     console.error('Error adding document: ', error);
//   }
// };
// addDocumentToFirestore();








app.get('/',(req,res)=>{

console.log("hi");
})
const PORT =  process.env.PORT || 3005;
dbConnection().then(()=>{
    app.listen(PORT,()=>{
       
        console.log(`app started on Port ${PORT}`);
    })
})
