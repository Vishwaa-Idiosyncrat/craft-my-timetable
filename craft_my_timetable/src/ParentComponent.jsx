import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BatchSelect from "./BatchSelector";
import YearSelect from "./YearSelector.jsx";
import BranchSelect from "./BranchSelector.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const tableStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function SubmittedData({ data }) {
  return (
    <TableContainer component={Paper} style={tableStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Branch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{data.batch}</TableCell>
            <TableCell>{data.year}</TableCell>
            <TableCell>{data.branch}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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
  const [submittedData, setSubmittedData] = useState(null);

  const submit = () => {
    setUploading(true);
    setSubmittedData({ batch, year, branch });
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setUploading(false);
          return 0;
        }
        return Math.min(oldProgress + 20, 100);
      });
    }, 500);
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
          !batch || year === "Select year" || branch === "Select branch"
        }
      >
        Craft
      </Button>
      {uploading && <CircularProgressWithLabel value={progress} />}
      {!uploading && submittedData && <SubmittedData data={submittedData} />}
    </div>
  );
}
