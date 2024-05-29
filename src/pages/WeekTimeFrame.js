import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddFormLayout from "../layouts/AddFormLayout";
import AddWeekTimeFrameForm from "../components/AddWeekTimeFrameForm";

function WeekTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
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

        <AddFormLayout
          openAddForm={openAddForm}
          handleCloseAddForm={handleCloseAddForm}
        >
          <AddWeekTimeFrameForm handleCloseAddForm={handleCloseAddForm} />
        </AddFormLayout>
      </MainButtonGroupLayout>
    </Box>
  );
}

export default WeekTimeFrame;
