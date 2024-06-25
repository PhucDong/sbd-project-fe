import { Box, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddFormLayout from "../layouts/AddFormLayout";
import AddWeelTimeFrameForm from "../components/AddWeekTimeFrameForm";
import CachedIcon from "@mui/icons-material/Cached";
import { CustomStyledAddButton } from "../components/CustomStyledAddButton";
import MainTableLayout from "../components/MainTableLayout";

function WeekTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [weekTimeFrameData, setWeekTimeFrameData] = useState([]);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleWeekTimeFrameData = (formData) => {
    setWeekTimeFrameData([...weekTimeFrameData, { ...formData }]);
  };

  return (
    <Box>
      <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledAddButton
          onClick={handleOpenAddForm}
          startIcon={<AddIcon />}
        >
          Add
        </CustomStyledAddButton>

        <IconButton
          sx={{ p: 0, "&:hover": { backgroundColor: "transparent" } }}
          onClick={() => window.location.replace(window.location.href)}
        >
          <CachedIcon sx={{ fontSize: "2.1rem", color: "primary.main" }} />
        </IconButton>
      </MainButtonGroupLayout>
      <AddFormLayout
        openForm={openAddForm}
        handleCloseForm={handleCloseAddForm}
      >
        <AddWeekTimeFrameForm
          handleCloseForm={handleCloseAddForm}
          onChange={handleWeekTimeFrameData}
        />
      </AddFormLayout>
      <MainTableLayout
        weekTimeFrameData={weekTimeFrameData}
        setWeekTimeFrameData={setWeekTimeFrameData}
      />
    </Box>
  );
}

export default WeekTimeFrame;
