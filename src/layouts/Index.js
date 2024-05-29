import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Index() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default Index;
