import { Box, Modal, Typography, styled } from "@mui/material";
import React from "react";
import CustomStyledFormButton from "./CustomStyledFormButton";

const CustomStyledDeleteAlert = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "460px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "36px 28px",
  "& .delete-text": {
    "& .MuiTypography-root": {
      textAlign: "center",
      fontSize: "1.3rem",
      lineHeight: 1.25,
    },
  },
}));

function DeleteAlert(props) {
  const {
    openDeleteAlert,
    handleCloseDeleteAlert,
    selectedRowData,
    rowsData,
    setRowsData,
    setDayTimeFrameData,
  } = props;

  const handleDeleteDayTimeFrame = () => {
    const filteredRowsData = rowsData.filter(
      (rowData) => rowData.serialNumber !== selectedRowData.serialNumber
    );
    setRowsData(filteredRowsData);
    setDayTimeFrameData(filteredRowsData);
    handleCloseDeleteAlert();
  };

  return (
    <Modal open={openDeleteAlert} onClose={handleCloseDeleteAlert}>
      <CustomStyledDeleteAlert>
        <Box className="delete-text">
          <Typography>Do you want to delete this day time frame?</Typography>
        </Box>

        <Box
          sx={{
            mt: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <CustomStyledFormButton onClick={handleCloseDeleteAlert}>
            Cancel
          </CustomStyledFormButton>
          <CustomStyledFormButton onClick={handleDeleteDayTimeFrame}>
            Delete
          </CustomStyledFormButton>
        </Box>
      </CustomStyledDeleteAlert>
    </Modal>
  );
}

export default DeleteAlert;
