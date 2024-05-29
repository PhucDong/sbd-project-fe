import { Box, styled } from "@mui/material";

export const CustomStyledModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "460px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  "& .form-header": {
    borderRadius: "12px 12px 0 0",
    backgroundColor: theme.palette.secondary.main,
    textAlign: "center",
    padding: "12px 20px",
    "& .MuiTypography-root": {
      color: "#fff",
      fontSize: "1.3rem",
    },
  },
  "& .form-body": {
    padding: "30px 36px 14px 36px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    "& .section-label": {
      width: "40%",
      textAlign: "right",
      color: theme.palette.primary.main,
      fontSize: "1rem",
      fontWeight: 550,
    },
    "& .section-input": {
      width: "100%",
      "& .MuiInputBase-root": {
        height: "40px",
        borderRadius: "8px",
        "& .MuiOutlinedInput-input": {
          padding: "8px 0 8px 20px",
          color: theme.palette.info.main,
        },
      },
    },
    "& .form-section": {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    "& .form-section-direction": {
      flexDirection: "column",
    },
  },
}));
