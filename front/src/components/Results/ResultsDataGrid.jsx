import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField ,Typography,Grid} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
const ResultsDataGrid = ({ entries, maxScore, onEdit,subject, exam}) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [editedScore, setEditedScore] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalScore, setOriginalScore] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1); // Index of the entry being edited

    const handleEdit = (initialScore, index) => {
        setOriginalScore(initialScore.toString());
        setEditedScore(initialScore.toString());
        setIsEditing(true);
        setEditingIndex(index); // Set the index of the entry being edited
    };

    const handleSave = (rowId) => {
        console.log('Row ID:', rowId);
        console.log('Edited Score:', editedScore);
        onEdit(subject._id,rowId,parseInt(editedScore));
        setEditedScore(0)
        setIsEditing(false);
        setEditingIndex(-1); // Reset the editing index after saving
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedScore(originalScore);
        setEditingIndex(-1); // Reset the editing index after canceling
    };

    const handleChange = (event) => {
        const { value } = event.target;
        if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= maxScore)) {
            setEditedScore(value);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
    <Typography variant="h5" gutterBottom>
        {subject && subject.name} / {exam.title}
    </Typography>
    
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Max Score</TableCell>
                    <TableCell>Score</TableCell>
                   {userInfo.type==='teacher'? <TableCell >Action</TableCell>:''}
                </TableRow>
            </TableHead>
            <TableBody>
                {entries.map((row, index) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.student.name}</TableCell>
                        <TableCell>{maxScore}</TableCell>
                       <TableCell>
                            {isEditing && editingIndex === index ? ( // Check if this row is being edited
                                <TextField
                                    type="number"
                                    value={editedScore}
                                    onChange={handleChange}
                                    InputProps={{ inputProps: { min: 0, max: maxScore } }}
                                />
                            ) : (
                                row.score
                            )}
                        </TableCell>
                        {userInfo.type === 'teacher'?<TableCell>
                            {isEditing && editingIndex === index ? ( // Check if this row is being edited
                                <>
                                    <Button variant="contained" color="success" onClick={() => handleSave(row._id)} startIcon={<SaveIcon />}>
                                        Save
                                    </Button>
                                    <Button variant="contained" color="error" onClick={handleCancel} startIcon={<CancelIcon />}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button variant="contained" onClick={() => handleEdit(row.score, index)} startIcon={<EditIcon />}>
                                    Edit
                                </Button>
                            )}
                        </TableCell>:''}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
</Grid>

    );
};

export default ResultsDataGrid;
