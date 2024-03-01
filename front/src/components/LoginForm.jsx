import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { logIn } from "../axios/requests";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userInfo.role === "user") {
        navigate("/");
      }
    }
  }, [navigate, userInfo]);
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
  const handleBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };
  const handleLogin = async () => {
    try {
      const logUser = await signInWithEmailAndPassword(auth, email, password);
      alert("User has been logged in successfully");
      const token = await logUser.user.getIdToken();
      const res = await logIn(token);
      dispatch(setCredentials({ ...res.data.user }));
      console.log("User role:", res.data.user.role);
      if (res.data.user.role === "admin") {
        await navigate("/admin/dashboard");
        console.log("dashboard navigated");
      } else {
        console.log("else");
        navigate("/");
      }
    } catch (error) {
      alert("Error logging in:", error.message);
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const res = await logIn(token);
      dispatch(setCredentials({ ...res.data.user }));
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };
  return (
    <Box sx={{ marginTop: "20px" }}>
      <Paper
        sx={{
          backgroundColor: "common.black",
          marginTop: "20px",
          width: "80%",
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
              helperText={emailError ? "Invalid email address" : ""}
            />
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
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={8}>
              <Button
                variant="outlined"
                onClick={handleLogin}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  marginTop: "10px",
                }}
              >
                Login
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
                onClick={handleSignInWithGoogle}
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
                Log in with Google
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
                Log in with Facebook
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
              Not a Member Yet?{" "}
              <Link style={{ color: "#B59351" }} to="/signup">
                Sign UP
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default LoginForm;
