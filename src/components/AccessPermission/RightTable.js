import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../utils/tableNoData";
import { useCallback, useEffect } from "react";

function RightTable(props) {
  const {
    selectedRowsRightTable,
    setSelectedRowsRightTable,
    selectedRowsLeftTable,
    setSelectedAllRows,
    authorizedUsers,
  } = props;

  const handleNewColumns = useCallback(() => {
    const columns = [
      {
        field: "userId",
        headerName: "User ID",
        flex: 1,
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
    ];
    if (authorizedUsers.length > 0) {
      authorizedUsers[0].doorAccessList.forEach((door, index) =>
        columns.push({
          field: `door${door.doorName}`,
          headerName: `Door ${door.doorName}`,
          flex: 0.5,
          headerAlign: "center",
          align: "center",
          valueGetter: () => {
            return door[`door${door.doorName}`];
          },
        })
      );
    }

    return columns;
  }, [authorizedUsers]);

  useEffect(() => {
    setSelectedAllRows([...selectedRowsLeftTable, ...selectedRowsRightTable]);
  }, [selectedRowsLeftTable, selectedRowsRightTable, setSelectedAllRows]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "success.main",
          px: "20px",
          py: "12px",
          borderRadius: "4px 4px 0 0",
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontSize: "1.3rem", color: "#fff" }}
        >
          Authorized List
        </Typography>
      </Box>
      <DataGrid
        columns={handleNewColumns()}
        rows={authorizedUsers}
        getRowId={(row) => row.userId}
        disableColumnMenu={true}
        disableColumnSorting={true}
        getRowHeight={() => 44}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRowsRightTable(newRowSelectionModel);
        }}
        rowSelectionModel={selectedRowsRightTable}
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

export default RightTable;
