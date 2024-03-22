import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BranchSelect({ batch, setBranch }) {
  const [branch, setLocalBranch] = React.useState("Select branch");

  let branches = [];
  if (batch === "B.Tech") {
    branches = ["CE", "CSE", "EE", "ME", "DSE"];
  } else if (batch === "M.Tech") {
    branches = [
      "Geotechnical Engineering",
      "Manufacturing and Materials Engineering",
      "Computing and Mathematics",
      "Data Science",
      "Power Electronics and Power Systems",
      "System-on-Chip Design",
    ];
  } else if (batch === "M.Sc") {
    branches = ["Chemistry", "Mathematics", "Physics"];
  } else if (batch === "PhD") {
    branches = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
  }

  const handleChange = (event) => {
    setLocalBranch(event.target.value);
    setBranch(event.target.value);
  };

  const branchStyle = {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={branchStyle}>
      <h3>Please select your Branch</h3>
      <Box sx={{ minWidth: 300 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="branch-select">Branch</InputLabel>
          <Select
            labelId="branch-select"
            id="branch-select"
            value={branch}
            label="Branch"
            onChange={handleChange}
          >
            <MenuItem value="Select branch" disabled>
              Select branch
            </MenuItem>
            {branches.map((item, index) => (
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
