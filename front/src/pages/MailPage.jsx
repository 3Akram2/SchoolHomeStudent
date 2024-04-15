import React, { useState,useEffect } from 'react';
import AddMail from '../components/mail/AddMail';
import { findSubjects } from '../axios/requests';
import { Grid, Drawer, List, ListItem, ListItemText, Divider, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import {sendEmail} from '../axios/requests';
import Alert from '@mui/material/Alert';
import SentMail from '../components/mail/SentMail';
import ReceviedMail from '../components/mail/ReceviedMail'
function MailPage() {
  const {userInfo} = useSelector((state)=>state.auth);
  const [selectedFunctionality, setSelectedFunctionality] = useState('received');
  const [receivers,setReceivers] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null); // State for alert message
  const [showAlert, setShowAlert] = useState(false); // State for alert visibility
  const fetchSubjects = async()=> {
    const response = await findSubjects();
    return response.data.subjects;
  }
  const fetchData = async () => {
    try {
      const subjectsData = await fetchSubjects();
      if(userInfo.type === 'parent'){
      const teachersSet = new Set(); // Set to store unique teachers
      const teachersArray = [];
      
      subjectsData.forEach(child => {
        child.subjects.forEach(subject => {
          const { teacher } = subject;
          const { _id, name, email } = teacher;
          const teacherInfo = { _id, name, email };
          const teacherKey = JSON.stringify(teacherInfo);
          
          if (!teachersSet.has(teacherKey)) {
            teachersSet.add(teacherKey);
            teachersArray.push(teacherInfo);
          }
        });
      });
      
      console.log(teachersArray); // Array of unique teachers (no duplicates)
      setReceivers(teachersArray)
    }
    if(userInfo.type==='teacher'){
      console.log(subjectsData,"<---------")
      const parentsSet = new Set(); // Set to store unique parents
      const parentsArray = [];
    
      subjectsData.forEach(subject => {
        subject.students.forEach(student => {
          const parent = student.parent;
          const { _id, name, email } = parent;
          const parentInfo = { _id, name, email };
          const parentKey = JSON.stringify(parentInfo);
    
          if (!parentsSet.has(parentKey)) {
            parentsSet.add(parentKey);
            parentsArray.push(parentInfo);
          }
        });
      });
    
      console.log(parentsArray); // Array of unique parents associated with the subjects taught by the teacher
      setReceivers(parentsArray);
    }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };
  useEffect(() => {
    
  
    fetchData();
  }, []);
  
  
  
  const handleFunctionalitySelect = (functionality) => {
    setSelectedFunctionality(functionality);
  };
  const sendMail = async(recevier,subject,body) => {
    const mail = {
      from:userInfo.email,
      to:recevier.email,
      subject:subject,
      body:body,
    }
    console.log(mail)
    try {
      const response = await sendEmail(mail);
       setAlertMessage(response.data.message);
       setShowAlert(true); // Show the alert
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Hide the alert
  };
  

  const functionalityMap = {
    compose: receivers&&<AddMail send={sendMail} receivers={receivers} />,
    received: <ReceviedMail/>,
    sent: <SentMail/>,
  };

  return (
    <Grid container>
      <Grid container justifyContent={'center'} alignItems={'center'}>
      {showAlert && (
        <Alert severity="success" onClose={handleCloseAlert}>
          {alertMessage}
        </Alert>)}
      </Grid>
      <Grid item md={1}>
        <Drawer
          variant="permanent"
          sx={{
            width: 300,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              backgroundColor: 'black',
              color: 'primary.main',
              width:'10rem',
              height:690,
              marginTop:9,
            },
          }}
        >
          <List>
            {Object.keys(functionalityMap).map((key, index) => (
              <div key={key}>
                <ListItem sx={{cursor:'pointer'}}  onClick={() => handleFunctionalitySelect(key)}>
                  <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
                </ListItem>
                {index < Object.keys(functionalityMap).length - 1 && <Divider sx={{color:'secondary.main'}} />}
              </div>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item xs={11}>
        <Grid container alignItems={'center'} justifyContent={'center'}>
          {selectedFunctionality && functionalityMap[selectedFunctionality]}
          </Grid>
      </Grid>
      
    </Grid>
  );
}

export default MailPage;
