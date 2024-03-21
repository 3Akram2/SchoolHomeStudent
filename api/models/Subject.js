import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    students:[{
       type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    code:{
        type:String,
        unique:true
    },
    exams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    }]
    })
    const Subject = mongoose.model("Subject",subjectSchema);
    export default Subject;


    