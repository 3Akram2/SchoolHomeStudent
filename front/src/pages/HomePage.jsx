import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

import ImageHolder from "../components/ImageHolder";
import ServiceCard from "../components/ServiceCard";
import GoldenButton from "../components/GoldenButton";
import commImage from "../images/communication.png";
import trackProgressImage from "../images/service2.png";
import feedBackImage from "../images/HaveYourSay.png";
import first from "../images/first.gif";
import sec from "../images/sec.gif";
import third from "../images/third.gif";

const useStyles = makeStyles((theme) => ({
  imgMargin: {
    // Margin for the second column on medium screens and larger
    [theme.breakpoints.up("md")]: {
      marginTop: "250px",
    },

    // Media query to remove margin on small screens
    [theme.breakpoints.down("sm")]: {
      margin: "0",
    },
  },
}));

function HomePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const classes = useStyles();
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  const goSignup = () => {
    navigate("/signup");
  };

  return (
    <div style={{ padding: "5px" }}>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item md={3} xs={12}>
          <img
            src={require("../images/image1.png")}
            alt={"school session"}
            style={{ marginTop: "1rem", width: "100%" }}
          />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <p style={{ fontSize: 26, textAlign: "center" }}>
            Welcome to{" "}
            <span style={{ color: "#B59351" }}>
              School Home Students Collaborate
            </span>
            , Empowering Your School Community Through Seamless Collaboration
          </p>
          {userInfo ? (
            <p></p>
          ) : (
            <Paper
              sx={{
                backgroundColor: "secondary.main",
                width: "90%",
                padding: 1,
                marginTop: 1,
              }}
              elevation={7}
            >
              <p style={{ fontSize: 24, textAlign: "center" }}> Join Us!</p>
              <Grid container>
                <Grid item xs={6}>
                  <GoldenButton func={goLogin} text="Login" size="16px" />
                </Grid>
                <Grid item xs={6}>
                  <GoldenButton func={goSignup} text="Sign UP" size="16px" />
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
        <Grid item md={3} xs={12}>
          <img
            src={require("../images/image2.png")}
            alt={"school session"}
            className={classes.imgMargin}
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid container spacing={1} sx={{ padding: 2 }}>
          {/* Main container for the row */}
          <Grid item xs={12} md={12}>
            <Paper
              sx={{
                backgroundColor: "common.black",
                width: "100%",
                padding: 1,
                marginTop: 1,
              }}
            >
              {/* Container for the row */}
              <Grid container spacing={1} justifyContent="flex-start">
                {/* Each item in the row */}
                <Grid item md={3} xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "primary.main", fontWeight: "bold" }}
                  >
                    {" "}
                    Services{" "}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "common.white", fontWeight: "bolder" }}
                  >
                    {" "}
                    What We Provide To You ?{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "common.white",
                      maxWidth: "75%",
                      marginBottom: 1,
                    }}
                  >
                    {" "}
                    SHS Collaborate, we are committed to creating an environment
                    where parents, teachers, and students come together to
                    ensure a thriving educational journey.{" "}
                  </Typography>
                  <GoldenButton
                    func={null}
                    text="View all services"
                    size="12px"
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <ServiceCard
                    image={commImage}
                    desc={"communication"}
                    title="Unified Communication:"
                    paragraph="Stay connected with real-time updates on school announcements, class happenings, and important news, all in one place."
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <ServiceCard
                    image={trackProgressImage}
                    desc={"Progress Tracking"}
                    title="Track Academic Progress:"
                    paragraph="Effortlessly monitor your student's or your child academic journey, from assignments and exams to overall progress."
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <ServiceCard
                    image={feedBackImage}
                    desc={"Feedback"}
                    title="Have Your Say:"
                    paragraph=" Contribute to the improvement of our school community by sharing your thoughts and suggestions through the SHS Collaborate Suggestion Box."
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            {" "}
            <ImageHolder image={first} alt="kk" />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <ImageHolder image={sec} alt="kk" />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <ImageHolder image={third} alt="kk" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
