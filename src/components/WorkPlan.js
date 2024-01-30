// Start of WorkPlan.js component 
import React from "react";

// Import custom components
import WorkPackage from "./WorkPackage";

// Import Material-UI components
import { Box, Button, Typography } from "@mui/material";
import IconAdd from "@mui/icons-material/Add";


// Define the WorkPlan component
const WorkPlan = ({ projectTitle, projectStart, projectEnd, workPlan, onChange }) => {
  // Function to add a work package
  const handleAddWorkPackage = () => {
    onChange([...workPlan, { title: "", tasks: [] }]);
  };

  // Function to update a work package
  const handleWorkPackageChange = (index, updatedWorkPackage) => {
    const updatedWorkPlan = [...workPlan];
    updatedWorkPlan[index] = updatedWorkPackage;
    onChange(updatedWorkPlan);
  };

  // Function to delete a work package
  const handleDeleteWorkPackage = (index) => {
    const updatedWorkPlan = [...workPlan];
    updatedWorkPlan.splice(index, 1);
    onChange(updatedWorkPlan);
  };

  return (
    <div>
      {/* Show project details */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" fontWeight="bold">PROJECT DETAILS</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="div"
          sx={{
            flex: 1,
            p: 1,
            m: 1,
            border: "2px solid",
            borderColor: "gray",
          }}
        >
          <Typography variant="h7" fontWeight="bold" style={{ display: "inline" }}>Project Title: </Typography>
          <Typography variant="h7" style={{ display: "inline" }}>{projectTitle}</Typography>
        </Box>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="div"
          sx={{
            flex: 1,
            p: 1,
            m: 1,
            border: "2px solid",
            borderColor: "gray",
          }}
        >
          <Typography variant="h7" fontWeight="bold" style={{ display: "inline" }}>Project Start Month: </Typography>
          <Typography variant="h7" style={{ display: "inline" }}>{projectStart}</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            flex: 1,
            p: 1,
            m: 1,
            border: "2px solid",
            borderColor: "gray",
          }}
        >
          <Typography variant="h7" fontWeight="bold" style={{ display: "inline" }}>Project End Month: </Typography>
          <Typography variant="h7" style={{ display: "inline" }}>{projectEnd}</Typography>
        </Box>
      </div>
      {/* Show work plan details */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ mt: "35px" }}>WORK PLAN</Typography>
      </div>
      {/* Mapping work plan to show WorkPackage components */}
      {workPlan.map((workPackage, index) => (
        <WorkPackage
          key={index}
          index={index}
          workPackage={workPackage}
          onChange={handleWorkPackageChange}
          onDelete={handleDeleteWorkPackage}
          projectStart={projectStart}
          projectEnd={projectEnd}
        />
      ))}
      <Button
        variant="contained"
        sx={{ color: "white", mt: "20px", mb: "20px" }}
        size="large"
        onClick={handleAddWorkPackage}
        startIcon={<IconAdd />}
      >
        Add New Work Package
      </Button>
    </div>
  );
};

export default WorkPlan;
