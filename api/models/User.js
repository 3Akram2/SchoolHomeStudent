import mongoose from "mongoose";
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
    birthDate:Date,
    profilePicUrl:String,
    phoneNumber:{
        type: String,
        default:'',
        
    }
    })
    const User = mongoose.model("User",userSchema);
    export default User;