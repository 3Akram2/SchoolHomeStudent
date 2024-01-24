import express from 'express';
import cors from "cors";
import dbConnection from './db/index.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js'
const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',  // Update with your client's origin
}))

app.use(cookieParser())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
dotenv.config();
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.get('/',(req,res)=>{

console.log("hi");
})
const PORT =  process.env.PORT || 3005;
dbConnection().then(()=>{
    app.listen(PORT,()=>{
        console.log(`app started on Port ${PORT}`);
    })
})
