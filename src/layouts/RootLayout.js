import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import { useState } from "react";
import { styled } from "@mui/material/styles";

export const drawerWidth = 300;

const CustomStyledMainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "openSideMenu",
})(({ theme, openSideMenu }) => ({
  flexGrow: 1,
  height: "100vh",
  width: `calc(100% - ${drawerWidth}px)`,
  padding: "40px 30px",

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,

  ...(!openSideMenu && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${drawerWidth - 130}px)`,
  }),
}));

function RootLayout() {
  const [openSideMenu, setOpenSideMenu] = useState(true);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <SideMenu openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
      <CustomStyledMainContent openSideMenu={openSideMenu}>
        <Outlet />
      </CustomStyledMainContent>
    </Box>
  );
}

export default RootLayout;
