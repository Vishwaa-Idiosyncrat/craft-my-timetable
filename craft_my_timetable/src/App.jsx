import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector";
import BatchSelect from "./BatchSelector";
import BranchSelect from "./BranchSelector";
import InputFileUpload from "./fileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PersistentDrawerLeft from './drawer.jsx';

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

const titleBar = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
};

class App extends Component {
  render() {
    return (
      <div className="main" id="main-main">
        <body>
          <PersistentDrawerLeft />
          <div style={titleBar}>
            <h1 className="title">Craft my Time Table</h1>
            <div style={centerDivStyle}>
              {
                <img
                  className="logo"
                  src="https://www.iitpkd.ac.in/sites/default/files/inline-images/IIT_PKD_short%20logo_RGB.jpg"
                  alt="IIT Palakkad"
                  width={147.5}
                  height={131.125}
                  loading="true"
                />
              }
            </div>
          </div>
        </body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div style={centerDivStyle}>
            {/* <h3>Upload the time table</h3> */}
          </div>
          <div style={centerDivStyle}>{/* <InputFileUpload /> */}</div>
          <div style={centerDivStyle}>
            <BatchSelect />
            <BranchSelect />
          </div>
          <div style={centerDivStyle}>
            <MultipleSelectCheckmarks />
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
