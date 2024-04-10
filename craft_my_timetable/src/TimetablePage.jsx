import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "./available.json";

// const courses = []

const days_odd = ["Monday", "Friday"];
const times_odd = [
  "8:00-8:50",
  "9:00-9:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:05-12:55",
  "14:00-15:15",
  "15:30-16:45",
  "17:10-18:00",
];

const days_wednesday = ["Wednesday"];
const times_wednesday = [
  "8:00-8:50",
  "9:00-9:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:05-12:55",
  "14:00-15:15",
  "15:30-16:45",
  "17:10-18:00",
];

const days_even = ["Tuesday", "Thursday"];
const times_even = [
  "8:00-8:50",
  "9:00-10:15",
  "10:30-11:45",
  "12:00-12:50",
  "14:00-15:15",
  "15:30-16:45",
  "17:10-18:00",
];

function TimetablePage({ courseTimings }) {
  const submitted = localStorage.getItem("submitted") === "true";
  const selectedCourses = JSON.parse(localStorage.getItem("selectedCourses"));
  const courses = data;
  console.log("selectedCourses:", selectedCourses);
  console.log("courses:", courses);
  console.log("Rendering TimetablePage with submitted:", submitted);
  console.log("Rendering TimetablePage with submitted:", submitted);

  return (
    <div>
      {submitted &&
        (console.log("Rendering timetable..."),
        (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "150px" }}>Time</TableCell>
                  {times_odd.map((time, index) => (
                    <TableCell style={{ width: "150px" }} key={index}>
                      {time}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {days_odd.map((day, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ width: "150px" }}
                      component="th"
                      scope="row"
                    >
                      {day}
                    </TableCell>
                    {times_odd.map((time, index) => {
                      const courseAtThisTime = selectedCourses.find(
                        (courseCode) => {
                          const courseTiming = courseTimings[day]?.classes.find(
                            (courseClass) =>
                              courseClass.subject ===
                              courses.find(
                                (course) =>
                                  Object.keys(course)[0] === courseCode
                              )[courseCode][0]
                          );
                          return courseTiming && courseTiming.time === time;
                        }
                      );
                      return (
                        <TableCell style={{ width: "150px" }} key={index}>
                          {courseAtThisTime || ""}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}

      <p></p>

      {submitted && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "150px" }}>Time</TableCell>
                {times_wednesday.map((time, index) => (
                  <TableCell style={{ width: "150px" }} key={index}>
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days_wednesday.map((day, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{ width: "150px" }}
                    component="th"
                    scope="row"
                  >
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
                      <TableCell style={{ width: "150px" }} key={index}>
                        {courseAtThisTime || ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <p></p>

      {submitted && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "150px" }}>Time</TableCell>
                {times_even.map((time, index) => (
                  <TableCell style={{ width: "150px" }} key={index}>
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days_even.map((day, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{ width: "150px" }}
                    component="th"
                    scope="row"
                  >
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
                      <TableCell style={{ width: "150px" }} key={index}>
                        {courseAtThisTime || ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default TimetablePage;
