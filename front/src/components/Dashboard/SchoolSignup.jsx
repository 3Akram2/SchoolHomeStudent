import React,{useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

import { Grid, Typography,TextField,Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';





import {auth} from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addSchool } from '../../axios/requests';


function SchoolSignup() {
   
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [PassError, setPasswordError] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearForm();
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  const handleConfirmPassChange = (e) => {
    const newConfPass = e.target.value;
    setConfirmPassword(newConfPass);
   
  };
  const handleConfPassBlur = () => {
    
   password===confirmPassword?setPasswordError(false):setPasswordError(true);
  
  };
  const handleBlur = () => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError(false);
    setPasswordError(false);
    

    }
    const handleChange = async()=>{
        if (!name  || !email  ||  !password || !confirmPassword ) {
            // Show an alert for empty required fields
            alert('All required fields must be filled.');
            return;
          }
        
          // Perform validation checks
          if (emailError || PassError ) {
            // Show an alert for validation errors
            alert('Validation failed. Please check the form for errors.');
            return;
          }
          try {
            const firebaseRes = await createUserWithEmailAndPassword(auth, email, password);
            const uid = firebaseRes.user.uid;

            const scoolAccount = {
                name,
                email,
                uid,
                
            }
            
          

            const res = await addSchool(scoolAccount);
            console.log(res.data.user);
            handleClose();
            clearForm();
          } catch (error) {
            console.error(error)
          }
        }
  return (
    <React.Fragment>
    <Button startIcon={<AddIcon/>} variant="outlined" onClick={handleClickOpen}>
    ADD SCHOOL
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
      }}
      fullWidth
    >
      <DialogTitle>ADD SCHOOL</DialogTitle>
      <DialogContent>
        
        <Grid container>
    <Grid item xs={12}>
      <Typography className='label'>Name</Typography>
      <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
      <TextField 
      required
      autoFocus
      id='first-name'
      label="Full Name"
      style={{width:'70%',padding:"7px"}}
      type="text"
      sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},label:{color:'primary.main'} }}
      onChange={handleNameChange}
      value={name}
      
       />
      </Grid>
      
      </Grid>
       
    </Grid>
    </Grid>
    <Grid item xs={12} >
      <Typography className='label'>E-mail</Typography>
      <TextField 
        required
        id='e-mail'
        style={{width:'80%',padding:"7px"}}
        type="email"
        placeholder='myname@example.com'
        sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},placeholder:{color:'primary.main'} }}
        value={email}
        onChange={handleEmailChange}
        onBlur={handleBlur}
        error={emailError}
        
        
         />
         { emailError && (
        <Typography variant="caption" color="error" sx={{display:'block'}}>
         Invalid email address
        </Typography>
      )}
      </Grid>
    <Grid item xs={12}>
      <Typography className='label'>Password</Typography>
      
      <OutlinedInput
      
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                
                >
                  {showPassword ? <VisibilityOff sx={{color:'primary.main',mr:1}} /> : <Visibility sx={{color:'primary.main',mr:1}} />}
                </IconButton>
              </InputAdornment>
            }
            style={{width:'80%',padding:"7px"}}
            sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},placeholder:{color:'primary.main'} }}
            value={password}
            onChange={handlePasswordChange}
          />
         

      </Grid>

      <Grid item xs={12}>
      <Typography className='label'>Confirm Password</Typography>
      
      <OutlinedInput
      
            id="confirm-password"
            type='password'
            style={{width:'80%',padding:"7px"}}
            sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},placeholder:{color:'primary.main'} }}
            value={confirmPassword}
            onChange={handleConfirmPassChange}
            error={PassError}
            onBlur={handleConfPassBlur}
            
          />
         {PassError && (
        <Typography variant="caption" color="error" sx={{display:'block'}}>
          Password miss match!
        </Typography>
      )}

      </Grid>
      
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleChange}>Save</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
  )
}

export default SchoolSignup