import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

function RootLayout() {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <SideMenu />
      <Box
        sx={{ height: "100vh", width: "100%", px: { xs: 3 }, py: { xs: 5 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default RootLayout;
