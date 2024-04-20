import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
// import response from "./../data.json";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CourseSelectionPage({ courses }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState([]);
  // const [timing, setTiming] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { year, branch } = location.state || {};
  console.log(year, branch);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("/timings.json"); ///replace timings.json with the api endpoint of the server
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const jsonData = await response.json();
  //     setTiming(jsonData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        async function sendBatch(url, data) {
          // Default options are marked with *
          const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
        }
        await sendBatch("https://04c1-14-139-174-50.ngrok-free.app/courselist", {
          selectedCourses: selectedCourses,
          branch: branch,
          semester: year,
        }).then((responseFromServer) => {
          console.log(responseFromServer); // JSON data parsed by `data.json()` call
          let data2 = {};
          let categories = Object.keys(responseFromServer.result);
          for (let i = 0; i < categories.length; i++) {
            let c = categories[i];
            let arr2 = responseFromServer.result[c];
            let temp = {};
            for (let j = 0; j < arr2.length; j++) {
              let cC = arr2[j][0];
              let cN = arr2[j][1];
              temp[cC] = cN;
            }
            data2[c] = temp;
          }
          // console.log(data2);
          // const coursesObject = await response.json();
          setData(data2); //changed coursesObject to core2
          // Extract the course codes of the "CORE" courses
        const coreCourses = Object.keys(data2["CORE"]); //changing coursesObject["CORE"] to
        // console.log(coreCourses)
        setSelectedCourses(coreCourses);
        });

        
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
        const response = await fetch("/timings.json"); //replace with server endpoint
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
    navigate("/timetable");
    // window.location.href("/timetable")
    // console.log(branch,year)
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
            {Object.entries(data).map(([category, courses]) => {
              // console.log(courses);
              return Object.keys(courses).map((courseCode, index) => {
                const courseName = courses[courseCode];
                return (
                  <MenuItem key={index} value={courseCode}>
                    {
                      <Checkbox
                        checked={selectedCourses.indexOf(courseCode) > -1}
                      />
                    }
                    <ListItemText primary={`${courseCode}: ${courseName}`} />
                  </MenuItem>
                );
              });
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
