import AddIcon from "@mui/icons-material/Add";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import React, { useState } from "react";
import { CustomStyledAddButton } from "../components/CustomStyledAddButton";
import CreateIcon from "@material-ui/icons/Create";
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
});

function WeekTimeFrame() {

  const StyledTableObject = useStyles();

  const [rows, setRows] = useState([
    { SerialNum: 1, Name: "", Monday: "", Tuesday: "", Wednesday: "", Thursday:"", Friday: "", Saturday: ""},
  ]);

  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disableForm, setDisableform] = React.useState(true);
  const [showConfirmForm, setShowConfirmForm] = React.useState(true);

  const handleCloseAddForm = (event, reason) => {
    if (reason === "clickaway"){
      return;
    }
    setOpenAddForm(false);
  };
  
  const handleAddForm = () => {
    setRows([
      ...rows,
      {
        SerialNum: rows.length + 1, Name:"",Monday:"", Tuesday:"", Wednesday:"",Thursday:"",
        Friday:"", Saturday:""
      },
    ]);
    setEdit(true);
  };

  //Questionable
  const handleEditForm = (i) => {
    setEdit(!isEdit);
  };
  
  const handleSaveForm= () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("Saved: ", rows);
    setDisableform(true);
    setOpenAddForm(true);
  };

  const handleInputChange = (e, index) => {
    setDisableform(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
};

  const handleConfirmForm = () => {
    setShowConfirmForm(true);
  };

  const handleRemoveClick = (i) => {
    const formList = [...rows];
    formList.splice(i, 1);
    setRows(formList);
    setShowConfirmForm(false);
  };

  const handleClickNo = () => {
    setShowConfirmForm(false);
  };

  return (
    <TableBody>
      <Snackbar 
      open={openAddForm}
      autoHideDuration={1500}
      onClose={handleCloseAddForm}
      className={StyledTableObject.Snackbar}
      >
        <Alert onClose={handleCloseAddForm} severity="success">
          Form saved successfully!
        </Alert>
      </Snackbar>
      <Box>
      <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledAddButton
          onClick={handleOpenAddForm}
          startIcon={<AddIcon />}
        >
          Add
        </CustomStyledAddButton>

        <IconButton
          sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
          onClick={() => window.location.replace(window.location.href)}
        >
          <CachedIcon sx={{ fontSize: "2.1rem", color: "primary.main" }} />
        </IconButton>
      </MainButtonGroupLayout>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        {isEdit ? (
                            <div>
                                <Button onClick={handleAddForm}>
                                    <AddBoxIcon onClick={handleAddForm} />
                                    ADD
                                </Button>
                                {rows.length !== 0 && (
                                    <div>
                                        {disableForm ? (
                                            <Button disabled align="right"
                                                             onClick={handleSaveForm}>
                                                <DoneIcon />
                                                SAVE
                                            </Button>
                                        ) : (
                                            <Button align="right" onClick={handleSaveForm}>
                                                <DoneIcon />
                                                SAVE
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <Button onClick={handleAddForm}>
                                    <AddBoxIcon onClick={handleAddForm} />
                                    ADD
                                </Button>
                                <Button align="right" onClick={handleEditForm}>
                                    <CreateIcon />
                                    EDIT
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <TableRow align="center"> </TableRow>
 
                <Table
                    className={StyledTableObject.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Monday</TableCell>
                            <TableCell>Tuesday</TableCell>
                            <TableCell>Wednesday</TableCell>
                            <TableCell>Thursday</TableCell>
                            <TableCell align="center">Friday</TableCell>
                            <TableCell align="center">Saturday</TableCell>
                            <TableCell align="center"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => {
                            return (
                                <div>
                                    <TableRow>
                                        {isEdit ? (
                                            <div>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Name}
                                                        name="Name"
                                                        onChange={(e) => 
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Monday}
                                                        name="Monday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Tuesdayday}
                                                        name="Tuesday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Wednesday}
                                                        name="Wednesday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Thursday}
                                                        name="Thursday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Friday}
                                                        name="Friday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                                <TableCell padding="none">
                                                    <input
                                                        value={row.Saturday}
                                                        name="Saturday"
                                                        onChange={(e) =>
                                                        handleInputChange(e, i)}
                                                    />
                                                </TableCell>
                                            </div>
                                        ) : (
                                            <div>
                                                <TableCell component="th" scope="row">
                                                    {row.Name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Monday}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Thursday}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Tuesday}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Wednesday}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Friday}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.Saturday}
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    align="center"
                                                ></TableCell>
                                            </div>
                                        )}
                                        {isEdit ? (
                                            <Button className="mr10"
                                                     onClick={handleConfirmForm}>
                                                <ClearIcon />
                                            </Button>
                                        ) : (
                                            <Button className="mr10"
                                                    onClick={handleConfirmForm}>
                                                <DeleteOutlineIcon />
                                            </Button>
                                        )}
                                        {showConfirmForm && (
                                            <div>
                                                <Dialog
                                                    open={showConfirmForm}
                                                    onClose={handleClickNo}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby=
                                                        "alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Confirm Delete"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText 
                                                            id="alert-dialog-description">
                                                            Are you sure to delete
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => 
                                                            handleRemoveClick(i)}
                                                            color="primary"
                                                            autoFocus
                                                        >
                                                            Yes
                                                        </Button>
                                                        <Button
                                                            onClick={handleClickNo}
                                                            color="primary"
                                                            autoFocus
                                                        >
                                                            No
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        )}
                                    </TableRow>
                                </div>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
    </TableBody>
  )

  // return (
  //   <Box>
  //     <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
  //     <MainButtonGroupLayout>
  //       <CustomStyledAddButton startIcon={<AddIcon />}>
  //         Add
  //       </CustomStyledAddButton>
  //     </MainButtonGroupLayout>
  //   </Box>
  // );
}

export default WeekTimeFrame;
