import CreateIcon from "@material-ui/icons/Create"
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  table: {
    border: "2px solid #222C34",
    width: "800px",
    height: "200px",
  },
  th: {
    borderBottom: "1px solid black",
  },
  td: {
    textAlign: "center",
  },
})

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
  const classes = useStyles();
  const [rows, setRows] = useState([
    { SerialNum: 1, Name: "", Monday: "", Tuesday: "", Wednesday: "", Thursday:"", Friday: "", Saturday: ""},
  ]);

  // Initial states
  const handleCloseAddForm = (onCloseAddForm, reason) => {
    if (reason === "clickaway") {
      return;
    }
  }
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
