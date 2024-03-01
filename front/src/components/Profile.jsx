import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Paper } from "@mui/material";
import EditProfile from "./EditProfile";
import Childeren from "./Childeren";
import Child from "./Child";
import TitleCard from "./TitleCard";
import Teachers from "./Teachers";
function Profile({ user }) {
  const { userInfo } = useSelector((state) => state.auth);
  const renderProfilePic = () => {
    let src = require("../images/blankprof.png"); // Default blank profile pic
    if (user.profilePicUrl) {
      if (user.profilePicUrl.startsWith("https://")) {
        src = user.profilePicUrl; // Use user.profilePicUrl directly
      } else {
        src = `http://localhost:3002/${user.profilePicUrl}`; // Prepend localhost part
      }
    }
    return <img src={src} alt="profile pic" style={{ width: "30%" }} />;
  };
  return (
    <div>
      <Grid container alignItems="center" justifyContent="center">
        {/* Image and DialogForm */}
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            width: "90%",
            marginTop: "5px",
            backgroundColor: "black",
          }}
        >
          <Grid container alignItems="center">
            {/* Image, Name, and Type */}
            <Grid
              item
              xs={10}
              md={11}
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              {renderProfilePic()}
              <Typography
                variant="title"
                className="profileFields"
                sx={{ fontSize: "24px", textAlign: "center" }}
              >
                {user.name}
              </Typography>
              <Typography
                variant="subtitle"
                className="profileFields"
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                  fontWeight: "light",
                }}
              >
                {user.type}
              </Typography>
            </Grid>
            {/* Edit Profile */}
            <Grid item xs={2} md={1}>
              {userInfo && userInfo._id === user._id && <EditProfile />}
            </Grid>
          </Grid>
        </Paper>
        {/* second section */}
        <Paper
          sx={{ backgroundColor: "secondary.main", width: "80%", mt: 2, mb: 2 }}
        >
          <Grid
            container
            sx={{ m: 5 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={4}>
              <Typography
                variant="subtitle"
                className="profileFields"
                sx={{ fontSize: "22px" }}
              >
                E-mail: {user.email}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              {user.phoneNumber ? (
                <Typography
                  variant="subtitle"
                  className="profileFields"
                  sx={{ fontSize: "22px" }}
                >
                  Phone: {user.phoneNumber}
                </Typography>
              ) : (
                <Typography
                  variant="subtitle"
                  className="profileFields"
                  sx={{ fontSize: "22px" }}
                >
                  Phone: no phone number provided{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={1} mt={1} mb={1}>
            {user.type === "student" ? <TitleCard text="Parent" /> : ""}
            {user.type === "parent" ? <TitleCard text="Childeren" /> : ""}
            {user.type === "school" ? <TitleCard text="Teachers" /> : ""}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" mb={1}>
          <Grid item md={12}>
            {user.type === "parent" ? (
              <Childeren childeren={user.children} userId={user._id} />
            ) : (
              ""
            )}
            {user.type === "student" ? (
              <Paper
                sx={{
                  backgroundColor: "black",
                  padding: "20px",
                  marginLeft: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Child
                  image={user.parent.profilePicUrl}
                  text={user.parent.name}
                  _id={user.parent._id}
                />{" "}
              </Paper>
            ) : (
              <></>
            )}
            {user.type === "school" ? (
              <Teachers teachers={user.teachers} userId={user._id} />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
