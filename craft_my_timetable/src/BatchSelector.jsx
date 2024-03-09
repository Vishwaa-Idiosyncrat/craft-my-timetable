import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BatchSelect() {
  const [Batch, setBatch] = React.useState('');

  const Batches = [
    "BTech 1st year",
    "BTech 2nd year",
    "BTech 3rd year",
    "BTech 4th year",
    "Mtech 1st year",
    "Mtech 2nd year",
    "Msc 1st year",
    "Msc 2nd year",
    "PhD",
  ];

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  return (
    <div>
        <div>
            <h3>Please select you Batch</h3>
        </div>
        <Box sx={{ minWidth: 300 }}>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="batch-select">Batch</InputLabel>
            <Select
            labelId="batch-select"
            id="batch-select"
            value={Batch}
            label="Batch"
            onChange={handleChange}
            >
                {Batches.map((item)=>
            <MenuItem value={item}>
                {item}</MenuItem>)}
            </Select>
        </FormControl>
        </Box>
    </div>
  );
}
