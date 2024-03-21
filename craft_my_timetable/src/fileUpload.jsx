import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const uploadStyle = {
  display: "flex",
  margin: "auto",
  height: "60px",
  width: "200px",
  gridTemplateColumn: "uniform",
};

const title = {
  marginTop: "100px",
  color: "#ffffff",
  textAlign: "center",
  fontFamily: "sans-serif",
  fontSize: "40px",
};

export default function InputFileUpload() {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();

  const handleUpload = (event) => {
    setUploading(true);
    const file = event.target.files[0];
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setUploading(false);
          navigate("/create"); // Redirect to /create
          return 0;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);
  };

  return (
    <>
      <h1 style={title}>Welcome to Craft My Timetable</h1>
      <h1 style={title}>Please upload the timetable file here</h1>
      <Button
        style={uploadStyle}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleUpload} />
      </Button>
      {uploading && <CircularProgressWithLabel value={progress} />}
    </>
  );
}
