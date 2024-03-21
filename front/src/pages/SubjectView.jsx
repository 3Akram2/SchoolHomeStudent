import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { findOne } from "../axios/requests";
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import LoadingBook from "../components/LoadingBook";

function SubjectView() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of students per page

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await findOne(subjectId);
        setSubject(response.data.subject);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(error.response.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container justifyContent='center' alignItems='center'>
      {loading ? (
        <LoadingBook />
      ) : (
        <Grid container justifyContent="center">
          <Grid item md={2}>
            <Paper sx={{ backgroundColor: "primary.main" }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                {subject && subject.name}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      {subject && (
        <Grid container sx={{ display: "flex", textAlign: "center", mt: 2 }}>
          <Grid item md={4}>
            <Typography variant="h6">Subject Code: {subject.code}</Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="h6">
              Subject Teacher: {subject.teacher.name}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="h6">
              Students Count: {subject.students.length}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* Table to display students */}
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subject &&
                  subject.students
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={subject && subject.students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SubjectView;
