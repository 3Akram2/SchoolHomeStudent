import React, { useState, useEffect } from "react";
import {
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Popover,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { findSubjects, editResults } from "../axios/requests";
import ResultsDataGrid from "../components/Results/ResultsDataGrid";

function ResultsPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [results, setResults] = useState();
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [childMenuAnchor, setChildMenuAnchor] = useState({});
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const response = await findSubjects();
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjectsData();
  }, []);

  const handleSubjectClick = (event, subject) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubject(subject);
    setSelectedExam(null); // Clear the selected exam when a new subject is clicked
    setResults(null);
  };

  const handleChildMenuClick = (event, child) => {
    console.log(child,'<<<<<<')
    setSelectedChild(child)
    setChildMenuAnchor(prevAnchor => ({
        ...prevAnchor,
        [child._id]: event.currentTarget // Set anchor for the clicked child
        
    }));
   

};


  const handleChildMenuClose = (childId) => {
    setChildMenuAnchor(prevAnchor => ({
        ...prevAnchor,
        [childId]: null // Close the menu for the specified child
    }));
};


  const handleExamClick = (exam) => {
    console.log(selectedChild)
    if (exam) {
      setSelectedExam(exam);
      handleClosePopover();
      // Filter the results based on user type
      if (userInfo.type === "teacher") {
        const examResults = selectedSubject.results.filter(
          (result) => result.exam._id === exam._id
        );
        setResults(examResults);
      } else if (userInfo.type === "student") {
        const examResults = selectedSubject.results.filter(
          (result) =>
            result.exam._id === exam._id && result.student._id === userInfo._id
        );
        setResults(examResults);
      } else if (userInfo.type === "parent") {
        const examResults = selectedSubject.results.filter(
            (result) =>
              result.exam._id === exam._id && result.student._id === selectedChild._id
          );
          setResults(examResults);
        
      }
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const updateResult = async (subjectId, resultId, score) => {
    try {
      const response = await editResults(subjectId, resultId, score);
      const updatedSubject = response.data.subject;
      if (updatedSubject) {
        const updatedResults = results.map((result) => {
          if (result._id === resultId) {
            return { ...result, score: score };
          }
          return result;
        });
        setResults(updatedResults);
        if (selectedSubject && selectedSubject._id === updatedSubject._id) {
          setSelectedSubject(updatedSubject);
        }
        if (selectedExam && selectedExam._id === updatedSubject._id) {
          const updatedExam = updatedSubject.exams.find(
            (exam) => exam._id === selectedExam._id
          );
          setSelectedExam(updatedExam);
        }
      } else {
        console.error("Updated subject not returned from the server.");
      }
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  return (
    <Grid container>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        {showAlert && (
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}
      </Grid>
      <Grid item md={1}>
        <Drawer
          variant="permanent"
          sx={{
            width: 300,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: "black",
              color: "primary.main",
              width: "10rem",
              height: 690,
              marginTop: 9,
            },
          }}
        >
         <List sx={{ marginTop: 35 }}>
  {userInfo.type === "parent" && (
    // Render children and their subjects for parent user
    <>
      {userInfo &&
        subjects &&
        subjects.map((childd) => {
          // Get the child object from userInfo.children based on childId
          const child = userInfo.children.find(
            (child) => child._id === childd.childId
          );
          if (!child) return null; // Skip if child not found

          return (
            <div key={childd.childId}>
              <ListItem
                button
                onClick={(event) => handleChildMenuClick(event, child)}
              >
                <ListItemText
                  primary={child.name}
                  sx={{ color: 'secondary.main' }} // Set color to cyan
                />
              </ListItem>
              {childd.subjects.length > 0 ? ( // Check if the child has subjects
                <Menu
                  anchorEl={childMenuAnchor[child._id]} // Use child's ID as the key
                  open={Boolean(childMenuAnchor[child._id])}
                  onClose={() => handleChildMenuClose(child._id)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right", // Adjust the horizontal alignment
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left", // Adjust the horizontal alignment
                  }}
                  
                >
                  {childd.subjects.map((subject) => (
                    <MenuItem
                      key={subject._id}
                      onClick={(event) => handleSubjectClick(event, subject)}
                      sx={{ backgroundColor: "black", color: 'primary.main', cursor: 'pointer' }}
                    >
                      {subject.name}
                    </MenuItem>
                  ))}
                </Menu>
              ) : (
                <Typography variant="body2" sx={{ ml: 2 }}>
                  No subjects yet
                </Typography>
              )}
            </div>
          );
        })}
    </>
  )}
  {userInfo.type !== "parent" &&
    subjects.map((subject) => (
      <div key={subject._id}>
        <ListItem
          sx={{ cursor: "pointer" }}
          onClick={(event) => handleSubjectClick(event, subject)}
        >
          <ListItemText primary={subject.name} />
        </ListItem>
        
        <Divider color="white" />
      </div>
    ))}
</List>

        </Drawer>
      </Grid>
      <Grid item xs={11}>
        <Grid container alignItems={"center"} justifyContent={"center"}>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right", // Adjust the horizontal alignment
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left", // Adjust the horizontal alignment
            }}
          >
            <List sx={{ backgroundColor: "black" }}>
              {selectedSubject &&
                selectedSubject.exams.map((exam) => (
                  <ListItem
                    sx={{ backgroundColor: "primary.main", m: 0.2 }}
                    key={exam.id}
                    onClick={() => handleExamClick(exam)}
                  >
                    <ListItemText
                      primary={exam.title}
                      sx={{ cursor: "pointer" }}
                    />
                  </ListItem>
                ))}
            </List>
          </Popover>
        </Grid>
        <Grid container alignItems={"center"} justifyContent={"center"}>
          {results && (
            <ResultsDataGrid
              entries={results}
              maxScore={selectedExam.maxScore}
              subject={selectedSubject && selectedSubject}
              exam={selectedExam && selectedExam}
              onEdit={updateResult}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ResultsPage;
