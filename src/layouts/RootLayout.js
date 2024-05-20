import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

function RootLayout() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
      }}
    >
      <SideMenu />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}

export default RootLayout;
