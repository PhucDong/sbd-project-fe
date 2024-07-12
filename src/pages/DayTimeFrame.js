import { Box, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useCallback, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddFormLayout from "../layouts/AddFormLayout";
import AddDayTimeFrameForm from "../components/DayTimeFrame/AddDayTimeFrameForm";
import CachedIcon from "@mui/icons-material/Cached";
import { CustomStyledAddButton } from "../components/_share/CustomStyledAddButton";
import DayTimeFrameTable from "../components/DayTimeFrame/DayTimeFrameTable";
import CustomStyledDeleteAllButton from "../components/DayTimeFrame/CustomStyledDeleteAllButton";
import DeleteAlert from "../components/_share/DeleteAlert";

function DayTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [dayTimeFrameData, setDayTimeFrameData] = useState([]);
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };
  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleDayTimeFrameData = (formData) => {
    setDayTimeFrameData([...dayTimeFrameData, { ...formData }]);
  };

  const handleAreAllRowsSelected = useCallback((data) => {
    setAreAllRowsSelected(data);
  }, []);

  const handleDeleteAllDayTimeFrames = () => {
    setDayTimeFrameData([]);
    handleCloseDeleteAlert();
  };

  return (
    <Box>
      <MainHeadingLayout>Day Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        {/* Add new data to the table */}
        <Box sx={{ display: "flex", gap: "4px" }}>
          <CustomStyledAddButton
            onClick={handleOpenAddForm}
            startIcon={<AddIcon />}
          >
            Add
          </CustomStyledAddButton>
          {areAllRowsSelected && (
            <CustomStyledDeleteAllButton onClick={handleOpenDeleteAlert} />
          )}
        </Box>

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
        onChange={handleAreAllRowsSelected}
      />
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteAllDayTimeFrames}
        message="Do you want to delete all day time frames?"
      />
    </Box>
  );
}

export default DayTimeFrame;
