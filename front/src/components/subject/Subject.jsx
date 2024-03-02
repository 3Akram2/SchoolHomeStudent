import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Grid, Typography, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MoreIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Subject({
  id,
  name,
  code,
  teacher,
  studentCount,
  deleteSubject,
  editSubject,
  open
}) {
  const { userInfo } = useSelector((state) => state.auth);
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const removeSubject = () => {
    deleteSubject(id);
  };
  const updateSubject = () => {
    editSubject(id, editedName);
    setIsEditing(false);
  };
  const openSubject = () =>{
    open(id)
  }
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
          <Grid item md={5}>
            {isEditing ? (
              <Typography variant="h6">
                Subject Name:
                <TextField
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  width="80%"
                />
              </Typography>
            ) : (
              <Typography variant="h6">Subject Name: {name}</Typography>
            )}
          </Grid>
          <Grid item md={5}>
            <Typography variant="h6">Subject Code: {code}</Typography>
          </Grid>
          {userInfo.type === "school" ? (
            <Grid
              item
              md={2}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {isEditing ? (
                <IconButton onClick={updateSubject} aria-label="save">
                  <SaveIcon sx={{ color: "primary.main" }} />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={removeSubject} aria-label="delete">
                    <DeleteIcon sx={{ color: "#F03434" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditing(true)}
                    aria-label="edit"
                  >
                    <EditIcon sx={{ color: "primary.main" }} />
                  </IconButton>
                </>
              )}
            </Grid>
          ) : (
            ""
          )}
          <Grid item md={5}>
            <Typography variant="h6">Subject Teacher: {teacher}</Typography>
          </Grid>
          <Grid item md={5}>
            <Typography variant="h6">Students Count: {studentCount}</Typography>
          </Grid>
          <Grid item md={2}>
            <IconButton variant="outlined" sx={{backgroundColor:'primary.main'}} onClick={openSubject}>
            <MoreIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Subject;
