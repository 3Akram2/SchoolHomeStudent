import React from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
function Child({ image, text, _id }) {
  const navigate = useNavigate();
  const openProfile = () => {
    console.log("view prof clicked");
    navigate(`/profile/${_id}`);
  };
  const getImageSource = () => {
    if (image) {
      // If image URL starts with 'https://', use the image directly
      if (image.startsWith("https://")) {
        return image;
      } else {
        // If not, prepend localhost:3002 to the image URL
        return `http://localhost:3002/${image}`;
      }
    } else {
      // If no image provided, use a default image
      return require("../images/blankprof.png");
    }
  };
  return (
    <div>
      <Card sx={{ maxWidth: 250 }} onClick={openProfile}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100%"
            image={getImageSource()}
            alt="green iguana"
          />
          <CardContent sx={{ backgroundColor: "secondary.main" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign={"center"}
              className="profileFields"
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Child;
