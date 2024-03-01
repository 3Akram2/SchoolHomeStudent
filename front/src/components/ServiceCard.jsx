import { Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function ServiceCard({ image, desc, title, paragraph }) {
  return (
    <Container>
      <Paper
        sx={{
          backgroundColor: "secondary.main",
          borderRadius: "10px",
          padding: 2,
          height: "14rem",
          width: "90%",
          margin: 1,
        }}
      >
        <img
          style={{ display: "block", margin: "auto", height: "5rem" }}
          src={image}
          alt={desc}
        />
        <Typography variant="h6" fontWeight={"bold"} marginTop={"5px"}>
          {" "}
          {title}
        </Typography>
        <Typography variant="caption" sx={{ marginTop: 1 }}>
          {" "}
          {paragraph}
        </Typography>
      </Paper>
    </Container>
  );
}

export default ServiceCard;
