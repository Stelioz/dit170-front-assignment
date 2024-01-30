// Start of ProjectDetails.js component
import React, { useState } from "react";

// Import Material-UI components
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material/";
import SendIcon from "@mui/icons-material/Send";

// Define the ProjectDetails component
const ProjectDetails = ({ projectDetails, onChange, onNext }) => {
  // Define validation errors
  const [errors, setErrors] = useState({});

  // Function to handle changes in project properties
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update projectDetails with new value
    onChange({
      ...projectDetails,
      [name]: value,
    });
  };

  // Function for start and end dates options
  const generateOptions = (startMonth) => {
    const options = [];
    // Loop to generate options
    for (let i = parseInt(startMonth.slice(1)); i <= 36; i++) {
      options.push(`M${String(i + 1).padStart(2, "0")}`);
    }
    return options;
  };

  // Function to handle changes in start date
  const handleStartDateChange = (e) => {
    const { value } = e.target;
    onChange({
      ...projectDetails,
      duration: {
        ...projectDetails.duration,
        start: value,
      },
    });
  };

  // Function to handle changes in end date
  const handleEndDateChange = (e) => {
    const { value } = e.target;
    onChange({
      ...projectDetails,
      duration: {
        ...projectDetails.duration,
        end: value,
      },
    });
  };

  // Function to validate form inputs
  const validateInputs = () => {
    const errors = {};
    if (!projectDetails.title) {
      errors.title = "Project Title is required";
    }
    if (!projectDetails.duration.start) {
      errors.start = "Start Month is required";
    }
    if (!projectDetails.duration.end) {
      errors.end = "End Month is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

   // Function for "Next" button (App.js)
  const handleNext = () => {
    const isValid = validateInputs();
    if (isValid) {
      onNext();
    }
  };


  return (
    <>
      {/* Show project details */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" fontWeight="bold">PROJECT DETAILS</Typography>
      </div>
      <div>
        <TextField fullWidth
          label="Project Title"
          name="title"
          sx={{ mt: "20px" }}
          value={projectDetails.title}
          onChange={handleChange}
          required
        />
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {errors.title && <Alert severity="error">{errors.title}</Alert>}
      </Stack>
      <div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <FormControl fullWidth>
            <InputLabel id="start-label" sx={{ mt: "10px" }}>Start Month</InputLabel>
            <Select
              labelId="start-label"
              id="start"
              label="Start Month"
              sx={{ mt: "10px" }}
              value={projectDetails.duration.start}
              onChange={handleStartDateChange}
              required
            >
              {/* Options for start months */}
              {Array.from({ length: 36 }, (_, i) => (
                <MenuItem key={i} value={`M${String(i + 1).padStart(2, "0")}`}>
                  {`M${String(i + 1).padStart(2, '0')}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="end-label" sx={{ mt: "10px" }} >End Month</InputLabel>
            <Select
              labelId="end-label"
              id="end"
              label="End Month"
              sx={{ mt: "10px" }}
              value={projectDetails.duration.end}
              onChange={handleEndDateChange}
              required
            >
              {/* Options for end months */}
              {generateOptions(projectDetails.duration.start).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", width: "100%" }}>
          <Stack spacing={2} sx={{ flex: 1 }}>
            {errors.start && <Alert severity="error">{errors.start}</Alert>}
          </Stack>
          <Stack spacing={2} sx={{ flex: 1 }}>
            {errors.end && <Alert severity="error">{errors.end}</Alert>}
          </Stack>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ color: "white", mt: "20px" }}
              size="large"
              onClick={handleNext}
              endIcon={<SendIcon />}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
