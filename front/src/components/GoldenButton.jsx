import React from "react";
import { Button } from "@mui/material";
function GoldenButton({ text, size, func }) {
  const handleClick = () => {
    func(); // Call the provided function
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      sx={{
        color: "common.white",
        borderRadius: 8,
        backgroundColor: "primary.main",
        width: "60%",
        fontSize: `${size}`,
        margin: "0 auto",
        display: "flex",
      }}
    >
      {" "}
      {text}
    </Button>
  );
}

export default GoldenButton;
