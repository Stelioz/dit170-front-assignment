// Start of Task.js component
import React, { useState, useEffect } from "react";

// Import Material-UI components
import { Box, Button, Card, Divider, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material/";
import IconAdd from "@mui/icons-material/Add";
import IconRemove from "@mui/icons-material/Remove";


// Define the Task component
const Task = ({ packageId, taskIndex, task, onChange, onDelete, projectStart, projectEnd }) => {
  // Define variables with useState
  const [taskName, setTaskName] = useState('');
  // Update the task name with packageId and taskIndex
  useEffect(() => {
    setTaskName(`Task ${packageId}.${taskIndex + 1}`);
  }, [packageId, taskIndex]);

  // Function to handle changes in task properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(taskIndex, { ...task, [name]: value });
  };

  // Function for "Delete Task" button
  const handleDelete = () => {
    onDelete(taskIndex);
  };

  // Function for "Add Period" button
  const handleAddPeriod = () => {
    onChange(taskIndex, {
      ...task,
      periods: [
        ...task.periods,
        { start: projectStart , end: projectEnd }
      ]
    });
  };

  // Function to update task start & end dates
  const handlePeriodChange = (index, updatedPeriod) => {
    const updatedPeriods = [...task.periods];
    updatedPeriods[index] = updatedPeriod;
    onChange(taskIndex, { ...task, periods: updatedPeriods });
  };

  // Function for "Delete" button
  const handleDeletePeriod = (index) => {
    const updatedPeriods = [...task.periods];
    updatedPeriods.splice(index, 1);
    onChange(taskIndex, { ...task, periods: updatedPeriods });
  };

  // Generate options for start and end dates
  const generateOptions = (start, end) => {
    const options = [];
    const startMonth = parseInt(start?.slice(1)) || 1;
    const endMonth = parseInt(end?.slice(1)) || 36;
    // Loop to generate options
    for (let i = startMonth; i <= endMonth; i++) {
      options.push(`M${String(i).padStart(2, '0')}`);
    }
    return options;
  };

  // Initialization of defaultStart & defaultEnd
  const defaultStart = projectStart;
  const defaultEnd = projectEnd;


  return (
    <Card 
    variant="outlined" 
    sx={{
      mt: "10px",
      mb: "20px",
      backgroundColor: 'rgb(180, 180, 180)',
      boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.2)"
    }} 
    fullWidth
    >
      {/* Show task details */}
      <Box sx={{ p: 3 }}>
        <div>
          <Typography variant="h7" fontWeight="bold">{taskName}</Typography>
        </div>
        <div>
          <TextField fullWidth
            label="Task Title"
            name="title"
            size='small'
            sx={{ mt: "10px", mb: "20px" }}
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {/* Mapping task to show active periods */}
          {task.periods.map((period, index) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                <Typography variant="h7" sx={{ mt: "10px" }}>Active Period {index + 1}:</Typography>
                <div style={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="start-label" sx={{ mt: "10px" }}>Start Month</InputLabel>
                    <Select
                      labelId="start-label"
                      id="start"
                      label="Start Month"
                      size='small'
                      sx={{ mt: "10px" }}
                      value={period.start}
                      onChange={(e) => handlePeriodChange(index, { ...period, start: e.target.value })}
                    >
                      {/* Options for start months */}
                      {generateOptions(defaultStart, defaultEnd).map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <span> to </span>
                <div style={{ flex: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="start-label" sx={{ mt: "10px" }}>End Month</InputLabel>
                    <Select
                      labelId="start-label"
                      id="start"
                      label="Start Month"
                      size='small'
                      sx={{ mt: "10px" }}
                      value={period.end}
                      onChange={(e) => handlePeriodChange(index, { ...period, end: e.target.value })}
                    >
                      {/* Options for end months */}
                      {generateOptions(defaultStart, defaultEnd).map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'red', color: 'white', mt: "10px", }}
                  size="small"
                  onClick={() => handleDeletePeriod(index)}
                  startIcon={<IconRemove />}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Divider sx={{ mt: "15px", mb: "15px" }}></Divider>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button
              variant="contained"
              sx={{ color: 'white' }}
              size="small"
              onClick={handleAddPeriod}
              startIcon={<IconAdd />}
            >
              Add Period
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'red', color: 'white' }}
              size="small"
              onClick={handleDelete}
              startIcon={<IconRemove />}
            >
              Delete Task
            </Button>
          </div>

        </div>
      </Box>
    </Card>
  );
};

export default Task;
