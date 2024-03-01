import { Typography } from "@mui/material";
import React from "react";
function FooterCard({ title, caption }) {
  return (
    <div>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{ color: "primary.main", textAlign: "center" }}
      >
        {title}
      </Typography>
      <div style={{ textAlign: "center", width: "80%", margin: "auto" }}>
        <Typography
          variant="subtitle2"
          sx={{ textAlign: "left", color: "common.white", fontSize: "15px" }}
        >
          {caption}
        </Typography>
      </div>
    </div>
  );
}

export default FooterCard;
