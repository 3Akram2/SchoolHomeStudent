import React,{useState} from 'react'
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Grid,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Mail() {
    const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      // Close menu
      const handleClose = () => {
        setAnchorEl(null);
       
      };
  return (
    <div style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
      <IconButton onClick={()=>navigate('/mail/me')} color="primary.main">
        {/* <Badge badgeContent={1} color="error"> */}
          <MailOutlineIcon fontSize="large" sx={{ color: "primary.main" }} />
        {/* </Badge> */}
      </IconButton>
      {/* <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      
        <MenuItem onClick={handleClose}>
          <Typography onClick={()=>navigate('/mail/me')} >No new mails</Typography>
        </MenuItem>
    </Menu> */}
    </div>
  )
}

export default Mail