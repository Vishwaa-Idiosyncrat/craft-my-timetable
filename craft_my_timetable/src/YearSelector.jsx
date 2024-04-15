import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function YearSelect({ batch, setYear }) {
  const [year, setLocalYear] = React.useState("Select year");

  let years = [];
  if (batch === "B.Tech") {
    years = [
      "1st Semester",
      "2nd Semester",
      "3rd Semester",
      "4th Semester",
      "5th Semester",
      "6th Semester",
      "7th Semester",
      "8th Semester",
    ];
  } else if (batch === "M.Tech" || batch === "M.Sc") {
    years = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester"];
  } else if (batch === "PhD") {
    years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  }

  const handleChange = (event) => {
    setLocalYear(event.target.value);
    setYear(event.target.value);
    console.log(event.target.value);
    
  };

  const yearStyle = {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={yearStyle}>
      <h3>Please select your Semester</h3>
      <Box
        sx={{
          minWidth: 300,
        }}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="year-select">Semester</InputLabel>
          <Select
            labelId="year-select"
            id="year-select"
            value={year}
            label="Year"
            onChange={handleChange}
          >
            <MenuItem value="Select year" disabled>
              Select Semester
            </MenuItem>{" "}
            {years.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
