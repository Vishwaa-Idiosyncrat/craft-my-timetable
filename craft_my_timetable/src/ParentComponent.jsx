import React, { useState } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BatchSelect from "./BatchSelector";
import YearSelect from "./YearSelector.jsx";
import BranchSelect from "./BranchSelector.jsx";
import { useNavigate } from "react-router-dom";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: "auto",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const uploadStyle = {
  display: "flex",
  margin: "auto",
  height: "60px",
  width: "200px",
  gridTemplateColumn: "uniform",
};

export default function ParentComponent() {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const navigate = useNavigate();

  const submit = () => {
    setUploading(true);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setUploading(false);
          navigate("/course-selection", { state: { year, branch, responseFromServerCourses } });
          return 0;
        }
        return Math.min(oldProgress + 20, 100);
      });
    }, 500);

    // Example POST method implementation:
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
    console.log(branch, year);
    sendBatch("http://127.0.0.1:8000/courses", {
      branch: branch,
      semester: year,
    }).then((responseFromServer) => {
      const responseFromServerCourses = responseFromServer.result
      console.log(responseFromServer); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <div>
      <BatchSelect setBatch={setBatch} />
      {batch && <YearSelect setYear={setYear} batch={batch} />}
      {batch && <BranchSelect setBranch={setBranch} batch={batch} />}
      <Button
        style={uploadStyle}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onClick={submit}
        disabled={
          !batch ||
          year === "Select year" ||
          !year ||
          !branch ||
          branch === "Select branch"
        }
      >
        Craft
      </Button>
      {uploading && <CircularProgressWithLabel value={progress} />}
    </div>
  );
}
