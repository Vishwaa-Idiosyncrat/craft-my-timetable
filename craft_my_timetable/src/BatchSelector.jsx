import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BatchSelect({ setBatch }) {
  const Batches = ["B.Tech", "M.Tech", "M.Sc", "PhD"];

  const handleChange = (event) => {
    setBatch(event.target.value);
    console.log(event.target.value);
  };

  const batchStyle = {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={batchStyle}>
      <h3>Please select your Batch</h3>
      <Box sx={{ minWidth: 300 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="batch-select">Batch</InputLabel>
          <Select
            labelId="batch-select"
            id="batch-select"
            onChange={handleChange}
          >
            {Batches.map((item, index) => (
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
