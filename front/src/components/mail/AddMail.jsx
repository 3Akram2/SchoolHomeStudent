import React, { useState } from 'react';
import { Paper, Grid, Autocomplete, TextField, Button } from "@mui/material";

function AddMail({receivers,send}) {
  // Sample data for mail receivers
  // const [receivers, setReceivers] = useState([
  //   { id: 1, name: 'John Doe', email: 'john@example.com' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  //   { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  // ]);

  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleReceiverChange = (event, newValue) => {
    setSelectedReceiver(newValue);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission
    
    setSelectedReceiver(null)
    setSubject('')
    setBody('')
    send(selectedReceiver,subject,body)
  };

  return (
    <Grid container  >
      <Grid item xs={12}>
        <Paper style={{ padding: '20px' }}>
          <Autocomplete
            value={selectedReceiver}
            onChange={handleReceiverChange}
            options={receivers}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="To:" />}
          />
          <TextField
            label="Subject:"
            fullWidth
            margin="normal"
            value={subject}
            onChange={handleSubjectChange}
          />
          <TextField
            label="Body"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={body}
            onChange={handleBodyChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>Send</Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddMail;
