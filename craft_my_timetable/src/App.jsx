import axios from "axios";
import "./App.css";
import React, { Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector";
import BatchSelect from "./BatchSelector";
import YearSelect from "./YearSelector.jsx";
import ParentComponent from "./ParentComponent";
import BranchSelect from "./BranchSelector";
import InputFileUpload from "./fileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Input } from "@mui/material";
import CourseSelectionPage from "./CourseSelectionPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

const bodyStyle = {
  display: "grid",
  marginTop: "25px",
  textAlign: "center",
  fontFamily: "sans-serif",
  justifyContent: "center",
};

function BodyContent() {
  const location = useLocation();

  return location.pathname === "/" ? (
    <body style={bodyStyle}>
      <h1>Welcome to Craft My Timetable from YACC.</h1>
    </body>
  ) : null;
}

function App() {
  return (
    <div className="main" id="main-main">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <BodyContent />
          <Routes>
            <Route path="/" element={<ParentComponent />} />
            <Route path="/course-selection" element={<CourseSelectionPage />} />
          </Routes>
        </Router>
        <div style={centerDivStyle}></div>
      </ThemeProvider>
    </div>
  );
}

export default App;
