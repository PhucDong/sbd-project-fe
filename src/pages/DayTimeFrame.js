import { Box, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddFormLayout from "../layouts/AddFormLayout";
import AddDayTimeFrameForm from "../components/DayTimeFrame/AddDayTimeFrameForm";
import CachedIcon from "@mui/icons-material/Cached";
import { CustomStyledAddButton } from "../components/_share/CustomStyledAddButton";
import DayTimeFrameTable from "../components/DayTimeFrameTable";

function DayTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [dayTimeFrameData, setDayTimeFrameData] = useState([]);
  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleDayTimeFrameData = (formData) => {
    setDayTimeFrameData([...dayTimeFrameData, { ...formData }]);
  };

  return (
    <Box>
      <MainHeadingLayout>Day Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        {/* Add new data to the table */}
        <CustomStyledAddButton
          onClick={handleOpenAddForm}
          startIcon={<AddIcon />}
        >
          Add
        </CustomStyledAddButton>

        {/* Refresh to fetch newest data */}
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
        <AddDayTimeFrameForm
          handleCloseForm={handleCloseAddForm}
          onChange={handleDayTimeFrameData}
          dayTimeFrameData={dayTimeFrameData}
        />
      </AddFormLayout>
      <DayTimeFrameTable
        dayTimeFrameData={dayTimeFrameData}
        setDayTimeFrameData={setDayTimeFrameData}
      />
    </Box>
  );
}

export default DayTimeFrame;
