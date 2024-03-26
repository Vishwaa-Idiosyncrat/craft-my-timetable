import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CourseSelectionPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

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

  const handleSubmit = () => {
    localStorage.setItem("selectedCourses", JSON.stringify(selectedCourses));
  };

  const days_odd = ["Monday", "Friday"];
  const times_odd = [
    "8:00 - 8:50",
    "9:00 - 9:50",
    "10:00 - 10:50",
    "11:00 - 11:50",
    "12:05 - 12:55",
    "14:00 - 16:45",
    "17:10 - 18:00",
  ];

  const days_wednesday = ["Wednesday"];
  const times_wednesday = [
    "8:00 - 8:50",
    "9:00 - 9:50",
    "10:00 - 10:50",
    "11:00 - 11:50",
    "12:05 - 12:55",
    "14:00 - 15:15",
    "15:30 - 16:45",
    "17:10 - 18:00",
  ];

  const days_even = ["Tuesday", "Thursday"];
  const times_even = [
    "8:00 - 8:50",
    "9:00 - 10:15",
    "10:30 - 11:45",
    "12:00 - 12:50",
    "14:00 - 16:45",
    "17:10 - 18:00",
  ];

  return (
    <div>
      <h1>Select a Course</h1>
      <Box sx={{ minWidth: 300 }}>
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
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {times_odd.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days_odd.map((day, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                {times_odd.map((time, index) => {
                  const courseAtThisTime = selectedCourses.find(
                    (courseCode) => {
                      const courseTiming = courseTimings[day]?.classes.find(
                        (courseClass) =>
                          courseClass.subject ===
                          courses.find(
                            (course) => Object.keys(course)[0] === courseCode
                          )[courseCode][0]
                      );
                      return courseTiming && courseTiming.time === time;
                    }
                  );
                  return (
                    <TableCell key={index}>{courseAtThisTime || ""}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p></p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {times_wednesday.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days_wednesday.map((day, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                {times_wednesday.map((time, index) => {
                  const courseAtThisTime = selectedCourses.find(
                    (courseCode) => {
                      const courseTiming = courseTimings[day]?.classes.find(
                        (courseClass) =>
                          courseClass.subject ===
                          courses.find(
                            (course) => Object.keys(course)[0] === courseCode
                          )[courseCode][0]
                      );
                      return courseTiming && courseTiming.time === time;
                    }
                  );
                  return (
                    <TableCell key={index}>{courseAtThisTime || ""}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p></p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              {times_even.map((time, index) => (
                <TableCell key={index}>{time}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {days_even.map((day, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {day}
                </TableCell>
                {times_even.map((time, index) => {
                  const courseAtThisTime = selectedCourses.find(
                    (courseCode) => {
                      const courseTiming = courseTimings[day]?.classes.find(
                        (courseClass) =>
                          courseClass.subject ===
                          courses.find(
                            (course) => Object.keys(course)[0] === courseCode
                          )[courseCode][0]
                      );
                      return courseTiming && courseTiming.time === time;
                    }
                  );
                  return (
                    <TableCell key={index}>{courseAtThisTime || ""}</TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CourseSelectionPage;
