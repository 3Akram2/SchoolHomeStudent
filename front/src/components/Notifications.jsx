import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { db } from "../config/firebase"; // Import your Firebase Firestore instance
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotificationMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch notifications when component mounts
  const fetchNotifications = async () => {
    try {
      const q = query(
        collection(db, "notifications"),
        where("uid", "==", userInfo.uid)
      );
      const querySnapshot = await getDocs(q);

      const notificationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("fetched")
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications initially when component mounts
    fetchNotifications();

    // Fetch notifications every 5 seconds using setInterval
    const intervalId = setInterval(fetchNotifications, 5000);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [userInfo.uid]); // Fetch notifications when userInfo.uid changes

  // Open menu when bell icon is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleClose = () => {
    setAnchorEl(null);
   
  };

  // Navigate to exams page
  const navToExams = () => {
    navigate('/exams');
  };

  // Delete notification from Firestore
  const handleNotificationClick = async (notificationId) => {
    try {
      // Delete the notification from Firestore
      await deleteDoc(doc(db, "notifications", notificationId));

      // Update the notifications state to remove the deleted notification
      handleClose()
      navToExams(); 
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
      <IconButton onClick={handleClick} color="primary.main">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon fontSize="large" sx={{ color: "primary.main" }} />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      {notifications.length === 0 ? (
        <MenuItem onClick={handleClose}>
          <Typography>No new notifications</Typography>
        </MenuItem>
      ) : (
        notifications.map((notification, index) => (
          <MenuItem key={index} onClick={() => handleNotificationClick(notification.id)} sx={{width:'300px'}} >
            <Grid container>
              <Grid item md={12}>
                <Typography sx={{ whiteSpace: 'pre-wrap' }}>{notification.body}</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        ))
      )}
    </Menu>
    </div>
  );
};

export default NotificationMenu;
