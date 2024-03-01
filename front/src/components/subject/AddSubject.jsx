import React, { useEffect, useState } from "react";
import { Paper, Grid, Autocomplete, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
function AddSubject({ createSubject }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const extractedTeachers = userInfo.teachers.map((teacher) => ({
      label: teacher.name,
      _id: teacher._id,
    }));
    setTeachers(extractedTeachers);
  }, [userInfo.teachers]);
  const addSubject = () => {
    if (!name || !teacher) {
      return alert("Enter all fields");
    }
    const formattedName =
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
    createSubject(formattedName, teacher._id);
    setName("");
  };
  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{ backgroundColor: "secondary.main", mt: 2, width: "80%", p: 2 }}
      >
        <Grid container justifyContent="center">
          <Grid item md={7} xs={12}>
            <TextField
              required
              id="name"
              label="Subject Name"
              style={{ width: "100%", padding: "7px" }}
              type="text"
              value={name}
              onChange={(e, value) => setName(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid item md={7} xs={12}>
            <Autocomplete
              style={{ width: "100%", padding: "7px" }}
              id="combo-box-demo"
              options={teachers}
              onChange={(event, value) => setTeacher(value)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Teacher" />
              )}
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Button onClick={addSubject} variant="outlined">
                {" "}
                ADD Subject{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
export default AddSubject;
