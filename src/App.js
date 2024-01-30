// Start of App.js component
import React, { useState } from "react";

// Import custom components
import Header from "./components/Header";
import ProjectDetails from "./components/ProjectDetails";
import WorkPlan from "./components/WorkPlan";

// Import Material-UI components
import { Button, Card } from "@mui/material";
import IconPrint from '@mui/icons-material/Print';


// Define the App component
const App = () => {
  // Define variables with useState
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    duration: {
      start: "",
      end: "",
    },
  });
  
  // Initialization of workPlan & showWorkPlan
  const [workPlan, setWorkPlan] = useState([]);
  const [showWorkPlan, setShowWorkPlan] = useState(false);
  
  // Function to update ProjectDetails
  const handleProjectDetailsChange = (details) => {
    setProjectDetails(details);
  };
  
  // Function for "Next" button
  const handleNext = () => {
    setShowWorkPlan(true);
  };
  
  // Function to update WorkPlan
  const handleWorkPlanChange = (updatedWorkPlan) => {
    setWorkPlan(updatedWorkPlan);
  };
  
  // Function for "Print to Console" button
  const handlePrint = () => {
    console.log({ projectDetails, workPlan });
  };


  return (
    <>
      <Header />
      <Card
        sx={{
          p: 5,
          mx: { xs: 15, lg: 70 },
          mt: -8,
          mb: 4,
          backgroundColor: "rgb(230, 230, 230)",
          boxShadow: "9px 9px 9px rgba(0, 0, 0, 0.2)"
        }}
      >
        {/* Don't show ProjectDetails if showWorkPlan is false */}
        {!showWorkPlan && (
          <div>
            <ProjectDetails
              projectDetails={projectDetails}
              onChange={handleProjectDetailsChange}
              onNext={handleNext}
            />
          </div>
        )}
        {/* Show WorkPlan if showWorkPlan is true */}
        {showWorkPlan && (
          <div>
            <WorkPlan
              projectTitle={projectDetails.title}
              projectStart={projectDetails.duration.start}
              projectEnd={projectDetails.duration.end}
              workPlan={workPlan}
              onChange={handleWorkPlanChange}
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white" }}
                size="large"
                onClick={handlePrint}
                startIcon={<IconPrint />}
              >
                Print to Console
              </Button>
            </div>
          </div>
        )}
      </Card>
    </>
  );
};

export default App;
