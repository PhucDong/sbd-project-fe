import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const CustomStyledAccessPermission = styled(Box)(({ theme }) => ({
  "& .big-flex": {
    display: "flex",
    alignItems: "flex-start",
  },
  "& .first-row": {
    marginBottom: "12px",
  },
  "& .small-flex": {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "8px",
    flex: 1,
  },
  "& .big-flex label": {
    color: theme.palette.primary.main,
    flex: 0.5,
    textAlign: "right",
    fontWeight: 550,
  },
  "& .big-flex .select": {
    flex: 0.5,
  },
  "& .MuiInputBase-root": {
    height: "48px",
    borderRadius: "8px",
    "& .MuiOutlinedInput-input": {
      padding: "8px 0 8px 20px",
      color: theme.palette.info.main,
    },
    "& .MuiIconButton-root": {
      padding: 0,
      margin: 0,
    },
  },
  "& .MuiFormHelperText-root": {
    margin: "0 8px",
    marginTop: "4px",
  },
}));

const aList = [
  {
    deviceName: "a1",
    serialNumber: "jfkejkfjf",
    dayTimeFrameName: "All Day",
  },
  {
    deviceName: "a2",
    serialNumber: "abcfffgg",
    dayTimeFrameName: "Part Time",
  },
  {
    deviceName: "a3",
    serialNumber: "fgrgeggr",
    dayTimeFrameName: "All Day",
  },
  {
    deviceName: "a4",
    serialNumber: "gutuuyuyu",
    dayTimeFrameName: "Not In",
  },
];

const accessDeviceList = [
  {
    startDate: "18/06/2024",
    endDate: "18/06/2024",
    accessDevices: [
      {
        serialNumber: "a1",
        dayTimeFrameName: "All Day",
      },
      {
        serialNumber: "a2",
        dayTimeFrameName: "Part Time",
      },
      {
        serialNumber: "a3",
        dayTimeFrameName: "All Day",
      },
    ],
    unAuthorizedUsers: [
      {
        userId: 1,
        fullName: "Minh Phuc",
        department: "R&D",
      },
      {
        userId: 2,
        fullName: "Thanh Xuan",
        department: "Marketing",
      },
      {
        userId: 3,
        fullName: "Tra Giang",
        department: "Sales",
      },
      {
        userId: 4,
        fullName: "Tuan Tu",
        department: "Sales",
      },
    ],
  },
  {
    startDate: "18/06/2024",
    endDate: "20/06/2024",
    accessDevices: [
      {
        serialNumber: "a1",
        dayTimeFrameName: "All Day",
      },
      {
        serialNumber: "a2",
        dayTimeFrameName: "Part Time",
      },
      {
        serialNumber: "a3",
        dayTimeFrameName: "All Day",
      },
      {
        serialNumber: "a4",
        dayTimeFrameName: "Not In",
      },
      {
        serialNumber: "a5",
        dayTimeFrameName: "Part Time",
      },
    ],
    unAuthorizedUsers: [
      {
        userId: 1,
        fullName: "Minh Phuc",
        department: "R&D",
      },
      {
        userId: 2,
        fullName: "Thanh Xuan",
        department: "Marketing",
      },
      {
        userId: 3,
        fullName: "Tra Giang",
        department: "Sales",
      },
      {
        userId: 4,
        fullName: "Tuan Tu",
        department: "Sales",
      },
      {
        userId: 5,
        fullName: "Thu Cat",
        department: "Developer",
      },
      {
        userId: 6,
        fullName: "Xuan Truong",
        department: "Developer",
      },
    ],
  },
];

