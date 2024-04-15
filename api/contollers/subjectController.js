import Subject from "../models/Subject.js";
import User from '../models/User.js';

export const find = async (req,res) => {
    const userId = req.user.userID;

    try {
     const user = await User.findById(userId)
     if (user.type === 'school'){
        const subjects = await Subject.find({
            school:userId,
         }).populate('school teacher students exams')
         if(!subjects){
          return res.status('404').json({msg:'no subjects found! '})
         }
         res.status(200).json({subjects:subjects})
     }
     else if( user.type === 'teacher'){
        const subjects = await Subject.find({
            teacher: userId,
          }).populate({
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
      
          if (!subjects || subjects.length === 0) {
            return res.status(404).json({ msg: 'No subjects found!' });
          }
          // Sending the populated subjects to the client

          res.status(200).json({ subjects });

        
     }
     else if( user.type === 'student'){

        const subjects = await Subject.find({
            students: { $in: [userId] }
        }).populate({
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
        
        if (!subjects) {
            return res.status(404).json({ msg: 'No subjects found!' });
        }
        res.status(200).json({subjects:subjects})
     }
     else if( user.type === 'parent'){
        const children = user.children; // Assuming user.children is an array of child IDs
        const subjectsByChild = [];

        for (const childId of children) {
            const childSubjects = await Subject.find({
                students: { $in: [childId] }
            }).populate({
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

            subjectsByChild.push({ childId: childId, subjects: childSubjects });
        }
        res.status(200).json({ subjects: subjectsByChild });
     }
    } catch (error) {
        console.error(error)
        res.status(400).json({msg:'somthing went wrong!'})
    }
}
export const create = async (req,res) => {
 const schoolId = req.user.userID;
 const {name , teacherId} = req.body;
 const code = await generateSubjectCode();
 try {
    const alreadyExists = await Subject.findOne({name:name});
    if(alreadyExists){
       return res.status(401).json({msg:'Subject already exists!'});
    }
    const newSubject = new Subject({
     name,
     code,
     teacher:teacherId,
     school:schoolId,
    })
    await newSubject.save();
    await newSubject.populate('school teacher students');
    await User.findOneAndUpdate(
        { _id: teacherId },
        { $push: { subjects: newSubject._id } },
        { new: true }
    );
    const school = await User.findById(schoolId);
    school.subjects.push(newSubject._id);
    await school.save()
    res.status(200).json({subject:newSubject})
  } catch (error) {
    res.status(400).send("somthing went wrong!");
    console.error(error);
 }
}
export const deleteSubject = async (req, res) => {
    const { id } = req.params;
    const schoolId = req.user.userID;
    try {
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found!' });
        }
          // Verify that the school making the request is the one associated with the subject
        if (subject.school.toString() !== schoolId) {
            return res.status(403).json({ msg: 'You are not authorized to delete this subject.' });
        }
        // Remove the subject from the school's subjects array
        const school = await User.findOneAndUpdate(
            { _id: subject.school },
            { $pull: { subjects: id } },
            { new: true }
        );
        if (!school) {
            return res.status(404).json({ msg: 'School not found!' });
        }
        // Delete the subject document
        const deletedSubject = await Subject.findByIdAndDelete( id );
        await school.populate('teachers subjects children')
        return res.status(200).json({ subject: deletedSubject});
    } catch (error) {
        console.error(error);
        return res.status(400).json({msg:'Somthing went wrong!'});
    }
};
export const update = async (req,res) => {
const { id } = req.params;
const {  name } = req.body; 
const schoolId = req.user.userID;
try {
    const subject = await Subject.findById(id);
    if (!subject) {
        return res.status(404).json({ msg: 'Subject not found!' });
    }
      // Verify that the school making the request is the one associated with the subject
    if (subject.school.toString() !== schoolId) {
        return res.status(403).json({ msg: 'You are not authorized to delete this subject.' });
    }
    subject.name = name || subject.name;
    await subject.save();
    await subject.populate('school teacher students');
    res.status(200).json({subject:subject,})
} catch (error) {
    console.error(error);
        return res.status(400).json({msg:'Somthing went wrong!'});
    }
}
export const findOne = async(req,res) =>{
    const { id } = req.params;
    try {
        const subject = await Subject.findById(id).populate('teacher students school')
        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found!' });
        }
        res.status(200).json({subject:subject,})
    }catch(error){
        console.error(error);
        return res.status(400).json({msg:'Somthing went wrong!'});   
    }
}
export const joinSubject = async (req,res) => {
    const  studentId  = req.user.userID;
    const { subjectCode, subjectName } = req.body;
    console.log(subjectCode,subjectName,studentId);
    try {
        const student = await User.findById(studentId);
        if(!student){
           return res.status(404).json({msg:' User not found! '});
        }    
        const subject = await Subject.findOne({code:subjectCode});
        if(!subject){
            return  res.status(404).json({msg:' Subject not found! '});
        }
        if(subject.name !== subjectName){
            return  res.status(404).json({msg:'the name entered does not match the course code'});
        }
        if (subject.students.includes(studentId)) {
            return res.status(400).json({ msg: 'You have already joined this subject!' });
        }
        subject.students.push(student._id);
        await subject.save();
        student.subjects.push(subject._id);
        await student.save();
        await subject.populate('school teacher students')
        res.status(200).json({subject:subject})
    } catch (error) {
        res.status(400).json({msg:'Somthing went wrong!'})
    }
}
export const editResults = async (req, res) => {
    const { subjectId, resultId, score } = req.body;
    try {
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
        .populate('school teacher exams');
        if (!subject) {
            return res.status(404).json({ msg: 'Subject not found!' });
        }
        
        // Find the index of the result in the array
        const resultIndex = subject.results.findIndex(result => result._id.toString() === resultId);
        
        if (resultIndex === -1) {
            return res.status(404).json({ msg: 'Result not found!' });
        }

        // Update the score of the result
        subject.results[resultIndex].score = score;

        // Save the changes to the subject
        await subject.save();
        
        res.status(200).json({ subject: subject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


const generateSubjectCode = async () => {
    let alreadyInUseCode;
    let code = '';
    do {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // Generate three random capital letters
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            code += letters.charAt(randomIndex);
        }
        // Generate three random digits
        for (let i = 0; i < 3; i++) {
            code += Math.floor(Math.random() * 10);
        }
        // Check if the generated code already exists in the database
        alreadyInUseCode = await Subject.findOne({ code: code });
    } while (alreadyInUseCode);
    return code;
};
