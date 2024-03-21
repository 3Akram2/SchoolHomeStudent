import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    instructions: {
        type: String,
        default: ''
    },
    maxScore: {
        type: Number
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'upcoming'],
        default: 'upcoming'
    },
    type: {
        type: String,
        enum: ['midterm', 'final', 'quiz', 'custom'],
        default: 'custom'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
