import Grid from "@mui/material/Grid";
import { useState } from "react";
import { IconButton, styled } from "@mui/material";
import LeftTable from "./LeftTable";
import RightTable from "./RightTable";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const CustomStyledGrid = styled(Grid)(() => ({
  margin: 0,
  justifyContent: "space-between",
  alignItems: "flex-start",
}));

function filterAfterMove(a, b) {
  const bIds = b.map((value) => value.userId);

  return a.filter((value) => bIds.indexOf(value.userId) === -1);
}

function filterLeftRight(a, b) {
  const results = [];
  for (let i = 0; i < a.length; i++) {
    for (let ii = 0; ii < b.length; ii++) {
      if (a[i] === b[ii].userId) {
        results.push(b[ii]);
      }
    }
  }
  return results;
}

export default function PermissionTransferList({
  unAuthorizedUsers,
  authorizedUsers,
  doorShiftList,
}) {
  const [selectedRowsRightTable, setSelectedRowsRightTable] = useState([]);
  const [selectedRowsLeftTable, setSelectedRowsLeftTable] = useState([]);
  const [selectedAllRows, setSelectedAllRows] = useState([]);
  const [left, setLeft] = useState(unAuthorizedUsers);
  const [right, setRight] = useState(authorizedUsers);

  const leftChecked = filterLeftRight(selectedAllRows, left);
  const rightChecked = filterLeftRight(selectedAllRows, right);

  const handleCheckedRight = () => {
    leftChecked.forEach((user) => (user.doorAccessList = doorShiftList));
    setRight(right.concat(leftChecked));
    setLeft(filterAfterMove(left, leftChecked));
    setSelectedAllRows([]);
  };

  const handleCheckedLeft = () => {
    rightChecked.forEach((user) => delete user["doorAccessList"]);
    setLeft(left.concat(rightChecked));
    setRight(filterAfterMove(right, rightChecked));
    setSelectedAllRows([]);
  };

  return (
    <CustomStyledGrid container>
      <Grid item xs={5} md={5} lg={4}>
        <LeftTable
          selectedRowsLeftTable={selectedRowsLeftTable}
          setSelectedRowsLeftTable={setSelectedRowsLeftTable}
          selectedRowsRightTable={selectedRowsRightTable}
          setSelectedAllRows={setSelectedAllRows}
          unAuthorizedUsers={left}
        />
      </Grid>
      <Grid item xs={1} md={1} lg={1} sx={{ alignSelf: "center" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          gap="8px"
          sx={{
            "& .MuiIconButton-root.Mui-disabled": {
              backgroundColor: "#EBEBEB",
            },
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "success.main",
              height: "52px",
              minWidth: "52px",
              borderRadius: "4px",
              "& .MuiSvgIcon-root": {
                color: "#fff",
                fontSize: "2rem",
              },
              "&:hover": {
                backgroundColor: "success.main",
              },
            }}
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "error.main",
              height: "52px",
              minWidth: "52px",
              borderRadius: "4px",
              "& .MuiSvgIcon-root": {
                color: "#fff",
                fontSize: "2rem",
              },
              "&:hover": {
                backgroundColor: "error.main",
              },
            }}
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6} lg={7}>
        <RightTable
          selectedRowsRightTable={selectedRowsRightTable}
          setSelectedRowsRightTable={setSelectedRowsRightTable}
          selectedRowsLeftTable={selectedRowsLeftTable}
          setSelectedAllRows={setSelectedAllRows}
          authorizedUsers={right}
        />
      </Grid>
    </CustomStyledGrid>
  );
}
