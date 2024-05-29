import { Typography } from "@mui/material";

function MainHeadingLayout({ children }) {
  return (
    <Typography
      variant="h1"
      sx={{ fontSize: "1.8rem", fontWeight: 550, mb: "16px" }}
    >
      {children}
    </Typography>
  );
}

export default MainHeadingLayout;
