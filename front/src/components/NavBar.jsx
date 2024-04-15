import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Mail from "./Mail";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";
import { signOut } from "firebase/auth";
import { loggOut } from "../axios/requests";
import { logOut } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
const pages = [
  "Announcements",
  "Exams",
  "Subjects",
  "Results",
  "About",
  "Contact",
  "Help",
];
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      navigate("/");
      await signOut(auth);
      await loggOut();
      dispatch(logOut());
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goProfile = () => {
    navigate("/profile/me");
  };
  const goDashBoard = () => {
    navigate("/admin/dashboard");
  };
  return (
    <AppBar sx={{ backgroundColor: "common.black" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "35%",
              marginTop: 1,
            }}
          >
            <img
              width={"35%"}
              src={require("../images/LOGO.jpeg")}
              alt="..."
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                  flexDirection: "column",
                  justifyContent: "center",
                },
              }}
            >
              {userInfo && userInfo.role === "user"
                ? pages.map((page) => (
                    <MenuItem
                      component={RouterLink}
                      to={`/${page}`}
                      key={page}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))
                : ""}
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <img width={"40%"} src={require("../images/LOGO.jpeg")} alt="..." />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {userInfo && userInfo.role === "user" ? (
              pages.map((page) => (
                <Button
                  key={page}
                  component={RouterLink}
                  to={`/${page}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))
            ) : userInfo && userInfo.role === "admin" ? (
              <Button
                onClick={goDashBoard}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashboard
              </Button>
            ) : (
              ""
            )}
          </Box>
          {userInfo ? (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
             {userInfo.type === 'student'? '':<Mail/>}
              <Notifications />
              
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  {userInfo?.profilePicUrl ? (
                    userInfo.profilePicUrl.startsWith("https://") ? (
                      <Avatar
                        alt=""
                        sx={{ width: 56, height: 56 }}
                        src={userInfo.profilePicUrl}
                      />
                    ) : (
                      <Avatar
                        alt=""
                        sx={{ width: 56, height: 56 }}
                        src={`http://localhost:3002/${userInfo.profilePicUrl}`}
                      />
                    )
                  ) : (
                    <Avatar
                      alt=""
                      sx={{ width: 56, height: 56 }}
                      src={require("../images/profile-user.png")}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>
                    log out
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={goProfile} textAlign="center">
                    profile
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <p></p>
          )}
          {userInfo ? (
            <Typography
              sx={{
                color: "primary.main",
                marginLeft: "5px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {userInfo.name}
            </Typography>
          ) : (
            <p></p>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
