import axios from "axios";
import "./App.css";
import React, { useState, useEffect, Component } from "react";
import MultipleSelectCheckmarks from "./CourseSelector";
import BatchSelect from "./BatchSelector";
import YearSelect from "./YearSelector.jsx";
import ParentComponent from "./ParentComponent";
import BranchSelect from "./BranchSelector";
import InputFileUpload from "./fileUpload";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Input } from "@mui/material";
import CourseSelectionPage from "./CourseSelectionPage";
import TimetablePage from "./TimetablePage.jsx";
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
  const [submitted, setSubmitted] = useState(false);
  const [courseTimings, setCourseTimings] = useState({});

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const response = await fetch("/timings.json");
        const timings = await response.json();
        setCourseTimings(timings);
      } catch (error) {
        console.error("Error fetching course timings:", error);
      }
    };
    fetchTimings();
  }, []);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/available.json");
        const coursesArray = await response.json();
        setCourses(coursesArray);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="main" id="main-main">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <BodyContent />
          <Routes>
            <Route path="/" element={<ParentComponent />} />
            <Route
              path="/course-selection"
              element={
                <CourseSelectionPage
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  courseTimings={courseTimings}
                  setCourseTimings={setCourseTimings}
                  courses={courses}
                  setCourses={setCourses}
                />
              }
            />
            <Route
              path="/timetable"
              element={
                <TimetablePage
                  submitted={submitted}
                  courseTimings={courseTimings}
                  courses={courses}
                />
              }
            />
          </Routes>
        </Router>
        <div style={centerDivStyle}></div>
      </ThemeProvider>
    </div>
  );
}

export default App;
