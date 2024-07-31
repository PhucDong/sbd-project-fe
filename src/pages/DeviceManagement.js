import { Box, IconButton } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import { useCallback, useRef, useState } from "react";
import CustomStyledDeleteAllButton from "../components/DayTimeFrame/CustomStyledDeleteAllButton";
import MainSearchBarLayout from "../layouts/MainSearchBarLayout";
import CustomStyledAddButton from "../components/_share/CustomStyledGeneralButton";
import AddFormLayout from "../layouts/AddFormLayout";
import AddDeviceForm from "../components/DeviceManagement/AddDeviceForm";
import DeviceTable from "../components/DeviceManagement/DeviceTable";
import DeleteAlert from "../components/_share/DeleteAlert";
import CachedIcon from "@mui/icons-material/Cached";

const deviceTypeList = [
  "Double-door two way",
  "Four-door single way",
  "Access Control Machine",
  "Attendance Machine",
  "Face Attendance Machine",
  "Palm Attendance Machine",
  "Palm Access Control Machine",
];

function DeviceManagement() {
  const [openAddDeviceForm, setOpenAddDeviceForm] = useState(false);
  const [areAllDeviceChecked, setAreAllDeviceChecked] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const deviceDataRef = useRef([]);

  const handleOpenAddDeviceForm = () => setOpenAddDeviceForm(true);
  const handleCloseAddDeviceForm = () => setOpenAddDeviceForm(false);

  const handleOpenDeleteAlert = () => setOpenDeleteAlert(true);
  const handleCloseDeleteAlert = () => setOpenDeleteAlert(false);

  const handleDeviceData = useCallback((addFormData) => {
    deviceDataRef.current = [...deviceDataRef.current, addFormData];
  }, []);

  const handleAreAllDeviceChecked = useCallback((data) => {
    setAreAllDeviceChecked(data);
  }, []);

  const handleDeleteAllSelectedDevice = () => {
    deviceDataRef.current = [];
    handleCloseDeleteAlert();
  };

  const handleModifiedDeviceFormData = (data) => {
    deviceDataRef.current.forEach((evice, index) => {
      if (
        evice.deviceSerialNumber === data.selectedRowData.deviceSerialNumber
      ) {
        deviceDataRef.current[index] = data.formattedFormData;
      }
    });
  };

  const handleFilteredDeviceData = (selectedDeviceSerialNumber) => {
    deviceDataRef.current = deviceDataRef.current.filter(
      (device) => device.deviceSerialNumber !== selectedDeviceSerialNumber
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <MainHeadingLayout>Device Management</MainHeadingLayout>
      <MainSearchBarLayout />
      <MainButtonGroupLayout>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <CustomStyledAddButton onClick={handleOpenAddDeviceForm}>
            Add
          </CustomStyledAddButton>
          {areAllDeviceChecked && (
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
        openForm={openAddDeviceForm}
        handleCloseForm={handleCloseAddDeviceForm}
      >
        <AddDeviceForm
          deviceData={deviceDataRef}
          deviceTypeList={deviceTypeList}
          handleCloseForm={handleCloseAddDeviceForm}
          onChange={handleDeviceData}
        />
      </AddFormLayout>
      <DeviceTable
        deviceData={deviceDataRef}
        onChange={handleAreAllDeviceChecked}
        handleModifiedDeviceFormData={handleModifiedDeviceFormData}
        deviceTypeList={deviceTypeList}
        handleFilteredDeviceData={handleFilteredDeviceData}
      />
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteAllSelectedDevice}
        message="Do you want to delete all these selected devices?"
      />
    </Box>
  );
}

export default DeviceManagement;
