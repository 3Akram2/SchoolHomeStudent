import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { db } from "../config/firebase"; // Import your Firebase Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const NotificationMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when component mounts
  useEffect(() => {
    const userId = userInfo.uid;
    const fetchNotifications = async () => {
      // Fetch notifications from Firestore
      try {
        const q = query(
          collection(db, "notifications"),
          where("uid", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot.docs);
        const notificationsData = querySnapshot.docs.map((doc) => doc.data());

        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userInfo.uid]);

  // Open menu when bell icon is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      style={{ textAlign: "center", justifyContent: "center", display: "flex" }}
    >
      <IconButton onClick={handleClick} color="primary.main">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon fontSize="large" sx={{ color: "primary.main" }} />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notifications.map((notification, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {notification.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default NotificationMenu;
