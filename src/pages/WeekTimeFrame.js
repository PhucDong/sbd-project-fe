import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddFormLayout from "../layouts/AddFormLayout";
import AddWeekTimeFrameForm from "../components/AddWeekTimeFrameForm";
import { CustomStyledAddButton } from "../components/_share/CustomStyledAddButton";

function WeekTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledAddButton startIcon={<AddIcon />}>
          Add
        </CustomStyledAddButton>
      </MainButtonGroupLayout>
    </Box>
  );
}

export default WeekTimeFrame;
