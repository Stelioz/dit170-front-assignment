// Start of WorkPackage.js component
import React, { useState } from "react";

// Import custom components
import Task from './Task';

// Import Material-UI components
import { Box, Button, Card, Divider, TextField, Typography } from "@mui/material";
import IconAdd from "@mui/icons-material/Add";
import IconRemove from "@mui/icons-material/Remove";
import IconUpdate from "@mui/icons-material/Update";


// Define the WorkPackage component
const WorkPackage = ({ index, workPackage, onChange, onDelete, projectTitle, projectStart, projectEnd }) => {
  // Function to initalize active period of a work package
  const [activePeriod, setActivePeriod] = useState({ start: "n/a", end: "n/a" });

  // Function to update WP active period based on tasks periods
  const updateActivePeriod = () => {
    let earliestStart = projectEnd;
    let latestEnd = projectStart;
    // Loop in tasks to find earliest start and latest end dates
    workPackage.tasks.forEach(task => {
      task.periods.forEach(period => {
        if (period.start < earliestStart) {
          earliestStart = period.start;
        }
        if (period.end > latestEnd) {
          latestEnd = period.end;
        }
      });
    });
    // Update active period state
    setActivePeriod({ start: earliestStart === projectEnd ? "n/a" : earliestStart, end: latestEnd === projectStart ? "n/a" : latestEnd });
  };

  // Function to update a task change
  const handleTaskChange = (taskIndex, updatedTask) => {
    const updatedTasks = [...workPackage.tasks];
    updatedTasks[taskIndex] = updatedTask;
    onChange(index, { ...workPackage, tasks: updatedTasks });
  };

  // Function for "Add Task" button
  const handleAddTask = () => {
    onChange(index, {
      ...workPackage,
      tasks: [...workPackage.tasks, { title: '', periods: [] }]
    });
  };

  // Function for "Delete Task" button (Task.js)
  const handleDeleteTask = (taskIndex) => {
    const updatedTasks = [...workPackage.tasks];
    updatedTasks.splice(taskIndex, 1);
    onChange(index, { ...workPackage, tasks: updatedTasks });
  };

  // Function for "Update WP Period" button
  const handleUpdateActivePeriod = () => {
    if (workPackage.tasks.length === 0) {
      setActivePeriod({ start: "n/a", end: "n/a" });
    } else {
      updateActivePeriod();
    }
  };


  return (
    <Card
      variant="outlined"
      sx={{
        mt: "20px",
        mb: "30px",
        backgroundColor: "rgb(200, 200, 200)",
        boxShadow: "7px 7px 7px rgba(0, 0, 0, 0.2)"
      }}
      fullWidth
    >
      {/* Show work package details */}
      <Box sx={{ p: 3 }}>
        <div>
          <Typography variant="h7" fontWeight="bold">Work Package {index + 1}</Typography>
        </div>
        <div>
          <TextField fullWidth
            label="WP Title"
            name="title"
            size="small"
            sx={{ mt: "15px", mb: "25px" }}
            value={workPackage.title}
            onChange={(e) => onChange(index, { ...workPackage, title: e.target.value })}
            required
          />
        </div>
        <Divider>
          <Typography variant="h7" fontWeight="bold">WP Tasks</Typography>
        </Divider>
        {/* Mapping work package to show Task components */}
        {workPackage.tasks.map((task, taskIndex) => (
          <Task
            key={taskIndex}
            packageId={index + 1}
            taskIndex={taskIndex}
            task={task}
            onChange={handleTaskChange}
            onDelete={handleDeleteTask}
            projectStart={projectStart}
            projectEnd={projectEnd}
          />
        ))}
        <Button
          variant="contained"
          sx={{ color: "white", mt: "10px" }}
          size="medium"
          onClick={handleAddTask}
          startIcon={<IconAdd />}
        >
          Add Task
        </Button>
        <Divider sx={{ mt: "20px", mb: "10px" }}>
          <Typography variant="h7" fontWeight="bold">WP Active Period</Typography>
        </Divider>
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
            <Typography variant="h7" fontWeight="bold" style={{ display: "inline" }}>Work Package Start Month: </Typography>
            <Typography variant="h7" style={{ display: "inline" }}>{activePeriod.start}</Typography>
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
            <Typography variant="h7" fontWeight="bold" style={{ display: "inline" }}>Work Package End Month: { }</Typography>
            <Typography variant="h7" style={{ display: "inline" }}>{activePeriod.end}</Typography>
          </Box>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ color: "white", mt: "10px" }}
            size="medium"
            onClick={handleUpdateActivePeriod}
            startIcon={<IconUpdate />}
          >
            Update WP Period
          </Button>
        </div>
        <Divider sx={{ mt: "20px", mb: "20px" }}></Divider>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red", color: "white" }}
            size="medium"
            onClick={() => onDelete(index)}
            startIcon={<IconRemove />}
          >
            Delete WP
          </Button>
        </div>
      </Box>
    </Card>
  );
};

export default WorkPackage;
