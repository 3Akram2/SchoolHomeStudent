import { Grid, Paper, Typography,TextField,Button } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line
import Divider from '@mui/material/Divider';


import { Box } from '@mui/system'
import React,{ useState } from 'react';
import { Link } from "react-router-dom";


function RegisterForm() {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  const [date, setDate] = useState(dayjs('2000-01-01'));
  const [isValidDate, setIsValidDate] = useState(true);
  const currentYearMinusThree = new Date().getFullYear() - 3;

const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [PassError, setPasswordError] = useState(false);
const [showPassword,setShowPassword] = useState(false);

  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setFname(newFname);
   
  };
  const handleLnameChange = (e) => {
    const newLname = e.target.value;
    setLname(newLname);
   
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    setPhoneError(!phoneRegex.test(newPhone));
  };
  const handleDateChange = (newDate) => {
    const isValid = dayjs(newDate).year() <= currentYearMinusThree;
    setIsValidDate(isValid);
    
    setDate(newDate);
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
  return (
    <Box sx={{marginTop:'20px'}}>
    <Paper sx={{backgroundColor:'common.black',marginTop:'20px', width:'60%',margin:'auto',padding:'10px'}}>
      
         <img
      src={require('../images/LOGO.jpeg')}
      alt='Logo'
      style={{ width: '30%', margin: 'auto', display: 'block', }}
    />
    
    <Grid container>
      <Grid item >
        <Typography className='label'>Name</Typography>
        <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
        <TextField 
        required
        autoFocus
        id='first-name'
        label="First-Name"
        style={{width:'70%',padding:"7px"}}
        type="text"
        sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},label:{color:'primary.main'} }}
        onChange={handleFnameChange}
        value={Fname}
        
         />
        </Grid>
        <Grid item xs={12} md={6} >
        <TextField 
        required
        id='last-name'
        label="Last-Name"
        style={{width:'70%',padding:"7px"}}
        type="text"
        sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'},label:{color:'primary.main'} }}
        onChange={handleLnameChange}
        value={Lname}  
         />
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
        helperText={emailError ? 'Invalid email address' : ''}
        
         />
      </Grid>
      <Grid item xs={12} >
      <Typography className='label'>Phone Number</Typography>
      <TextField 
        required
        id='phone-number'
        style={{width:'80%',padding:"7px"}}
        type="text"
        
        sx={{ input: { color: 'common.black' ,backgroundColor:'white',margin:'5px',height:'2px'} }}
        value={phone}
        onChange={handlePhoneChange}
        error={phoneError}
        helperText={phoneError ? 'Invalid phone Number' : ''}
        
         />
      </Grid>
      <Grid item xs={12} >
      <Typography className='label'>Date of Birth</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{input:{margin:'10px',height:'2px'},svg:{color:'primary.main'},backgroundColor:'white',margin:'10px'}}
          value={date}
          onChange={handleDateChange}
          
          maxDate={dayjs(`${currentYearMinusThree}-12-31`)}
        />
     {!isValidDate && (
        <Typography variant="caption" color="error" sx={{display:'block'}}>
          Choose a valid date (not newer than {currentYearMinusThree})
        </Typography>
      )}
    </LocalizationProvider>
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
            helperText={PassError ? 'Password does not match' : ''}
          />
         {PassError && (
        <Typography variant="caption" color="error" sx={{display:'block'}}>
          Password does not match
        </Typography>
      )}

      </Grid>
      <Grid container justifyContent="center" alignItems="center"  >
      <Grid item xs={8} >
      <Button variant="outlined" sx={{width:'100%',backgroundColor:'white',marginTop:'10px'}}>Login</Button>
      </Grid>
      </Grid>
      <Grid item xs={12}>
     <Divider  sx={{
            margin:'auto',
            width: '100%',
            maxWidth: 360,
            "&.MuiDivider-root": {
              "&::before": {
                border: `0.5px solid #B59351`,
              },
              "&::after": {
                border: `0.5px solid #B59351`,
              },
            },
          }}><Typography variant='subtitle2' sx={{color:'common.white'}}>OR</Typography></Divider>
          </Grid>
          <Grid container justifyContent="center" alignItems="center"  >
            <Grid item xs={8} md={4} >
          <Button sx={{width:'100%'}} variant="filled" style={{backgroundColor:'white',marginTop:'10px'}} startIcon={<img src={require('../images/google.png')} alt='goole logo' style={{width:'24px'}} />}>Sign in with Google</Button>
          </Grid>
          </Grid>

          <Grid container justifyContent="center" alignItems="center"  >
            <Grid item xs={8} md={4} >
          <Button sx={{width:'100%'}} variant="filled" style={{backgroundColor:'#4267B2',color:'white',marginTop:'10px'}} startIcon={<FacebookOutlinedIcon style={{fontSize:'25px'}}/>}>Sign in with Facebook</Button>
          </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{color:'white',textAlign:'center',fontSize:'12px',marginTop:'10px'}} > Already a Member? <Link style={{color:'#B59351'}} to='/login'>Log in</Link></Typography>
          </Grid>
          
     
    </Grid>
    </Paper>
    </Box>
  )
}

export default RegisterForm