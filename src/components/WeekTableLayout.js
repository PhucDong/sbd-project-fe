import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomStyledOperation from "./CustomStyledOperation";
import { useEffect, useState } from "react";
import AddFormLayout from "../layouts/AddFormLayout";
import ModifyDayTimeFrameForm from "./ModifyDayTimeFrameForm";
import DeleteAlert from "./DeleteAlert";

function WeekTableLayout(props) {
    const { weekTimeFrameData, setWeekTimeFrameData } = props;
    const [rows, setRows] = useState(
        weekTimeFrameData?.map((data) => (data.operations = ["Modify", "Delete"]))
    );
    const [selectedRow, setSelectedRow] = useState(null);
    const [openModifyForm, setOpenModifyForm] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

    const handleOpenDeleteAlert = (row) => {
        setOpenDeleteAlert(true);
        setSelectedRow(row);
    };
    const handleCloseDeleteAlert = () => {
        setOpenDeleteAlert(false);
    };
    const handleOpenModifyForm = (row) => {
        selectedRow(row);
        setOpenModifyForm(true);
    };
    const handleCloseModifyForm = () => {
        setOpenModifyForm(false);
        setSelectedRow(null);
    };

    const handleUpdatedWeekTimeFrameData = (updatedData) => {
        setRows(
            rows?.map((row) =>
                row.serialNumber === updatedData.serialNumber
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
            field: "weekTimeFrameName",
            headerName: "Name",
            width: 150,
            headerAlign: "center",
            headerClassName: "header-cell",
            align: "center",
        },
        {
            field: "weekTimeFrames",
            headerName: "Weekday",
            flex: 1,
            headerAlign: "center",
            headerClassName: "header-cell",
            align: "center",
        },
        {
            field: "operations",
            headerName: "Operations",
            width: 240,
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

    useEffect(() => {
        if (weekTimeFrameData.length > 0) {
            setRows(weekTimeFrameData);
        }
    }, [weekTimeFrameData]);

    return (
        <>
            {weekTimeFrameData.length > 0 ? (
                <>
                    <Box sx={{ height: "auto", width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            getRowId={(row) => row.serialNumber}
                            columnHeaderHeight={44}
                            disableColumnMenu={true}
                            disableColumnSorting={true}
                            autoHeight
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            sx={{
                                mt: "12px",
                                borderRadius: "8px",
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
                                    fontSize: "1rem",
                                    color: "info.light",
                                    backgroundColor: "#fafafa",
                                    py: "8px",
                                },
                            }}
                        />
                    </Box>
                    <AddFormLayout
                        openForm={openModifyForm}
                        handleCloseForm={handleCloseModifyForm}
                    >
                        <ModifyDayTimeFrameForm
                            selectedRowData={selectedRow}
                            openDeleteAlert={openDeleteAlert}
                            handleOpenDeleteAlert={handleOpenDeleteAlert}
                            handleCloseDeleteAlert={handleCloseDeleteAlert}
                            handleCloseModifyForm={handleCloseModifyForm}
                            onChange={handleUpdatedWeekTimeFrameData}
                            rowsData={rows}
                            setRowsData={setRows}
                            setDayTimeFrameData={setWeekTimeFrameData}
                        />
                    </AddFormLayout>
                    <DeleteAlert
                        openDeleteAlert={openDeleteAlert}
                        handleCloseDeleteAlert={handleCloseDeleteAlert}
                        selectedRowData={selectedRow}
                        rowsData={rows}
                        setRowsData={setRows}
                        setDayTimeFrameData={setDayTimeFrameData}
                    />
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default WeekTableLayout;