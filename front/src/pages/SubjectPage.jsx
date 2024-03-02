import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import AddSubject from "../components/subject/AddSubject";
import Subject from "../components/subject/Subject";
import {
  findSubjects,
  addSubject,
  deleteSubject,
  editSubject,
  joinSubject
} from "../axios/requests";
import DeleteDialoge from "../components/DeleteDialoge";
import JoinSubject from "../components/subject/JoinSubject";
import LoadingBook from "../components/LoadingBook";
import { useNavigate } from "react-router-dom";
function SubjectPage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [subjects, setSubjects] = useState([]);
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const handleOpenSubject = (id) =>{
    navigate(`/subject/${id}`);
  }
  const show = () => {
    setShowAddSubject(!showAddSubject);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await findSubjects();
        console.log(response.data.subjects);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error(error);
        alert(error.response.data.msg);
      }finally {
        // Set loading to false regardless of success or error
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);
  const handleCreateSubject = async (name, teacherId) => {
    try {
      const response = await addSubject(name, teacherId);
      setSubjects([...subjects, response.data.subject]);
      setShowAddSubject(false);
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  };
  const handleDeleteSubject = async () => {
    try {
      const response = await deleteSubject(subjectToDelete);
      setSubjects(
        subjects.filter((subject) => subject._id !== response.data.subject._id)
      );
      setDeleteDialogOpen(false);
      setSubjectToDelete("");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleEditSubject = async (id, newName) => {
    try {
      const formattedName =
        newName.trim().charAt(0).toUpperCase() + newName.trim().slice(1);
      const response = await editSubject(id, formattedName);
      setSubjects(
        subjects.map((subject) => {
          if (subject._id === response.data.subject._id) {
            return { ...subject, name: response.data.subject.name };
          }
          return subject;
        })
      );
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  };
  const confirmDelete = (id) => {
    setSubjectToDelete(id);
    setDeleteDialogOpen(true);
  };
  const handleJoinSubject = async (code,name) => {
  try {
    const response = await joinSubject(code,name);
    setSubjects([...subjects,response.data.subject])
    setShowAddSubject(false);
  } catch (error) {
    alert(error.response.data.msg)
  }
  }

  return (
   
    <Grid container>
       {loading? <Grid container justifyContent='center' alignItems='center' height='10vh'> <LoadingBook/> </Grid> : 
      <Grid container justifyContent="center">
        <Grid item md={2}>
          <Paper sx={{ backgroundColor: "primary.main" }}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              {" "}
              Subjects{" "}
            </Typography>
          </Paper>
        </Grid>
        {userInfo.type === "school" || userInfo.type === "student" ? (
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
          <Collapse in={showAddSubject}>
          {userInfo.type === 'student'?<JoinSubject handleJoin={handleJoinSubject}/>:
            <AddSubject createSubject={handleCreateSubject} />
          }
          </Collapse>
        </Grid>

        <Grid container sx={{ mt: 3 }} justifyContent="center">
          {userInfo.type === "parent" ? (
            <List
              sx={{
                justifyContent: "center",
                width: "80%",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: "60vh",
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {subjects.length === 0 ? (
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginTop: 2 }}
                >
                  No Childeren yet
                </Typography>
              ) : (
                subjects.map((childSubject) => (
                  <li key={`child-${childSubject.childId}`}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", marginTop: 2 }}
                    >
                      {
                        userInfo.children.find(
                          (child) => child._id === childSubject.childId
                        )?.name
                      }
                    </Typography>

                    {childSubject.subjects.length === 0 ? (
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", marginTop: 2 }}
                      >
                        No subjects yet for this child
                      </Typography>
                    ) : (
                      <ul>
                        {childSubject.subjects.map((subject) => (
                          <li key={subject._id}>
                            <Subject
                              id={subject._id}
                              name={subject.name}
                              code={subject.code}
                              teacher={subject.teacher.name}
                              studentCount={subject.students.length}
                              deleteSubject={confirmDelete}
                              editSubject={handleEditSubject}
                              open={handleOpenSubject}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              )}
            </List>
          ) : (
            <List
  sx={{
    justifyContent: "center",
    width: "80%",
    bgcolor: "background.paper",
    position: "relative",
    overflow: "auto",
    maxHeight: "60vh",
    "& ul": { padding: 0 },
  }}
  subheader={<li />}
>
  {subjects.length === 0 ? (
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold", marginTop: 2 }}
    >
      No subjects yet
    </Typography>
  ) : (
    subjects.map((subject) => (
      <li key={`section-${subject._id}`}>
        <Subject
          id={subject._id}
          name={subject.name}
          code={subject.code}
          teacher={subject.teacher.name}
          studentCount={subject.students.length}
          deleteSubject={confirmDelete}
          editSubject={handleEditSubject}
          open={handleOpenSubject}
        />
      </li>
    ))
  )}
</List>
          )}
          <DeleteDialoge
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteSubject}
          />
        </Grid>
      </Grid>
      }
    </Grid>
  );
}

export default SubjectPage;
