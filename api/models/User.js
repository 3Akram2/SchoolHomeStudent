import mongoose from "mongoose";
import  Email  from "./Mail.js";

const userSchema = new mongoose.Schema({
    uid:{
        type:String,
        unique: true,
        required:true,
    },
    name:String,
    email:{
        type:String,
        unique: true,
        required:true,
    },
    profilePicUrl:String,
    phoneNumber:{
        type: String,
        default:'',
    },
    type:{
        type:String,
        required:true,
        enum: ['student', 'parent', 'teacher','school'],
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    parent:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
    },
    role:{
        type:String,
        required:true,
        enum: ['user', 'admin'],
    },
    teachers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
    }],   
    fcmToken:{
        type:String,
        default:''
    }, 
    sentEmails: [Email], // Array of sent emails
    receivedEmails: [Email] // Array of received emails
    })
    const User = mongoose.model("User",userSchema);
    export default User;