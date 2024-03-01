import React, {useState} from 'react'
import { Paper, Grid, TextField, Button} from '@mui/material'
function JoinSubject({handleJoin}) {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const join = () => {
        if (!name || !code) {
          return alert("Enter all fields");
        }
        const formattedName =
          name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
        const formattedCode =
          code.slice(0, 3).toUpperCase() + code.slice(3); 
          handleJoin(formattedCode,formattedName);
          setName("");
          setCode("");
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
          <TextField
              required
              id="code"
              label="Subject Code"
              style={{ width: "100%", padding: "7px" }}
              type="text"
              value={code}
              onChange={(e, value) => setCode(e.target.value)}
              sx={{
                input: { color: "common.black", margin: "5px", height: "2px" },
                label: { color: "primary.main" },
              }}
            />
          </Grid>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <Button onClick={join} variant="outlined">
                {" "}
                Join Subject{" "}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default JoinSubject