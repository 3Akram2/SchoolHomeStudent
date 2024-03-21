import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Paper, Grid, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';


function Exam({ exam, editExam, deleteExam }) {
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  const { userInfo } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedExam, setEditedExam] = useState({ ...exam });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
const handleDeleteClick = () => {
   setDeleteDialogOpen(true);
 };
 const handleDialogClose = () => {
   setDialogOpen(false);
 };

 const handleConfirmDelete = () => {
   deleteExam(exam._id, exam.subject);
   setDeleteDialogOpen(false);
 };
  const handleEditClick = () => {
    setEditedExam({ ...exam });
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const handleSaveClick = () => {
    editExam( editedExam,editedExam._id,editedExam.subject);
    setIsEditing(false);
    setDialogOpen(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setDialogOpen(false);
    setDeleteDialogOpen(false)
  };

  return (
    <Grid container p={1} m={1} justifyContent="center" sx={{ width: "99%" }}>
      <Paper
        sx={{
          width: "80%",
          borderBottom: "2px solid black",
          borderTop: "1px solid black",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Grid container>
          <Grid item md={10}>
            <Typography variant='h6'> Title: {exam.title} </Typography>
          </Grid>
          <Grid item md={2}>
          {userInfo.type === "teacher" ? (
            <Grid
              item
              md={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton onClick={handleDeleteClick} aria-label="delete">
                <DeleteIcon sx={{ color: "#F03434" }} />
              </IconButton>
              <IconButton onClick={handleEditClick} aria-label="edit">
                <EditIcon sx={{ color: "primary.main" }} />
              </IconButton>
            </Grid>
          ) : (
            ""
          )}
          </Grid>
          <Grid item md={3}>
            <Typography> Date: {formatDate(exam.date)} </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography> Type: {exam.type} </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography> Max Score: {exam.maxScore} </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography> Status: {exam.status} </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography> Instructions: {exam.instructions} </Typography>
          </Grid>
          
        </Grid>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCancelClick}>
        <DialogTitle>Edit Exam</DialogTitle>
        <DialogContent>
        <TextField
      label="Title"
      value={editedExam.title}
      sx={{margin:'5px'}}
      onChange={(e) =>
        setEditedExam({ ...editedExam, title: e.target.value })
      }
      fullWidth
    />
<Grid item md={7} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
  label="Exam Date and Time"
  value={editedExam.date ? dayjs(editedExam.date) : null}
  style={{ width: "100%", padding: "7px" }}
  sx={{
    margin:'5px',
    input: { color: "common.black", margin: "5px", height: "2px" },
    label: { color: "primary.main" },
    svg:{color:'primary.main'}
  }}
  onChange={(newValue) =>
    setEditedExam({ ...editedExam, date: newValue ? newValue.toISOString() : null }) // Convert to ISO string
  }
/>

      </LocalizationProvider>
          </Grid>
    <TextField
      label="Instructions"
      value={editedExam.instructions}
      sx={{margin:'5px'}}
      onChange={(e) =>
        setEditedExam({ ...editedExam, instructions: e.target.value })
      }
      fullWidth
    />
    <TextField
      label="Type"
      value={editedExam.type}
      sx={{margin:'5px'}}
      onChange={(e) =>
        setEditedExam({ ...editedExam, type: e.target.value })
      }
      fullWidth
    />
    <TextField
      label="Max Score"
      type="number"
      value={editedExam.maxScore}
      sx={{margin:'5px'}}
      onChange={(e) =>
        setEditedExam({ ...editedExam, maxScore: e.target.value })
      }
      fullWidth
    />
    <TextField
      label="Duration"
      type="number"
      value={editedExam.duration}
      sx={{margin:'5px'}}
      onChange={(e) =>
        setEditedExam({ ...editedExam, duration: e.target.value })
      }
      fullWidth
    />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={deleteDialogOpen} onClose={handleCancelClick}>
        <DialogTitle>Delete Exam</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this exam?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Exam;
