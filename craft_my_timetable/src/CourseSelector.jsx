import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "MA1011",
  "PH1030",
  "ME1030",
  "MA1020",
  "CE1020",
  "CY1040",
  "Random course",
  "OLEP",
];

export default function MultipleSelectCheckmarks() {
  const [CourseName, setCourseName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCourseName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(value)
  };

  return (
    <div>
      <div>
        <h3>Please select your courses</h3>
      </div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="Course-checkbox">Courses</InputLabel>
        <Select
          labelId="Course-checkbox"
          id="multiple-Course-checkbox"
          multiple
          value={CourseName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={CourseName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
