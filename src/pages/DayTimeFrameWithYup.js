import { Box, Button, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddFormLayout from "../layouts/AddFormLayout";
import AddDayTimeFrameForm from "../components/AddDayTimeFrameForm";
import CachedIcon from "@mui/icons-material/Cached";

function DayTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <MainHeadingLayout>Day Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <Button
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "success.main",
            px: "20px",
            py: "8px",
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
              backgroundColor: "success.main",
            },
          }}
          onClick={handleOpenAddForm}
        >
          Add
        </Button>

        <IconButton
          sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
        >
          <CachedIcon sx={{ fontSize: "2.1rem", color: "primary.main" }} />
        </IconButton>
      </MainButtonGroupLayout>
      <AddFormLayout
        openAddForm={openAddForm}
        handleCloseAddForm={handleCloseAddForm}
      >
        <AddDayTimeFrameForm handleCloseAddForm={handleCloseAddForm} />
      </AddFormLayout>
    </Box>
  );
}

export default DayTimeFrame;
