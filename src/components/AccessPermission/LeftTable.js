import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import { useEffect } from "react";

const columns = [
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.75,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullName",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "department",
    headerName: "Department",
    flex: 0.75,
    headerAlign: "center",
    align: "center",
  },
];

function LeftTable(props) {
  const {
    selectedRowsLeftTable,
    setSelectedRowsLeftTable,
    selectedRowsRightTable,
    setSelectedAllRows,
    unAuthorizedUsers,
  } = props;

  useEffect(() => {
    setSelectedAllRows([...selectedRowsLeftTable, ...selectedRowsRightTable]);
  }, [selectedRowsLeftTable, selectedRowsRightTable, setSelectedAllRows]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "error.main",
          px: "20px",
          py: "12px",
          borderRadius: "4px 4px 0 0",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "1.3rem", color: "#fff" }}
        >
          Unauthorized List
        </Typography>
      </Box>

      <DataGrid
        columns={columns}
        rows={unAuthorizedUsers}
        getRowId={(row) => row.userId}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => 44}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRowsLeftTable(newRowSelectionModel);
        }}
        rowSelectionModel={selectedRowsLeftTable}
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
          "& .MuiDataGrid-scrollbarFiller": {
            display: "none",
          },
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
            fontSize: "0.9rem",
            color: "info.light",
            backgroundColor: "#fafafa",
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
    </>
  );
}

export default LeftTable;
