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
import PersistentDrawerLeft from "./drawer.jsx";
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
  marginTop: "100px",
  textAlign: "center",
  fontFamily: "sans-serif",
  justifyContent: "center",
};

function BodyContent() {
  const location = useLocation();

  return location.pathname === "/" ? (
    <body style={bodyStyle}>
      <h1>Welcome to Craft My Timetable from YACC.</h1>
      <h2>
        Create Your Timetable so you won't miss classes due to messy Timetable
        sent to us.
      </h2>
      <h1>Go to the Navigation Bar for more details.</h1>
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
          <PersistentDrawerLeft />
          <Routes>
            <Route path="/upload" element={<InputFileUpload />} />
            <Route path="/create" element={<ParentComponent />} />
          </Routes>
        </Router>
        <div style={centerDivStyle}></div>
      </ThemeProvider>
    </div>
  );
}

export default App;
