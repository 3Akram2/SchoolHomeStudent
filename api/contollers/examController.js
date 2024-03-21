import Subject from "../models/Subject.js";
import Exam from "../models/Exam.js";
import User from "../models/User.js";
export const create = async (req, res) => {
  const subjectId = req.body.subjectId;
  const { title, date, duration, instructions, maxScore, type } = req.body.exam;
  try {
    const subject = await Subject.findById(subjectId).populate("teacher");
    const newExam = new Exam({
      title,
      date,
      duration,
      instructions,
      maxScore,
      type,
      subject: subjectId,
    });
    await newExam.save();
    subject.exams.push(newExam);
    await subject.save();
    await subject.populate("exams");
    console.log(subject);
    await subject.save();
    res.status(200).json({ subject: subject });
  } catch (error) {}
};
export const deleteExam = async (req, res) => {
  const { subjectId, examId } = req.params;
  try {
    // Find the subject by ID
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    // Remove the reference to the exam from the subject's exams array
    const index = subject.exams.indexOf(examId);
    if (index !== -1) {
      subject.exams.splice(index, 1);
      await subject.save();
      await subject.populate("exams");
    } else {
      return res.status(404).json({ error: "Exam not found in the subject" });
    }
    await Exam.findByIdAndDelete(examId);
    res.json({ subject: subject });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "somthing went wrong!" });
  }
};
export const update = async (req, res) => {
  const { examId,subjectId } = req.params;
  console.log(req.body)
  const { title, date, duration, instructions, maxScore } = req.body.exam;
  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ msg: "Exam not found" });
    }
    if (title) {
      exam.title = title;
    }
    if (date) {
      exam.date = date;
    }
    if (duration) {
      exam.duration = duration;
    }
    if (instructions) {
      exam.instructions = instructions;
    }
    if (maxScore) {
      exam.maxScore = maxScore;
    }
    await exam.save();
    const subject = await Subject.findById(subjectId).populate('exams');
    res.status(200).json({ subject: subject });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "somthing went wrong!" });
  }
};
