import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  registerUserWithGoogle,
  registerUserWithEmailPass,
} from "../axios/requests";
import { setCredentials } from "../slices/authSlice";
function RegisterForm() {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
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
  const register = async () => {
    // Check if required fields are empty
    if (!Fname || !Lname || !email || !phone || !password || !confirmPassword) {
      // Show an alert for empty required fields
      alert("All required fields must be filled.");
      return;
    }
    // Perform validation checks
    if (emailError || PassError || phoneError) {
      // Show an alert for validation errors
      alert("Validation failed. Please check the form for errors.");
      return;
    }
    try {
      const newUser = {
        fName: Fname.trim().charAt(0).toUpperCase() + Fname.trim().slice(1),
        lName: Lname.trim().charAt(0).toUpperCase() + Lname.trim().slice(1),
        email: email.trim(),
        phoneNumber: phone.trim(),
      };
      // Attempt to create user if validation passes
      const firebaseRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const res = await registerUserWithEmailPass(
        await firebaseRes.user.getIdToken(),
        newUser
      );
      dispatch(setCredentials({ ...res.data.user }));
      clearForm();
      alert("registered successfully!");
    } catch (error) {
      // Handle registration errors
      alert(`Error registering user: ${error.message}`);
      console.error("Error registering user:", error.message);
      // You can display an error message to the user if needed
    }
  };
  const signInWithGoole = async () => {
    try {
      const googleUser = await signInWithPopup(auth, googleProvider);
      console.log(googleUser.user);
      const res = await registerUserWithGoogle(
        await googleUser.user.getIdToken()
      );
      dispatch(setCredentials({ ...res.data.user }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Paper
        sx={{
          backgroundColor: "common.black",
          marginTop: "20px",
          width: "60%",
          margin: "auto",
          padding: "10px",
        }}
      >
        <img
          src={require("../images/LOGO.jpeg")}
          alt="Logo"
          style={{ width: "30%", margin: "auto", display: "block" }}
        />
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
            <Typography className="label">Phone Number</Typography>
            <TextField
              required
              id="phone-number"
              style={{ width: "80%", padding: "7px" }}
              type="text"
              sx={{
                input: {
                  color: "common.black",
                  backgroundColor: "white",
                  margin: "5px",
                  height: "2px",
                },
              }}
              value={phone}
              onChange={handlePhoneChange}
              error={phoneError}
            />
            {phoneError && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block" }}
              >
                enter valid phone number (11 numbers )
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
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={8}>
              <Button
                onClick={register}
                variant="outlined"
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  marginTop: "10px",
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider
              sx={{
                margin: "auto",
                width: "100%",
                maxWidth: 360,
                "&.MuiDivider-root": {
                  "&::before": {
                    border: `0.5px solid #B59351`,
                  },
                  "&::after": {
                    border: `0.5px solid #B59351`,
                  },
                },
              }}
            >
              <Typography variant="subtitle2" sx={{ color: "common.white" }}>
                OR
              </Typography>
            </Divider>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={8} md={4}>
              <Button
                onClick={signInWithGoole}
                sx={{ width: "100%" }}
                variant="filled"
                style={{ backgroundColor: "white", marginTop: "10px" }}
                startIcon={
                  <img
                    src={require("../images/google.png")}
                    alt="goole logo"
                    style={{ width: "24px" }}
                  />
                }
              >
                Sign in with Google
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={8} md={4}>
              <Button
                sx={{ width: "100%" }}
                variant="filled"
                style={{
                  backgroundColor: "#4267B2",
                  color: "white",
                  marginTop: "10px",
                }}
                startIcon={
                  <FacebookOutlinedIcon style={{ fontSize: "25px" }} />
                }
              >
                Sign in with Facebook
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "12px",
                marginTop: "10px",
              }}
            >
              {" "}
              Already a Member?{" "}
              <Link style={{ color: "#B59351" }} to="/login">
                Log in
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