function AccessPermission() {
  const [accessStartingDate, setAccessStartingDate] = useState(dayjs("null"));
  const [accessEndingDate, setAccessEndingDate] = useState(dayjs("null"));
  const [accessDevice, setAccessDevice] = useState("");
  const [doorStatus, setDoorStatus] = useState("");
  const [openAccessDeviceDropdownMenu, setOpenAccessDeviceDropdownMenu] =
    useState(false);
  const [openDoorDropdownMenu, setOpenDoorDropdownMenu] = useState(false);

  const handleChangeAccessStartingDate = (newAccessStartingDate) => {
    setAccessStartingDate(newAccessStartingDate);
  };

  const handleChangeAccessEndingDate = (newAccessEndingDate) => {
    setAccessEndingDate(newAccessEndingDate);
  };

  const handleCloseAccessDeviceDropdownMenu = () =>
    setOpenAccessDeviceDropdownMenu(false);
  const handleOpenAccessDeviceDropdownMenu = () =>
    setOpenAccessDeviceDropdownMenu(true);

  const handleCloseDoorDropdownMenu = () => setOpenDoorDropdownMenu(false);
  const handleOpenDoorDropdownMenu = () => setOpenDoorDropdownMenu(true);

  const handleChangeAccessDevice = (e) => {
    console.log("Access device: ", e.target.value);
    setAccessDevice(e.target.value);
  };

  const handleChangeDoorStatus = (e) => {
    console.log("Door status: ", e.target.value);
    setDoorStatus(e.target.value);
  };

  // useEffect(() => {
  //   if (cleared) {
  //     const timeout = setTimeout(() => {
  //       setCleared(false);
  //     }, 1500);

  //     return () => clearTimeout(timeout);
  //   }
  //   return () => {};
  // }, [cleared]);

  return (
    <CustomStyledAccessPermission>
      <MainHeadingLayout>Permission Assignment</MainHeadingLayout>
      <Button
        sx={{
          textTransform: "capitalize",
          backgroundColor: "secondary.main",
          px: "20px",
          py: "8px",
          mb: "32px",
          borderRadius: "20px",
          fontWeight: 600,
          lineHeight: "100%",
          fontSize: "1.1rem",
          color: "#fff",
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        View User Permission
      </Button>

      <Box className="big-flex first-row">
        <Box className="small-flex">
          <Box component="label" htmlFor="access-start-date">
            Start Date
          </Box>
          <DatePicker
            className="select"
            value={accessStartingDate}
            onChange={handleChangeAccessStartingDate}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                id: "access-start-date",
                error: !accessStartingDate.isValid() && true,
                helperText:
                  !accessStartingDate.isValid() && "Please input start date.",
              },
            }}
          />
        </Box>

        <Box className="small-flex">
          <Box component="label" htmlFor="access-end-date">
            End Date
          </Box>
          <DatePicker
            className="select"
            value={accessEndingDate}
            onChange={handleChangeAccessEndingDate}
            format="DD/MM/YYYY"
            minDate={accessStartingDate}
            slotProps={{
              textField: {
                id: "access-end-date",
                error: !accessEndingDate.isValid() && true,
                helperText:
                  !accessEndingDate.isValid() && "Please input end date.",
              },
            }}
          />
        </Box>
      </Box>

      <Box className="big-flex">
        {accessDeviceList.map(
          (option, index) =>
            option.startDate === accessStartingDate.format("DD/MM/YYYY") &&
            option.endDate === accessEndingDate.format("DD/MM/YYYY") && (
              <Box key={index} className="small-flex">
                <Box
                  component="label"
                  id="access-device-label"
                  htmlFor="access-device"
                >
                  Access Device
                </Box>
                <TextField
                  className="select"
                  name="accessDevice"
                  select
                  hiddenLabel
                  value={accessDevice}
                  onChange={handleChangeAccessDevice}
                  inputProps={{ id: "access-device" }}
                  SelectProps={{
                    open: openAccessDeviceDropdownMenu,
                    onClose: handleCloseAccessDeviceDropdownMenu,
                    onOpen: handleOpenAccessDeviceDropdownMenu,
                    IconComponent: KeyboardArrowRightIcon,
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      transform:
                        openAccessDeviceDropdownMenu && "rotate(90deg)",
                    },
                  }}
                >
                  {option.accessDevices.map((accessDevice, index) => (
                    <MenuItem key={index} value={accessDevice.serialNumber}>
                      {accessDevice.serialNumber}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )
        )}

        {/* <Box className="small-flex">
          <Box component="label" id="door-device-label" htmlFor="door-device">
            Door 1
          </Box>
          <TextField
            className="select"
            name="doorDevice"
            required
            select
            hiddenLabel
            value={doorStatus}
            onChange={handleChangeDoorStatus}
            inputProps={{ id: "door-device" }}
            SelectProps={{
              open: openDoorDropdownMenu,
              onClose: handleCloseDoorDropdownMenu,
              onOpen: handleOpenDoorDropdownMenu,
              IconComponent: KeyboardArrowRightIcon,
            }}
            sx={{
              "& .MuiSvgIcon-root": {
                transform: openDoorDropdownMenu && "rotate(90deg)",
              },
            }}
          >
            {aList.map((option, index) => (
              <MenuItem key={index} value={option.dayTimeFrameName}>
                {option.dayTimeFrameName}
              </MenuItem>
            ))}
          </TextField>
        </Box> */}

        {accessDeviceList.map(
          (option, index) =>
            option.startDate === accessStartingDate.format("DD/MM/YYYY") &&
            option.endDate === accessEndingDate.format("DD/MM/YYYY") && (
              <Box key={index} className="small-flex">
                <Box
                  component="label"
                  id="door-device-label"
                  htmlFor="door-device"
                >
                  Door 1
                </Box>
                <TextField
                  className="select"
                  name="doorDevice"
                  select
                  hiddenLabel
                  value={doorStatus}
                  onChange={handleChangeDoorStatus}
                  inputProps={{ id: "door-device" }}
                  SelectProps={{
                    open: openDoorDropdownMenu,
                    onClose: handleCloseDoorDropdownMenu,
                    onOpen: handleOpenDoorDropdownMenu,
                    IconComponent: KeyboardArrowRightIcon,
                  }}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      transform: openDoorDropdownMenu && "rotate(90deg)",
                    },
                  }}
                >
                  {option.accessDevices.map((accessDevice, index) => (
                    <MenuItem key={index} value={accessDevice.dayTimeFrameName}>
                      {accessDevice.dayTimeFrameName}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            )
        )}
      </Box>
    </CustomStyledAccessPermission>
  );
}

export default AccessPermission;
