import { CronJob } from 'cron';
import admin from './config/firebase-config.js';
import Exam from './models/Exam.js';
import Subject from './models/Subject.js';
import User from './models/User.js';

const db = admin.firestore();

const job = new CronJob(
  '0 0 0 * * *', // cronTime: run every day at midnight
  async function () {
    try {
      // Get the current date
      const currentDate = new Date();

      // Calculate the date two days from now
      const twoDaysFromNow = new Date(currentDate);
      twoDaysFromNow.setDate(currentDate.getDate() + 2);

      // Convert both dates to string representation without the time component
      const currentDateWithoutTime = currentDate.toISOString().slice(0, 10);
      const twoDaysFromNowWithoutTime = twoDaysFromNow.toISOString().slice(0, 10);

      // Query exams in MongoDB where the date is two days from now
      const exams = await Exam.find();

      // Iterate through the exams
      exams.forEach(async (exam) => {
        // Convert exam date to string representation without the time component
        const examDateWithoutTime = exam.date.toISOString().slice(0, 10);

        // Check if the current date is before the exam date by two days
        if (twoDaysFromNowWithoutTime === examDateWithoutTime) {
          // Log the exam name
          console.log('Exam Name:', exam.title);
          const subject = await Subject.findById(exam.subject).populate('students');
          subject.students.forEach(async (student) => {
            const parent = await User.findById(student.parent);

            // Add notification to Firestore
            const notificationId = await addDocumentToFirestore(exam.type, subject.name, student.uid, false, student.name);
           const notificationIdParent =  await addDocumentToFirestore(exam.type, subject.name, parent.uid, true, student.name);
         
         
           await sendPushNotification(student.fcmToken,exam.type, subject.name, false, student.name,notificationId)
           await sendPushNotification(parent.fcmToken,exam.type, subject.name, false, student.name,notificationIdParent)
            // Send push notification
            
          });
        }
        if (currentDateWithoutTime > examDateWithoutTime && exam.status !== 'ended'){
          await Exam.findByIdAndUpdate(exam._id, { status: 'ended' });
          console.log('Exam Status Updated to "ended"');
        }

      });
    } catch (error) {
      console.error('Error querying exams:', error);
    }

  },
  null,
  'Europe/London' // Set time zone to London, UK
);

const addDocumentToFirestore = async (examType, subjectName, firebaseUid, isParent, childName) => {
  try {
    const docRef = await db.collection('notifications').add({
      title: isParent ? `${childName} has an Exam!` : `${childName} you will have an exam!`,
      body: isParent ? `${childName} will have ${examType} in ${subjectName} after two days. Please ensure they are prepared.` : `${childName} you will have a ${examType} in ${subjectName} coming up in the next two days. Best of luck`,
      uid: firebaseUid,
      time: Date.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
const sendPushNotification =async (fcmToken,examType, subjectName, isParent, childName,notificationId)=>{
  
  if (fcmToken) {
   
    const message = {
      token: fcmToken,
      notification: {
        title: isParent ? `${childName} has an Exam!` : `${childName} you will have an exam!`,
        body: isParent ? `${childName} will have ${examType} in ${subjectName} after two days. Please ensure they are prepared.` : `${childName} you will have a ${examType} in ${subjectName} coming up in the next two days. Best of luck`,
      },
      data: {
        notificationId: notificationId,
      },
    };

    await admin.messaging().send(message);
    console.log('Push notification sent successfully');
  }
}          
export default job;
