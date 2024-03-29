import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

function CourseSelectionPage({ courses }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/available.json");
        const coursesArray = await response.json();
        courses(coursesArray);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleChange = (event) => {
    setSelectedCourses(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
    localStorage.setItem("submitted", "true");
    setSubmitted(true);
    window.location.href = "/timetable";
  };

  const final_button = {
    display: "flex",
    margin: "25px",
    justifyContent: "center",
  };

  const course_box = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      <h1>Select a Course</h1>
      <Box style={course_box} sx={{ minWidth: 300 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="course-select">Courses</InputLabel>
          <Select
            labelId="course-select"
            id="course-select"
            multiple
            value={selectedCourses}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {courses.map((course, index) => {
              const courseCode = Object.keys(course)[0];
              const courseName = course[courseCode][0];
              return (
                <MenuItem key={index} value={courseCode}>
                  <Checkbox
                    checked={selectedCourses.indexOf(courseCode) > -1}
                  />
                  <ListItemText primary={`${courseCode}: ${courseName}`} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <div style={final_button}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CourseSelectionPage;
