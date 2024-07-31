import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CustomStyledOperation from "../_share/CustomStyledOperation";
import AddFormLayout from "../../layouts/AddFormLayout";
import DeleteAlert from "../_share/DeleteAlert";
import ModifyDeviceForm from "./ModifyDeviceForm";

function DeviceTable(props) {
  const {
    deviceData,
    onChange,
    deviceTypeList,
    handleModifiedDeviceFormData,
    handleFilteredDeviceData,
  } = props;
  const rowsRef = useRef([]);

  if (deviceData.current.length > 0) {
    const newDeviceData = [...deviceData.current];
    newDeviceData.forEach(
      (data) => (data.operations = ["Order List", "Modify", "Delete"])
    );
    rowsRef.current = newDeviceData;
  } else {
    rowsRef.current = [];
  }

  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [deviceRow, setDeviceRow] = useState([]);
  const selectedRowDataRef = useRef(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleOpenModifyForm = (rowData) => {
    selectedRowDataRef.current = rowData;
    setOpenModifyForm(true);
  };
  const handleCloseModifyForm = () => {
    setOpenModifyForm(false);
  };

  const handleOpenDeleteAlert = (rowData) => {
    selectedRowDataRef.current = rowData;
    setOpenDeleteAlert(true);
  };
  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const getRenderedCell = useCallback((operation, index, params) => {
    if (operation === "Order List") {
      return (
        <CustomStyledOperation key={index}>{operation}</CustomStyledOperation>
      );
    } else if (operation === "Modify") {
      return (
        <CustomStyledOperation
          key={index}
          onClick={() => handleOpenModifyForm(params.row)}
        >
          {operation}
        </CustomStyledOperation>
      );
    } else if (operation === "Delete") {
      return (
        <CustomStyledOperation
          key={index}
          onClick={() => handleOpenDeleteAlert(params.row)}
        >
          {operation}
        </CustomStyledOperation>
      );
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "deviceSerialNumber",
        headerName: "Serial No.",
        // flex: 0.5,
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deviceName",
        headerName: "Device Name",
        // flex: 0.5,
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deviceModel",
        headerName: "Model",
        // flex: 0.5,
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deviceType",
        headerName: "Type",
        // flex: 0.5,
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "deviceIP",
        headerName: "IP Address",
        // flex: 0.5,
        width: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "operations",
        headerName: "Operations",
        // flex: 1,
        width: 300,
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
                getRenderedCell(operation, index, params)
              )}
            </Box>
          );
        },
      },
    ],
    [getRenderedCell]
  );

  const handleDeleteDevice = () => {
    handleFilteredDeviceData(selectedRowDataRef.current.deviceSerialNumber);
    handleCloseDeleteAlert();
  };

  // Check to display/hide Delete All button
  useEffect(() => {
    if (rowsRef.current.length > 0) {
      onChange(rowsRef.current.length === deviceRow.length);
    } else {
      onChange(false);
    }
  }, [onChange, deviceRow.length]);

  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <DataGrid
        rows={rowsRef.current}
        columns={columns}
        getRowId={(row) => row.deviceSerialNumber}
        columnHeaderHeight={44}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => "auto"}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setDeviceRow(newRowSelectionModel);
        }}
        rowSelectionModel={deviceRow}
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
        <ModifyDeviceForm
          selectedRowData={selectedRowDataRef.current}
          handleCloseForm={handleCloseModifyForm}
          onChange={handleModifiedDeviceFormData}
          deviceTypeList={deviceTypeList}
          deviceData={deviceData}
        />
      </AddFormLayout>
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteDevice}
        message="Do you want to delete this device?"
      />
    </Box>
  );
}

export default DeviceTable;
