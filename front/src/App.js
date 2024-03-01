import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { createTheme,ThemeProvider } from '@mui/material';

import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileViewPage from './pages/ProfileViewPage';
import DashboardPage from './pages/DashboardPage';
import AnnouncementPage from './pages/AnnouncementPage';
import ExamsPage from './pages/ExamsPage';
import { generateToken,messaging } from './config/firebase';
import { onMessage } from 'firebase/messaging';
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SubjectPage from './pages/SubjectPage';

const theme = createTheme({
  palette:{
    primary:{
      main: "#B59351",

    },
    secondary:{
      main:"#D9D9D9",
    }
  }
}) 
function App() {
  const {userInfo} = useSelector((state)=> state.auth);
  useEffect(()=>{
   if(userInfo){
    generateToken();
    onMessage(messaging,(payload)=>{
      console.log(payload);
      toast(payload?.notification.title,{
        className: 'golden-progress-bar',
      });
    })
   }
    
   

  },[userInfo])
  return (
    <div >
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      
      
      />
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '70vh',margin:'10px' }}>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile/me" element={<ProfilePage/>} />
        <Route path="/profile/:userId" element={<ProfileViewPage/>} />
        <Route path="/announcements" element={<AnnouncementPage/>} />
        <Route path="/exams" element={<ExamsPage/>} />
        <Route path="/subjects" element={<SubjectPage/>} />
        
        <Route path="/admin/dashboard" element={<DashboardPage/>} />
        </Routes>
        </div>
         <Footer />

         
     </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}


export default App;


