import { Box } from "@mui/material";

function MainButtonGroupLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Box>
  );
}

export default MainButtonGroupLayout;
