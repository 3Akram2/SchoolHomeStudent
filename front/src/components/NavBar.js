import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import {  signOut } from "firebase/auth";
import { loggOut } from '../axios/requests';
import { logOut } from '../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';


import { auth } from '../config/firebase';
const pages = ['Announcements', 'Exams', 'Subjects','Results', 'About','Contact', 'Help'];
// const settings = [{title:'Profile',action: NavToProgile,},  {title:'Logout',action:handleLogout}];

function ResponsiveAppBar() {



  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

 const dispatch = useDispatch();
 const {userInfo} = useSelector((state)=> state.auth);
 const [logged,setlogged] = useState(false);
//  useEffect(()=>{
//    if(userInfo)
//    setlogged(true)
//  },[userInfo,setlogged])

  const handleLogout = async () => {
    console.log('befoooore',auth.currentUser)
    try {
      await signOut(auth);
      await loggOut();
      dispatch(logOut());
      navigate('/')
      
      console.log('User has been logged out');
      console.log('after',auth.currentUser)
      // Redirect to the home page
      // history.push('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
const navigate = useNavigate();
const goHome =() =>{
  navigate('/')
} 
  return (
    <AppBar sx={{backgroundColor:'common.black'}} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, width:'35%' , marginTop:1,}} >
          <img width={"35%"} src={require('../images/LOGO.jpeg')} alt='...'  style={{cursor:'pointer'}} onClick={goHome} />
          </Box>
          
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
          onClick={handleOpenNavMenu}
            size="large"
            edge="start"
            color="error"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
            <Menu
              
              id="menu-appbar"
              
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' , flexDirection: "column", justifyContent: "center"},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } ,justifyContent:"center"}}>
          <img width={"40%"} src={require('../images/LOGO.jpeg')} alt='...'  />
          </Box >
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {userInfo?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
               <Avatar alt="" src={require("../images/profile-user.png")}  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>log out</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >profile</Typography>
                </MenuItem>
            </Menu>
          </Box>
         :<p></p>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

