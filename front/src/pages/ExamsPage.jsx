import React, { useState, useEffect } from "react";
import Exam from "../components/Exams/Exam";
import AddExam from "../components/Exams/AddExam";
import { findSubjects, addExam, deleteExam, editExam } from "../axios/requests";
import { useSelector } from "react-redux";
import LoadingBook from "../components/LoadingBook";
import {
  Typography,
  Grid,
  Paper,
  Fab,
  Box,
  Collapse,
  List,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function ExamsPage() {
  const [showAddExam, setShowAddExam] = useState(false);
  const [options, setOptions] = useState();
  const [subjects, setSubjects] = useState();
  const [loading, setLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await findSubjects();
        const resSubj = response.data.subjects;
        console.log(resSubj);
        setSubjects(resSubj);
        const extractedSubjects = resSubj.map((subject) => ({
          label: subject.name,
          _id: subject._id,
        }));
        setOptions(extractedSubjects);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const add = async (exam, subjectId) => {
    const response = await addExam(exam, subjectId);
    const updatedSubject = response.data.subject;
    const subjectIndex = subjects.findIndex(
      (subject) => subject._id === subjectId
    );
    const updatedSubjects = [...subjects];
    if (subjectIndex !== -1) {
      updatedSubjects.splice(subjectIndex, 1, updatedSubject);
      setSubjects(updatedSubjects);
    }
    setShowAddExam(false);
  };
  const edit = async (editedExam, examId, subjectId) => {
    console.log(editedExam, examId, subjectId, "editedExam,examId,subjectId");
    try {
      const response = await editExam(editedExam, examId, subjectId);
      const updatedSubject = response.data.subject;
      const subjectIndex = subjects.findIndex(
        (subject) => subject._id === subjectId
      );
      const updatedSubjects = [...subjects];
      if (subjectIndex !== -1) {
        updatedSubjects.splice(subjectIndex, 1, updatedSubject);
        setSubjects(updatedSubjects);
      }
    } catch (error) {}
  };
  const remove = async (examId, subjectId) => {
    try {
      const response = await deleteExam(examId, subjectId);
      const updatedSubject = response.data.subject;
      const subjectIndex = subjects.findIndex(
        (subject) => subject._id === subjectId
      );
      const updatedSubjects = [...subjects];
      if (subjectIndex !== -1) {
        updatedSubjects.splice(subjectIndex, 1, updatedSubject);
        console.log(subjects);
        setSubjects(updatedSubjects);
        console.log(subjects);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const show = () => {
    setShowAddExam(!showAddExam);
  };

  return (
    <Grid container justifyContent="center">
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
                {" "}
                Exams{" "}
              </Typography>
            </Paper>
          </Grid>
          {userInfo.type === "teacher" ? (
            <Box
              sx={{
                "& > :not(style)": {
                  m: 1,
                  position: "absolute",
                  bottom: "22vh",
                  right: "5vh",
                },
              }}
            >
              <Fab color="primary" aria-label="add" onClick={show}>
                <AddIcon />
              </Fab>
            </Box>
          ) : (
            ""
          )}
          <Grid item md={12}>
            <Collapse in={showAddExam}>
              <AddExam addNewExam={add} subjects={options} />
            </Collapse>
          </Grid>
          {userInfo.type === "parent" ? (
            <Grid container>
              {subjects &&
                subjects.map((childSubject) => (
                  <Grid item md={12} key={childSubject.childId}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        margin: "10px",
                        border: "1px solid #ccc",
                        padding: "4px 8px",
                      }}
                    >
                      {
                        userInfo.children.find(
                          (child) => child._id === childSubject.childId
                        )?.name
                      }
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        margin: "10px",
                        border: "1px solid #ccc",
                        padding: "4px 8px",
                      }}
                    >
                      {childSubject.subjects.length > 0 ? (
                        childSubject.subjects.map((subject) => (
                          <div key={subject.name}>
                            <Typography variant="h6" gutterBottom>
                              Subject: {subject.name}
                            </Typography>
                            {subject.exams && subject.exams.length > 0 ? (
                              subject.exams.map((exam) => (
                                <div key={exam.id}>
                                  <Typography>
                                    <Exam
                                      editExam={edit}
                                      deleteExam={remove}
                                      exam={exam}
                                    />
                                  </Typography>
                                </div>
                              ))
                            ) : (
                              <Typography>No exams yet.</Typography>
                            )}
                          </div>
                        ))
                      ) : (
                        <Typography>No subjects yet.</Typography>
                      )}
                    </Typography>
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Grid container spacing={1}>
              {subjects && subjects.length > 0 ? (
                subjects.map((subject) => (
                  <Grid item md={10} key={subject.id}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        margin: "10px",
                        border: "1px solid #ccc",
                        padding: "4px 8px",
                      }}
                    >
                      {subject?.name}
                    </Typography>
                    {subject?.exams?.length === 0 ? (
                      <Typography variant="body1">
                        No exams yet for this subject.
                      </Typography>
                    ) : (
                      <Grid container spacing={1}>
                        {subject?.exams?.map((exam) => (
                          <Grid item md={12} key={exam.id}>
                            <Exam
                              editExam={edit}
                              deleteExam={remove}
                              exam={exam}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                ))
              ) : (
                <Typography variant="body1">No subjects yet.</Typography>
              )}
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export default ExamsPage;
