import { Box } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useState } from "react";
import AddFormLayout from "../layouts/AddFormLayout";
import CustomStyledGeneralButton from "../components/_share/CustomStyledGeneralButton";

function WeekTimeFrame() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <Box>
      <MainHeadingLayout>Week Time Frame Setting</MainHeadingLayout>
      <MainButtonGroupLayout>
        <CustomStyledGeneralButton>
          Add
        </CustomStyledGeneralButton>
      </MainButtonGroupLayout>
    </Box>
  );
}

export default WeekTimeFrame;
