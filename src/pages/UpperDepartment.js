import { Box } from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import MainButtonGroupLayout from "../layouts/MainButtonGroupLayout";
import AddIcon from "@mui/icons-material/Add";
import { CustomStyledAddButton } from "../components/_share/CustomStyledAddButton";
import UpperDepartmentTable from "../components/UpperDepartment/UpperDepartmentTable";
import AddFormLayout from "../layouts/AddFormLayout";
import { useCallback, useRef, useState } from "react";
import AddUpperDeptForm from "../components/UpperDepartment/AddUpperDeptForm";
import CustomStyledDeleteAllButton from "../components/DayTimeFrame/CustomStyledDeleteAllButton";
import DeleteAlert from "../components/_share/DeleteAlert";

const manageDeptList = [
  {
    deptName: "Personnel",
    deptCode: "SBDP",
    deptPhone: "0145676688",
  },
  {
    deptName: "Human Resources",
    deptCode: "SBDHR",
    deptPhone: "0145676689",
  },
  {
    deptName: "Sales",
    deptCode: "SBDS",
    deptPhone: "0145676690",
  },
  {
    deptName: "Finance",
    deptCode: "SBDF",
    deptPhone: "0145676691",
  },
];

function UpperDepartment() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const upperDeptDataRef = useRef([]);
  const [areAllRowsChecked, setAreAllRowsChecked] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  const handleOpenDeleteAlert = () => setOpenDeleteAlert(true);
  const handleCloseDeleteAlert = () => setOpenDeleteAlert(false);

  const handleAreAllRowsChecked = useCallback((data) => {
    setAreAllRowsChecked(data);
  }, []);

  const handleUpperDeptData = (formData) => {
    upperDeptDataRef.current = [...upperDeptDataRef.current, formData];
  };

  const handleModifiedDeptData = (modifiedFormData) => {
    if (upperDeptDataRef.current.length > 0) {
      upperDeptDataRef.current.forEach((data, index) => {
        if (data.upperDeptName === modifiedFormData.upperDeptName) {
          upperDeptDataRef.current[index] = modifiedFormData;
        }
      });
    }
  };

  const handleDeleteAllUpperDepts = () => {
    upperDeptDataRef.current = [];
    handleCloseDeleteAlert();
  };

  const handleFilteredUpperDept = (selectedUpperDeptName) => {
    const filteredUpperDeptData = upperDeptDataRef.current.filter(
      (data) => data.upperDeptName !== selectedUpperDeptName
    );
    upperDeptDataRef.current = filteredUpperDeptData;
  };

  return (
    <Box>
      <MainHeadingLayout>Upper Department</MainHeadingLayout>
      <MainButtonGroupLayout>
        <Box sx={{ display: "flex", gap: "4px" }}>
          <CustomStyledAddButton
            startIcon={<AddIcon />}
            onClick={handleOpenAddForm}
          >
            Add
          </CustomStyledAddButton>
          {areAllRowsChecked && (
            <CustomStyledDeleteAllButton onClick={handleOpenDeleteAlert} />
          )}
        </Box>
      </MainButtonGroupLayout>
      <AddFormLayout
        openForm={openAddForm}
        handleCloseForm={handleCloseAddForm}
      >
        <AddUpperDeptForm
          manageDeptList={manageDeptList}
          upperDeptData={upperDeptDataRef}
          handleCloseForm={handleCloseAddForm}
          onChange={handleUpperDeptData}
        />
      </AddFormLayout>
      <UpperDepartmentTable
        manageDeptList={manageDeptList}
        upperDeptData={upperDeptDataRef}
        onChange={handleAreAllRowsChecked}
        handleModifiedFormData={handleModifiedDeptData}
        handleFilteredData={handleFilteredUpperDept}
      />
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteAllUpperDepts}
        message="Do you want to delete all upper departments?"
      />
    </Box>
  );
}

export default UpperDepartment;
