import React, {useState,useEffect} from 'react'
import { Paper, Grid, Autocomplete, TextField, Button,Select,MenuItem,InputLabel } from "@mui/material";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import { useSelector } from "react-redux";

 
function AddExam({subjects,addNewExam}) {
  const { userInfo } = useSelector((state) => state.auth);
    
    const [subject,setSubject] = useState()
    const [title,setTitle] = useState();
    const [date,setDate] = useState(dayjs());
    const [instructions,setInstructions] = useState(); 
    const [type,setType] = useState();
    const [maxScore,setMaxScore] = useState();
    const [duration,setDuration] = useState();
    
    const add = () => {
    if(!title || !date || !maxScore || !duration || !subject ){
      return alert('Enter all required fields')
    }
    const newExam = {
      title,
      date,
      instructions: instructions || '',
      type:type,
      maxScore,
      duration,
    };
    
    addNewExam(newExam,subject._id)
   
  setSubject(null)
  setTitle("")
  setDate(dayjs())
  setInstructions('')
  setType('custom')
  setMaxScore(null)
  setDuration(null)
    
    }
    
  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{ backgroundColor: "secondary.main", mt: 2, width: "80%", p: 2 }}
      >
        <Grid container justifyContent="center">
          
          <Grid item md={7} xs={12}>
            <Autocomplete
              style={{ width: "100%", padding: "7px" }}
              id="combo-box-demo"
              options={subjects }
              onChange={(event, value) => setSubject(value)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Subject" />
              )}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <TextField
              required
              id="title"
              label="Exam Title"
              style={{ width: "100%", padding: "7px" }}
              type="text"
              value={title}
              onChange={(e, value) => setTitle(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Exam Date and Time"
            value={date}
            style={{ width: "100%", padding: "7px" }}
            sx={{
              margin:'5px',
              input: { color: "common.black", margin: "5px", height: "2px" },
              label: { color: "primary.main" },
              svg:{color:'primary.main'}
            }}
            onChange={(newValue) => setDate(newValue)}
        />
        </LocalizationProvider>
          </Grid>
          <Grid item md={7} xs={12}>
            <TextField
              id="instructions"
              label="Exam Instructions"
              style={{ width: "100%", padding: "7px" }}
              type="text"
              value={instructions}
              onChange={(e, value) => setInstructions(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
          <InputLabel sx={{m:'5px'}} id="demo-simple-select-helper-label">Type</InputLabel>
          <Select 
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label='Type'
          defaultValue="custom" 
          value={type}
          onChange={(e, value) => setType(e.target.value)}
          sx={{
                margin:'5px',
                marginBottom:'10px'
              }} >
          <MenuItem value="midterm">Midterm</MenuItem>
          <MenuItem value="final">Final</MenuItem>
          <MenuItem value="quiz">Quiz</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
          </Select>

          </Grid>
          <Grid item md={7} xs={12}>
            <TextField
              required
              id="score"
              label="Exam Max Score"
              style={{ width: "100%", padding: "7px" }}
              type="number"
              value={maxScore}
              onChange={(e, value) => setMaxScore(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <TextField
              required
              id="duration"
              label="Exam Duration"
              style={{ width: "100%", padding: "7px" }}
              type="number"
              value={duration}
              onChange={(e, value) => setDuration(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Button onClick={add} variant="outlined">
                {" "}
                ADD Exam{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default AddExam