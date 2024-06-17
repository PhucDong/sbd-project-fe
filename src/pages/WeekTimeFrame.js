import { Box } from "@mui/material";
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
  return (
    <Box>
      <MainHeadingLayout>Week Time Frame Settin</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledAddButton startIcon={<AddIcon />}>
          Not Add
        </CustomStyledAddButton>
      </MainButtonGroupLayout>
    </Box>
  );
}

export default WeekTimeFrame;
