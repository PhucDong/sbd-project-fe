import { useEffect, useMemo, useRef, useState } from "react";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CustomStyledOperation from "../_share/CustomStyledOperation";
import AddFormLayout from "../../layouts/AddFormLayout";
import DeleteAlert from "../_share/DeleteAlert";
import CustomDayTimeFrameChip from "../DayTimeFrame/CustomDayTimeFrameChip";
import ModifyUserAccForm from "./ModifyUserAccForm";

function UserAccTable(props) {
  const {
    userAccData,
    onChange,
    manageFunctionModuleList,
    handleModifiedUserAccFormData,
    handleFilteredData,
  } = props;
  const rowsRef = useRef([]);

  if (userAccData.current.length > 0) {
    const newUserAccData = [...userAccData.current];
    newUserAccData.forEach((data) => (data.operations = ["Modify", "Delete"]));
    rowsRef.current = newUserAccData;
  } else {
    rowsRef.current = [];
  }

  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [userAccRow, setUserAccRow] = useState([]);
  const selectedRowDataRef = useRef(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "User ID",
        flex: 0.4,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "fullName",
        headerName: "Name",
        flex: 0.6,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "password",
        headerName: "Password",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "functionModuleList",
        headerName: "Funcion Module",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {params.value?.map((functionModule) => (
              <CustomDayTimeFrameChip
                key={functionModule}
                label={functionModule}
              />
            ))}
          </Box>
        ),
      },
      {
        field: "operations",
        headerName: "Operations",
        flex: 0.6,
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

  const handleRemoveUserAcc = () => {
    handleFilteredData(userAccRow[0]);
    handleCloseDeleteAlert();
  };

  // Check to display/hide Delete All button
  useEffect(() => {
    if (rowsRef.current.length > 0) {
      onChange(rowsRef.current.length === userAccRow.length);
    } else {
      onChange(false);
    }
  }, [onChange, userAccRow.length]);

  return (
    <>
      <DataGrid
        rows={rowsRef.current}
        columns={columns}
        getRowId={(row) => row.id}
        columnHeaderHeight={44}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => "auto"}
        autoHeight
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setUserAccRow(newRowSelectionModel);
        }}
        rowSelectionModel={userAccRow}
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
        <ModifyUserAccForm
          selectedRowData={selectedRowDataRef.current}
          handleCloseForm={handleCloseModifyForm}
          onChange={handleModifiedUserAccFormData}
          manageFunctionModuleList={manageFunctionModuleList}
        />
      </AddFormLayout>
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleRemoveUserAcc}
        message="Do you want to remove this user account from this table?"
      />
    </>
  );
}

export default UserAccTable;
