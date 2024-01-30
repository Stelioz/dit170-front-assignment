// Start of Header.js component
import React from "react";

// Import Material-UI components
import { Box, Grid, Typography } from "@mui/material";

// Import custom images
import bgImage from "../images/banner.jpg";
import logo from "../images/logo.png";


// Define the Header component
const Header = () => {
  return (
    <>
      {/* Header container with background image */}
      <Box
        minHeight="20rem"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* Grid container for logo and title */}
        <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
          <Box
            mb={7}
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "120px",
              width: "100%",
            }}
          />
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            textAlign="center"
            mt={-6}
            mb={6}
          >
            PROJECT MANAGEMENT
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Header;
