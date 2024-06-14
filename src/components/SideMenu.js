import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  ListItemButton,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { drawerWidth } from "../layouts/RootLayout";

const openedMixin = (theme) => ({
  width: `${drawerWidth}px`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "130px",
});

const DrawerHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== "openSideMenu",
})(({ theme, openSideMenu }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: openSideMenu ? "8px 16px 8px 40px" : "8px 16px",
  backgroundColor: theme.palette.secondary.main,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "openSideMenu",
})(({ theme, openSideMenu }) => ({
  width: `${drawerWidth}px`,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: theme.palette.primary.main,
  ...(openSideMenu && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!openSideMenu && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function SideMenu(props) {
  const { openSideMenu, setOpenSideMenu } = props;
  const [expanded, setExpanded] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const navigate = useNavigate();
  const sideMenuItems = useSelector((state) => state.management.sideMenuItems);

  const handleOpenSideMenu = () => {
    setOpenSideMenu(true);
  };

  const handleCloseSideMenu = () => {
    setOpenSideMenu(false);
    setExpanded(false);
  };

  const handleChange = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  const handleSelectedSubItem = (subItem, mainMenuItemPath) => {
    setSelectedItemIndex(subItem.label);
    navigate(
      `${mainMenuItemPath}/${subItem.label.toLowerCase().replace(/\s/g, "-")}`
    );
  };

  return (
    <Drawer variant="permanent" openSideMenu={openSideMenu}>
      <DrawerHeader openSideMenu={openSideMenu}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Avatar
            alt="Minh Phuc"
            children={
              <AccountCircleOutlinedIcon
                sx={{ height: "100%", width: "100%" }}
              />
            }
            sx={{
              width: "60px",
              height: "60px",
              backgroundColor: "transparent",
            }}
          />
          {openSideMenu ? (
            <Typography
              sx={{ fontWeight: 550, fontSize: "1.3rem", color: "#fff" }}
            >
              Minh Phuc
            </Typography>
          ) : (
            ""
          )}
        </Box>
        {openSideMenu ? (
          <IconButton
            onClick={handleCloseSideMenu}
            sx={{ color: "#fff", p: 0 }}
          >
            <KeyboardTabIcon
              sx={{ transform: "rotate(180deg)", fontSize: "30px" }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={handleOpenSideMenu} sx={{ color: "#fff", p: 0 }}>
            <KeyboardTabIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        )}
      </DrawerHeader>

      <Box
        sx={{
          height: "100%",
          backgroundColor: "primary.main",
          "& .MuiPaper-root.MuiAccordion-root": {
            borderRadius: 0,
            boxShadow: "none",
          },
          "& .MuiAccordion-root.Mui-expanded": {
            m: 0,
            pb: 0,
          },
          "& .Mui-disabled": {
            backgroundColor: "transparent",
            opacity: 1,
          },
        }}
      >
        {sideMenuItems.map((sideMenuItem) => (
          <Accordion
            key={sideMenuItem.label}
            disabled={openSideMenu ? false : true}
            expanded={expanded === `${sideMenuItem.panel}`}
            onChange={handleChange(`${sideMenuItem.panel}`)}
            sx={{
              backgroundColor: "primary.main",
              color: "#747474",
              "& .MuiAccordionSummary-root.Mui-expanded": {
                minHeight: "100%",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowRightIcon />}
              sx={{
                minHeight: "100%",
                m: 0,
                px: "16px",
                py: openSideMenu ? "8px" : "16px",
                "& .MuiAccordionSummary-content.Mui-expanded": { m: 0 },
                "& .MuiAccordionSummary-content": { m: 0 },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  display: openSideMenu ? "flex" : "none",
                  "& .MuiSvgIcon-root": { fontSize: "2rem", color: "#747474" },
                },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "rotate(90deg)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: openSideMenu ? "flex-start" : "center",
                  gap: "8px",
                }}
              >
                <IconButton
                  sx={{
                    p: 0,
                    "& .MuiSvgIcon-root": {
                      color: "#747474",
                      fontSize: openSideMenu ? "1.6rem" : "2rem",
                    },
                  }}
                >
                  {sideMenuItem.icon}
                </IconButton>
                {openSideMenu ? (
                  <Typography sx={{ fontWeight: 550 }}>
                    {sideMenuItem.label}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List
                disablePadding
                sx={{
                  "& .MuiListItemButton-root": {
                    pl: "60px",
                    pr: 0,
                    py: "8px",
                    "&:hover": {
                      color: "#fff",
                    },
                  },
                  "& .Mui-selected": {
                    color: "#fff",
                  },
                }}
              >
                {sideMenuItem.subMenuItems.map((subMenuItem) => (
                  <ListItemButton
                    key={subMenuItem.label}
                    selected={selectedItemIndex === subMenuItem.label}
                    onClick={() =>
                      handleSelectedSubItem(subMenuItem, sideMenuItem.path)
                    }
                  >
                    <ListItemText
                      primary={subMenuItem.label}
                      sx={{
                        m: 0,
                        "& .MuiTypography-root": { fontWeight: 550 },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Drawer>
  );
}

export default SideMenu;
