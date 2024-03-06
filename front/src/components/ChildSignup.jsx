import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import plus from "../images/goldenPlus.jpg";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addChild } from "../axios/requests";
function ChildSignup() {
  const dispatch = useDispatch();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [PassError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
    const phoneRegex = /^\d{11}$/; // Assuming a 10-digit phone number
    setPhoneError(!phoneRegex.test(newPhone));
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
    password === confirmPassword
      ? setPasswordError(false)
      : setPasswordError(true);
  };
  const handleBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };
  const clearForm = () => {
    setFname("");
    setLname("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleChange = async ({text}) => {
    if (!Fname || !Lname || !email  || !password || !confirmPassword) {
      // Show an alert for empty required fields
      alert("All required fields must be filled.");
      return;
    }
    // Perform validation checks
    if (emailError || PassError ) {
      // Show an alert for validation errors
      alert("Validation failed. Please check the form for errors.");
      return;
    }
    try {
      // Attempt to create user if validation passes
      const firebaseRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = {
        fName: Fname.trim().charAt(0).toUpperCase() + Fname.trim().slice(1),
        lName: Lname.trim().charAt(0).toUpperCase() + Lname.trim().slice(1),
        email: email.trim(),
        uid: firebaseRes.user.uid,
      };
      // Additional logic or actions after successful registration
      const res = await addChild(newUser);
      dispatch(setCredentials({ ...res.data.user }));
      clearForm();
      handleClose();
      alert("registered successfully!");
    } catch (error) {
      // Handle registration errors
      alert(`Error registering user: ${error.message}`);
      console.error("Error registering user:", error.message);
      // You can display an error message to the user if needed
    }
    clearForm();
    handleClose();
  };
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 250 }} onClick={handleClickOpen}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={plus}
            alt="green iguana"
          />
          <CardContent sx={{ backgroundColor: "secondary.main" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign={"center"}
              className="profileFields"
              style={{ fontWeight: "bolder" }}
            >
              ADD Child
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle sx={{ color: "primary.main", fontWeight: "bolder" }}>
          ADD Child
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item>
              <Typography className="label">Name</Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    autoFocus
                    id="first-name"
                    label="First-Name"
                    style={{ width: "70%", padding: "7px" }}
                    type="text"
                    sx={{
                      input: {
                        color: "common.black",
                        backgroundColor: "white",
                        margin: "5px",
                        height: "2px",
                      },
                      label: { color: "primary.main" },
                    }}
                    onChange={handleFnameChange}
                    value={Fname}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="last-name"
                    label="Last-Name"
                    style={{ width: "70%", padding: "7px" }}
                    type="text"
                    sx={{
                      input: {
                        color: "common.black",
                        backgroundColor: "white",
                        margin: "5px",
                        height: "2px",
                      },
                      label: { color: "primary.main" },
                    }}
                    onChange={handleLnameChange}
                    value={Lname}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">E-mail</Typography>
              <TextField
                required
                id="e-mail"
                style={{ width: "80%", padding: "7px" }}
                type="email"
                placeholder="myname@example.com"
                sx={{
                  input: {
                    color: "common.black",
                    backgroundColor: "white",
                    margin: "5px",
                    height: "2px",
                  },
                  placeholder: { color: "primary.main" },
                }}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                error={emailError}
              />
              {emailError && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block" }}
                >
                  Invalid email address
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">Password</Typography>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "primary.main", mr: 1 }} />
                      ) : (
                        <Visibility sx={{ color: "primary.main", mr: 1 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                style={{ width: "80%", padding: "7px" }}
                sx={{
                  input: {
                    color: "common.black",
                    backgroundColor: "white",
                    margin: "5px",
                    height: "2px",
                  },
                  placeholder: { color: "primary.main" },
                }}
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">Confirm Password</Typography>
              <OutlinedInput
                id="confirm-password"
                type="password"
                style={{ width: "80%", padding: "7px" }}
                sx={{
                  input: {
                    color: "common.black",
                    backgroundColor: "white",
                    margin: "5px",
                    height: "2px",
                  },
                  placeholder: { color: "primary.main" },
                }}
                value={confirmPassword}
                onChange={handleConfirmPassChange}
                error={PassError}
                onBlur={handleConfPassBlur}
              />
              {PassError && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block" }}
                >
                  Password miss match!
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ChildSignup;
