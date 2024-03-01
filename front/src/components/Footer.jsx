import { Paper, Grid, Typography, Link } from "@mui/material";
import React from "react";
import FooterCard from "./FooterCard";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Stack } from "@mui/system";

function Footer() {
  return (
    <Paper sx={{ backgroundColor: "common.black", width: "100%", padding: 1 }}>
      <Grid container style={{ minHeight: "18vh" }}>
        <Grid item md={3} xs={10}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={require("../images/LOGO.jpeg")}
                alt="Logo"
                style={{ width: "50%", margin: "auto", display: "block" }}
              />
            </div>
          </Grid>
        </Grid>
        {/* About section */}
        <Grid
          item
          md={3}
          xs={10}
          sx={{ alignItems: "center", textAlign: "center" }}
        >
          <FooterCard
            title="About"
            caption="Empowering students, parents, and educators with a collaborative platform to enhance the learning journey. Connecting communities, fostering communication, and promoting academic success"
          />
        </Grid>
        {/* contact section */}
        <Grid item md={3} xs={10}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ color: "primary.main", textAlign: "center" }}
          >
            Contact
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              color: "common.white",
              fontSize: "16px",
            }}
          >
            Mail:SHS@gmail.com{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              color: "common.white",
              fontSize: "16px",
            }}
          >
            Phone:(000) 000 0000{" "}
          </Typography>
          <Stack
            direction="row"
            gap={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Link href="#">
              <FacebookRoundedIcon
                sx={{ color: "common.white", fontSize: "50px" }}
              />
            </Link>
            <Link href="#">
              <InstagramIcon sx={{ color: "common.white", fontSize: "50px" }} />
            </Link>
            <Link href="#">
              <img
                src={require("../images/x.png")}
                alt="Twitter"
                style={{ height: "40px" }}
              />
            </Link>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            pl="1rem"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <CopyrightIcon sx={{ color: "common.white", fontSize: 10 }} />
            <Typography
              color="common.white"
              variant="subtitle2"
              sx={{ fontSize: 10 }}
            >
              {`${new Date().getFullYear()}  SHS All rights reserved.`}
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={3} xs={10}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ color: "primary.main", textAlign: "center" }}
          >
            Help
          </Typography>
          <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                color: "common.white",
                fontSize: "16px",
              }}
            >
              Give feedback
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                color: "common.white",
                fontSize: "16px",
              }}
            >
              report an issue{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "left",
                color: "common.white",
                fontSize: "16px",
              }}
            >
              Terms of ervice and Privacy Policy{" "}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Footer;
