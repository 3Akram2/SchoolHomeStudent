import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../axios/requests";
import { setCredentials } from "../slices/authSlice";
function DialogForm() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(() => {
    if (userInfo.profilePicUrl) {
      if (userInfo.profilePicUrl.startsWith("https://")) {
        return userInfo.profilePicUrl; // Use user.profilePicUrl directly
      } else {
        return `http://localhost:3002/${userInfo.profilePicUrl}`; // Prepend localhost part
      }
    } else {
      return require("../images/blankprof.png"); // Default to empty string if no profile pic
    }
  });
  const [phone, setPhone] = useState(userInfo.phoneNumber || "");
  const [phoneError, setPhoneError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImage(() => {
      if (userInfo.profilePicUrl) {
        if (userInfo.profilePicUrl.startsWith("https://")) {
          return userInfo.profilePicUrl; // Use user.profilePicUrl directly
        } else {
          return `http://localhost:3002/${userInfo.profilePicUrl}`; // Prepend localhost part
        }
      } else {
        return require("../images/blankprof.png"); // Default to empty string if no profile pic
      }
    });
  };
  const handleFnameChange = (e) => {
    const newFname = e.target.value;
    setName(newFname);
  };
  const handleImageChange = (e) => {
    const newImage = e.target.files[0];
    setImageFile(newImage);
    console.log(newImage);
    setImage(URL.createObjectURL(newImage));
  };
  const handleImageClick = () => {
    // Trigger file input click
    document.getElementById("fileInput").click();
  };
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    const phoneRegex = /^\d{11}$/; // Assuming a 10-digit phone number
    setPhoneError(!phoneRegex.test(newPhone));
  };
  const handleChange = async () => {
    if (!name) {
      // Show an alert for empty required fields
      alert("All required fields must be filled.");
      return;
    }
    // Perform validation checks
    if (phoneError) {
      // Show an alert for validation errors
      alert("Validation failed. Please check the form for errors.");
      return;
    }
    try {
      const updateUser = {
        _id: userInfo._id,
        name: name,
        phoneNumber: phone || '' ,
      };
      console.log(updateUser, "<=====");
      const res = await updateProfile(updateUser, imageFile);
      console.log(res);
      dispatch(setCredentials({ ...res.data.user }));
      handleClose();
    } catch (error) {
      alert(`Error updating user: ${error.message}`);
      console.error("Error registering user:", error.message);
    }
  };
  return (
    <React.Fragment>
      <Button
        startIcon={<EditIcon />}
        variant="outlined"
        onClick={handleClickOpen}
      ></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
      >
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <div>
                {/* Display profile picture */}
                <img
                  src={image}
                  alt="profile pic"
                  style={{ width: "50%", cursor: "pointer" }}
                  // Trigger file input click on image click
                />
                {/* Pen icon */}
                <IconButton
                  onClick={handleImageClick} // Trigger file input click on icon click
                >
                  <PhotoCameraIcon />
                </IconButton>
                {/* Hidden file input */}
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/*" // Specify that only image files can be selected
                  onChange={handleImageChange} // Handle file selection
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">Name</Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    autoFocus
                    id="first-name"
                    label="Full Name"
                    style={{ width: "70%", padding: "7px" }}
                    type="text"
                    sx={{
                      input: {
                        color: "common.black",
                        backgroundColor: "white",
                        margin: "5px",
                        height: "2px",
                      },
                      label: { color: "primary.main" },
                    }}
                    onChange={handleFnameChange}
                    value={name}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">Phone Number</Typography>
              <TextField
                required
                id="phone-number"
                style={{ width: "80%", padding: "7px" }}
                type="text"
                sx={{
                  input: {
                    color: "common.black",
                    backgroundColor: "white",
                    margin: "5px",
                    height: "2px",
                  },
                }}
                value={phone}
                onChange={handlePhoneChange}
                error={phoneError}
              />
              {phoneError && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block" }}
                >
                  enter valid phone number (11 numbers )
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default DialogForm;
