import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function YearSelect({ batch }) {
  const [year, setYear] = React.useState("");

  let years = [];
  if (batch === "B.Tech") {
    years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  } else if (batch === "M.Tech" || batch === "M.Sc") {
    years = ["1st Year", "2nd Year"];
  } else if (batch === "PhD") {
    years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  }

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const yearStyle = {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={yearStyle}>
      <div>
        <h3>Please select your Year</h3>
      </div>
      <Box
        sx={{
          minWidth: 300,
        }}
      >
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="year-select">Year</InputLabel>
          <Select
            labelId="year-select"
            id="year-select"
            value={year}
            label="Year"
            onChange={handleChange}
          >
            {years.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
