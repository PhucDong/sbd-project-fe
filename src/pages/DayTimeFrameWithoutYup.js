import { Box, Button, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddFormLayout from "../layouts/AddFormLayout";
import AddDayTimeFrameForm from "../components/AddDayTimeFrameForm";
import {
  CustomStyledAddButton,
} from "../components/CustomStyledAddButton";
import CachedIcon from "@mui/icons-material/Cached";

function DayTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <MainHeadingLayout>Day Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledAddButton
          onClick={handleOpenAddForm}
          startIcon={<AddIcon />}
        >
          Add
        </CustomStyledAddButton>

        <IconButton
          sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
        >
          <CachedIcon sx={{ fontSize: "2.1rem", color: "primary.main" }} />
        </IconButton>

        {/* <AddFormLayout
          openAddForm={openAddForm}
          handleCloseAddForm={handleCloseAddForm}
        >
          <AddDayTimeFrameForm handleCloseAddForm={handleCloseAddForm} />
        </AddFormLayout> */}
      </MainButtonGroupLayout>
      <AddDayTimeFrameForm handleCloseAddForm={handleCloseAddForm} />
    </Box>
  );
}

export default DayTimeFrame;
