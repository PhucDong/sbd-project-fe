import { Box } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import CustomStyledGeneralButton from "../components/_share/CustomStyledGeneralButton";
import CustomStyledDeleteAllButton from "../components/DayTimeFrame/CustomStyledDeleteAllButton";
import { useCallback, useRef, useState } from "react";
import AddFormLayout from "../layouts/AddFormLayout";
import AddUserAccForm from "../components/UserAccount/AddUserAccForm";
import UserAccTable from "../components/UserAccount/UserAccTable";
import DeleteAlert from "../components/_share/DeleteAlert";

const manageFunctionModuleList = [
  "Staff Management",
  "Attendance Management",
  "System Settings",
  "Access Management",
];

const userAccountList = [
  {
    id: "SBD1014",
    fullName: "Dong Vu Minh Phuc",
    email: "dvmp1014@sbd.com",
    password: "sbd@1014",
  },
  {
    id: "SBD1015",
    fullName: "Tran Thi Nha Nam",
    email: "nhanam@sbd.com",
    password: "sbd@1015",
  },
  {
    id: "SBD1016",
    fullName: "Luong Xuan Bac",
    email: "xuanbac@sbd.com",
    password: "sbd@1016",
  },
  {
    id: "SBD1017",
    fullName: "Nguyen Nha Uyen",
    email: "nhauyen@sbd.com",
    password: "sbd@1017",
  },
];

function UserAccount() {
  const [openAddUserAccForm, setOpenAddUserAccForm] = useState(false);
  const [areAllUserAccsChecked, setAreAllUserAccsChecked] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const userAccDataRef = useRef([]);

  const handleOpenAddUserAccForm = () => setOpenAddUserAccForm(true);
  const handleCloseAddUserAccForm = () => setOpenAddUserAccForm(false);

  const handleOpenDeleteAlert = () => setOpenDeleteAlert(true);
  const handleCloseDeleteAlert = () => setOpenDeleteAlert(false);

  const handleUserAccData = useCallback((addFormData) => {
    const currentUserData = [...userAccDataRef.current];

    userAccountList.forEach((acc) => {
      if (acc.fullName === addFormData.fullName) {
        currentUserData.push({
          ...acc,
          functionModuleList: addFormData.functionModuleList,
          description: addFormData.description,
        });
      }
    });

    userAccDataRef.current = currentUserData;
  }, []);

  const handleAreAllUserAccsChecked = useCallback((data) => {
    setAreAllUserAccsChecked(data);
  }, []);

  const handleRemoveUserAccountList = () => {
    userAccDataRef.current = [];
    handleCloseDeleteAlert();
  };

  const handleModifiedUserAccFormData = (modifiedFormData) => {
    userAccDataRef.current.forEach((acc, index) => {
      if (acc.id === modifiedFormData.id) {
        userAccDataRef.current[index] = modifiedFormData;
      }
    });
  };

  const handleFilteredData = (userAccId) => {
    const filteredUserAccData = userAccDataRef.current.filter(
      (acc) => acc.id !== userAccId
    );
    userAccDataRef.current = filteredUserAccData;
  };

  return (
    <Box>
      <MainHeadingLayout>User Account</MainHeadingLayout>
      <MainButtonGroupLayout>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <CustomStyledGeneralButton
            onClick={handleOpenAddUserAccForm}
          >
            Add
          </CustomStyledGeneralButton>
          {areAllUserAccsChecked && (
            <CustomStyledDeleteAllButton onClick={handleOpenDeleteAlert} />
          )}
        </Box>
      </MainButtonGroupLayout>
      <AddFormLayout
        openForm={openAddUserAccForm}
        handleCloseForm={handleCloseAddUserAccForm}
      >
        <AddUserAccForm
          userAccountList={userAccountList}
          manageFunctionModuleList={manageFunctionModuleList}
          handleCloseForm={handleCloseAddUserAccForm}
          onChange={handleUserAccData}
        />
      </AddFormLayout>
      <UserAccTable
        userAccData={userAccDataRef}
        onChange={handleAreAllUserAccsChecked}
        manageFunctionModuleList={manageFunctionModuleList}
        handleModifiedUserAccFormData={handleModifiedUserAccFormData}
        handleFilteredData={handleFilteredData}
      />
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleRemoveUserAccountList}
        message="Do you want to remove all user accounts from this table?"
      />
    </Box>
  );
}

export default UserAccount;
