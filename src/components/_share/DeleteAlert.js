import { Box, Modal, Typography, styled } from "@mui/material";
import React from "react";
import CustomStyledFormButton from "./CustomStyledFormButton";

const CustomStyledDeleteAlert = styled(Box)(() => ({
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
  const { openDeleteAlert, handleCloseDeleteAlert, onClick, message } = props;

  return (
    <Modal open={openDeleteAlert} onClose={handleCloseDeleteAlert}>
      <CustomStyledDeleteAlert>
        <Box className="delete-text">
          <Typography>{message}</Typography>
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
          <CustomStyledFormButton onClick={onClick}>
            Delete
          </CustomStyledFormButton>
        </Box>
      </CustomStyledDeleteAlert>
    </Modal>
  );
}

export default DeleteAlert;
