import { Button, styled } from "@mui/material";

export const CustomStyledAddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  padding: "8px 20px",
  textTransform: "capitalize",
  fontSize: "1.1rem",
  fontWeight: 600,
  lineHeight: "100%",
  color: "#fff",
  borderRadius: "20px",
  fontFamily: "Open Sans, sans-serif",
  "& .MuiSvgIcon-root": {
    fontSize: "1.4rem",
  },
  "&:hover": {
    backgroundColor: theme.palette.success.main,
  },
}));
