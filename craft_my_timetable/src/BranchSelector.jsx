import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BranchSelect() {
  const [Batch, setBatch] = React.useState("");

  const Branches = ["CE", "CSE", "EE", "ME", "DS"];
  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  return (
    <div>
      <div>
        <h3>Please select you Branch</h3>
      </div>
      <Box sx={{ minWidth: 300 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="branch-select">Branch</InputLabel>
          <Select
            labelId="branch-select"
            id="branch-select"
            value={Batch}
            label="Branch"
            onChange={handleChange}
          >
            {Branches.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
