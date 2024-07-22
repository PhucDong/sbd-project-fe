import { useEffect, useMemo, useRef, useState } from "react";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import CustomStyledOperation from "../_share/CustomStyledOperation";
import AddFormLayout from "../../layouts/AddFormLayout";
import ModifyUpperDeptForm from "./ModifyUpperDeptForm";
import DeleteAlert from "../_share/DeleteAlert";

const cellContainerStyles = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
};

function UpperDepartmentTable(props) {
  const {
    upperDeptData,
    onChange,
    manageDeptList,
    handleModifiedFormData,
    handleFilteredData,
  } = props;
  const rowsRef = useRef([]);

  if (upperDeptData.current.length > 0) {
    const newUpperDeptData = [...upperDeptData.current];
    newUpperDeptData.forEach(
      (data) => (data.operations = ["Modify", "Delete"])
    );
    rowsRef.current = newUpperDeptData;
  } else {
    rowsRef.current = [];
  }

  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [departmentRow, setDepartmentRow] = useState([]);
  const selectedRowDataRef = useRef(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const columns = useMemo(
    () => [
      {
        field: "upperDeptName",
        headerName: "Upper Dept",
        flex: 0.75,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deptNameList",
        headerName: "Department",
        flex: 0.75,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <Box sx={cellContainerStyles}>
              {params.row.deptNameList.map((deptName, index) => (
                <Box key={index} sx={{ maxHeight: "100%" }}>
                  <Typography>{deptName}</Typography>
                </Box>
              ))}
            </Box>
          );
        },
      },
      {
        field: "deptCodeList",
        headerName: "Dept Code",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <Box sx={cellContainerStyles}>
              {params.row.deptCodeList.map((deptCode, index) => (
                <Box key={index} sx={{ maxHeight: "100%" }}>
                  <Typography>{deptCode}</Typography>
                </Box>
              ))}
            </Box>
          );
        },
      },
      {
        field: "deptPhoneList",
        headerName: "Dept Phone",
        flex: 0.75,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <Box sx={cellContainerStyles}>
              {params.row.deptPhoneList.map((deptPhone, index) => (
                <Box key={index} sx={{ maxHeight: "100%" }}>
                  <Typography>{deptPhone}</Typography>
                </Box>
              ))}
            </Box>
          );
        },
      },
      {
        field: "remark",
        headerName: "Remark",
        flex: 0.75,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "operations",
        headerName: "Operations",
        flex: 0.75,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {params.value?.map((operation, index) =>
                operation === "Modify" ? (
                  <CustomStyledOperation
                    key={index}
                    onClick={() => handleOpenModifyForm(params.row)}
                  >
                    {operation}
                  </CustomStyledOperation>
                ) : (
                  <CustomStyledOperation
                    key={index}
                    onClick={handleOpenDeleteAlert}
                  >
                    {operation}
                  </CustomStyledOperation>
                )
              )}
            </Box>
          );
        },
      },
    ],
    []
  );

  const handleOpenModifyForm = (rowData) => {
    selectedRowDataRef.current = rowData;
    setOpenModifyForm(true);
  };
  const handleCloseModifyForm = () => {
    setOpenModifyForm(false);
  };

  const handleOpenDeleteAlert = () => {
    setOpenDeleteAlert(true);
  };
  const handleCloseDeleteAlert = () => setOpenDeleteAlert(false);

  const handleDeleteUpperDept = () => {
    handleFilteredData(departmentRow[0]);
    handleCloseDeleteAlert();
  };

  // Check to display/hide Delete All button
  useEffect(() => {
    if (rowsRef.current.length > 0) {
      onChange(rowsRef.current.length === departmentRow.length);
    } else {
      onChange(false);
    }
  }, [onChange, departmentRow.length]);

  return (
    <>
      <DataGrid
        rows={rowsRef.current}
        columns={columns}
        getRowId={(row) => row.upperDeptName}
        columnHeaderHeight={44}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => "auto"}
        autoHeight
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setDepartmentRow(newRowSelectionModel);
        }}
        rowSelectionModel={departmentRow}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 12,
            },
          },
        }}
        pageSizeOptions={[12]}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{
          mt: "12px",
          borderRadius: "8px",
          width: "100%",
          "& .MuiDataGrid-scrollbarFiller": {
            display: "none",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            display: rowsRef.current.length === 0 && "none",
          },
          "& .MuiDataGrid-filler": { display: "none" },
          "& .MuiDataGrid-columnHeader": {
            p: 0,
            backgroundColor: "#F0F0F0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#70787A",
            fontWeight: 550,
            fontSize: "0.95rem",
            lineHeight: "100%",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "1rem",
            color: "info.light",
            py: "8px",
            width: "100%",
          },
          "& .MuiDataGrid-overlayWrapper": {
            height: "80px",
            width: "100%",
          },
          "& .MuiDataGrid-overlayWrapperInner": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "100%",
          },
        }}
      />
      <AddFormLayout
        openForm={openModifyForm}
        handleCloseForm={handleCloseModifyForm}
      >
        <ModifyUpperDeptForm
          upperDeptData={upperDeptData.current}
          manageDeptList={manageDeptList}
          selectedRowData={selectedRowDataRef.current}
          handleCloseForm={handleCloseModifyForm}
          onChange={handleModifiedFormData}
        />
      </AddFormLayout>
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteUpperDept}
        message="Do you want to delete this upper department?"
      />
    </>
  );
}

export default UpperDepartmentTable;
