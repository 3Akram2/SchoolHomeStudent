import React from "react";
import { Paper, Typography } from "@mui/material";
function TitleCard({ text }) {
  return (
    <Paper
      elevation={11}
      sx={{
        backgroundColor: "common.black",
        border: "solid",
        borderColor: "primary.main",
        padding: "5px",
        width: "fit-content",
      }}
    >
      <Typography
        variant="h5"
        sx={{ textAlign: "center", fontWeight: "bold", color: "primary.main" }}
      >
        {text}
      </Typography>
    </Paper>
  );
}

export default TitleCard;
