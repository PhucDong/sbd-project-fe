import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomStyledOperation from "../_share/CustomStyledOperation";
import CustomDayTimeFrameChip from "./CustomDayTimeFrameChip";
import { useEffect, useState } from "react";
import AddFormLayout from "../../layouts/AddFormLayout";
import ModifyDayTimeFrameForm from "./ModifyDayTimeFrameForm";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import DeleteAlert from "../_share/DeleteAlert";

function DayTimeFrameTable(props) {
  const { dayTimeFrameData, setDayTimeFrameData, onChange } = props;
  const [rows, setRows] = useState(
    dayTimeFrameData.length > 0
      ? dayTimeFrameData.map((data) => (data.operations = ["Modify", "Delete"]))
      : []
  );
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [dayTimeFrameRow, setDayTimeFrameRow] = useState([]);

  const handleOpenDeleteAlert = (row) => {
    setOpenDeleteAlert(true);
    setSelectedRow(row);
  };
  const handleCloseDeleteAlert = () => {
    setOpenDeleteAlert(false);
  };

  const handleOpenModifyForm = (row) => {
    setSelectedRow(row);
    setOpenModifyForm(true);
  };
  const handleCloseModifyForm = () => {
    setOpenModifyForm(false);
    setSelectedRow(null);
  };

  const handleUpdatedDayTimeFrameData = (updatedData) => {
    console.log("Updated data: ", updatedData);
    setDayTimeFrameData(
      rows.map((row) =>
        row.dayTimeFrameName === selectedRow.dayTimeFrameName
          ? { ...updatedData, operations: ["Modify", "Delete"] }
          : row
      )
    );
  };

  const columns = [
    {
      field: "serialNumber",
      headerName: "Serial No.",
      flex: 1,
      headerAlign: "center",
      headerClassName: "header-cell",
      align: "center",
    },
    {
      field: "dayTimeFrameName",
      headerName: "Name",
      flex: 0.75,
      headerAlign: "center",
      headerClassName: "header-cell",
      align: "center",
    },
    {
      field: "dayTimeFrames",
      headerName: "Time Frames",
      flex: 1,
      headerAlign: "center",
      headerClassName: "header-cell",
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
          {params.value?.map((dayTimeFrame) => (
            <CustomDayTimeFrameChip
              key={dayTimeFrame.dayTimeFrameIndex}
              label={`${
                dayTimeFrame.startingTime
                  .format("DD/MM/YYYY HH:mm")
                  .split(" ")[1]
              } - ${
                dayTimeFrame.endingTime.format("DD/MM/YYYY HH:mm").split(" ")[1]
              }`}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "operations",
      headerName: "Operations",
      flex: 0.75,
      headerAlign: "center",
      headerClassName: "header-cell",
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
                  onClick={() => handleOpenDeleteAlert(params.row)}
                >
                  {operation}
                </CustomStyledOperation>
              )
            )}
          </Box>
        );
      },
    },
  ];

  const handleDeleteDayTimeFrame = () => {
    const filteredRowsData = rows.filter(
      (rowData) => rowData.dayTimeFrameName !== selectedRow.dayTimeFrameName
    );
    setRows(filteredRowsData);
    setDayTimeFrameData(filteredRowsData);
    handleCloseDeleteAlert();
  };

  useEffect(() => {
    if (dayTimeFrameData.length > 0) {
      setRows(dayTimeFrameData);
    } else {
      setRows([]);
    }
  }, [dayTimeFrameData]);

  useEffect(() => {
    if (rows.length > 0) {
      onChange(rows.length === dayTimeFrameRow.length);
    } else {
      onChange(false);
    }
  }, [onChange, dayTimeFrameRow.length, rows.length]);

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.dayTimeFrameName}
        columnHeaderHeight={44}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => 52}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setDayTimeFrameRow(newRowSelectionModel);
        }}
        rowSelectionModel={dayTimeFrameRow}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{
          mt: "12px",
          borderRadius: "8px",
          "& .MuiDataGrid-scrollbarFiller": {
            display: "none",
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
        <ModifyDayTimeFrameForm
          selectedRowData={selectedRow}
          handleCloseModifyForm={handleCloseModifyForm}
          onChange={handleUpdatedDayTimeFrameData}
          dayTimeFrameData={dayTimeFrameData}
        />
      </AddFormLayout>
      <DeleteAlert
        openDeleteAlert={openDeleteAlert}
        handleCloseDeleteAlert={handleCloseDeleteAlert}
        onClick={handleDeleteDayTimeFrame}
        message="Do you want to delete this day time frame?"
      />
    </>
  );
}

export default DayTimeFrameTable;
