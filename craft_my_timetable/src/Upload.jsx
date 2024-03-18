import React, { Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector.jsx";
import BatchSelect from "./BatchSelector.jsx";
import BranchSelect from "./BranchSelector.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const centerDivStyle = {
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
};

class Upload extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div style={centerDivStyle}>
          <BatchSelect />
          <BranchSelect />
        </div>
        <div style={centerDivStyle}>
          <MultipleSelectCheckmarks />
        </div>
      </ThemeProvider>
    );
  }
}

export default Upload;
