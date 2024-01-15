import './App.css';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { createTheme,ThemeProvider } from '@mui/material';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';

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
  return (
    <div >
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        
        <NavBar/>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LoginPage/>} />
        
        </Routes>
        <Footer/>
     </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;


