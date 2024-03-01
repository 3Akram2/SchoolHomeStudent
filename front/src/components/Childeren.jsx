import React from "react";
import { Grid, Paper } from "@mui/material";
import Child from "./Child";
import ChildSignup from "./ChildSignup";
import { useSelector } from "react-redux";
function Childeren({ childeren, userId }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Paper sx={{ backgroundColor: "black", m: 2, p: 2 }}>
        <Grid container>
          {childeren.map((child, index) => (
            <Grid key={index} mb={1} item md={3}>
              <Child
                image={child.profilePicUrl}
                text={child.name}
                _id={child._id}
              />
            </Grid>
          ))}
          <Grid item mb={1} md={3}>
            {" "}
            {userInfo._id === userId ? <ChildSignup /> : ""}{" "}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Childeren;
