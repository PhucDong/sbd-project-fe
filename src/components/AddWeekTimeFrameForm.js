import { Button, MenuItem, TextField, Typography } from "@mui/material";

const selectOptions = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
];

function AddWeekTimeFrameForm({ handleCloseAddForm }) {
  return (
    <>
      <Typography>Add Week Time Frame</Typography>
      <TextField
        name="select-week-time-frame"
        required
        select
        label="Serial No."
        defaultValue={1}
        inputProps={{ id: "select-week-time-frame" }}
        InputLabelProps={{ htmlFor: "select-week-time-frame" }}
      >
        {selectOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button onClick={handleCloseAddForm}>Close</Button>
    </>
  );
}

export default AddWeekTimeFrameForm;
