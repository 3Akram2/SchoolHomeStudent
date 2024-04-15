import Subject from "../models/Subject.js";
import Exam from "../models/Exam.js";
import User from "../models/User.js";
export const create = async (req, res) => {
  const subjectId = req.body.subjectId;
  const { title, date, duration, instructions, maxScore, type } = req.body.exam;
  try {
    const subject = await Subject.findById(subjectId).populate("teacher exams");
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
    // Append the new exam to the subject's exams array
    subject.exams.push(newExam);
    
    // Get existing results
    const existingResults = subject.results || [];
    
    // Create new results for the new exam and append to existing results
    const newResults = subject.students.map(student => ({
      student: student._id,
      exam: newExam._id, // Store only the exam ID
      score: 0,
    }));
    const updatedResults = [...existingResults, ...newResults];
    
    // Update the subject's results array with the combined results
    subject.results = updatedResults;

    // Save the changes to the subject
    await subject.save();
    
    // Respond with the updated subject
    res.status(200).json({ subject });
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    } else {
      return res.status(404).json({ error: "Exam not found in the subject" });
    }
    
    // Find and delete the exam
    await Exam.findByIdAndDelete(examId);
    
    // Remove the results associated with the deleted exam
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { $pull: { results: { exam: examId } } },
      { new: true }
    ).populate({
      path: 'students',
      populate: { path: 'parent', model: 'User' }
    })
    .populate({
      path: 'results',
      populate: [
          { path: 'exam', model: 'Exam' },
          { path: 'student', model: 'User' }
      ]
    })
    .populate('school teacher exams');
    
    res.json({ subject: updatedSubject });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
};
export const update = async (req, res) => {
  const { examId,subjectId } = req.params;
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
    const subject = await Subject.findById(subjectId).populate({
      path: 'students',
      populate: { path: 'parent', model: 'User' }
  })
  .populate({
      path: 'results',
      populate: [
          { path: 'exam', model: 'Exam' },
          { path: 'student', model: 'User' }
      ]
  })
  .populate('school teacher exams')
    res.status(200).json({ subject: subject });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "somthing went wrong!" });
  }
};
