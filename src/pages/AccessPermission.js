import {
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import MainHeadingLayout from "../layouts/MainHeadingLayout";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PermissionTransferList from "../components/AccessPermission/PermissionTransferList.js";
import DoorShiftList from "../components/AccessPermission/DoorShiftList.js";

export const CustomStyledAccessPermission = styled(Box)(({ theme }) => ({
  "& .big-flex": {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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
  "& .small-flex label": {
    color: theme.palette.primary.main,
    flex: 0.5,
    textAlign: "right",
    fontWeight: 550,
  },
  "& .small-flex .select": {
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

const accessPermission = [
  {
    startDate: "18/06/2024",
    endDate: "18/06/2024",
    accessDeviceList: [
      {
        serialNumber: "a1",
        doorName: "Door a1",
        dayTimeFrameNames: ["All Day", "Not In", "Part Time"],
      },
      {
        serialNumber: "a2",
        doorName: "Door a2",
        dayTimeFrameNames: ["Not In", "Part Time"],
      },
      {
        serialNumber: "a3",
        doorName: "Door a3",
        dayTimeFrameNames: ["All Day", "Not In"],
      },
    ],
    unAuthorizedUsers: [
      {
        userId: 1,
        fullName: "Dong Vu Minh Phuc",
        department: "R&D",
      },
      {
        userId: 2,
        fullName: "Pham Tra Thanh Xuan",
        department: "Marketing",
      },
      {
        userId: 3,
        fullName: "Nguyen Kieu Giang",
        department: "Sales",
      },
      {
        userId: 4,
        fullName: "Ngo Tuan Tu",
        department: "Sales",
      },
    ],
    authorizedUsers: [],
  },
  {
    startDate: "18/06/2024",
    endDate: "20/06/2024",
    accessDeviceList: [
      {
        serialNumber: "a1",
        doorName: "Door a1",
        dayTimeFrameNames: ["All Day", "Not In", "Part Time"],
      },
      {
        serialNumber: "a2",
        doorName: "Door a2",
        dayTimeFrameNames: ["Not In", "Part Time"],
      },
      {
        serialNumber: "a3",
        doorName: "Door a3",
        dayTimeFrameNames: ["All Day", "Not In"],
      },
      {
        serialNumber: "a4",
        doorName: "Door a4",
        dayTimeFrameNames: ["All Day", "Not In", "Part Time"],
      },
      {
        serialNumber: "a5",
        doorName: "Door a5",
        dayTimeFrameNames: ["Not In", "Part Time"],
      },
    ],
    unAuthorizedUsers: [
      {
        userId: 1,
        fullName: "Dong Vu Minh Phuc",
        department: "R&D",
      },
      {
        userId: 2,
        fullName: "Pham Tra Thanh Xuan",
        department: "Marketing",
      },
      {
        userId: 3,
        fullName: "Nguyen Kieu Giang",
        department: "Sales",
      },
      {
        userId: 4,
        fullName: "Ngo Tuan Tu",
        department: "Sales",
      },
      {
        userId: 5,
        fullName: "Nguyen Pham Thu Cat",
        department: "Developer",
      },
      {
        userId: 6,
        fullName: "Ngo Xuan Truong",
        department: "Developer",
      },
      {
        userId: 7,
        fullName: "Vo Xuan Trong",
        department: "R&D",
      },
      {
        userId: 8,
        fullName: "Pham Tra Thanh Truc",
        department: "Marketing",
      },
      {
        userId: 9,
        fullName: "Nguyen Phan Nam",
        department: "Sales",
      },
      {
        userId: 10,
        fullName: "Ngo Diem Truc",
        department: "Sales",
      },
      {
        userId: 11,
        fullName: "Nguyen Pham Thu Thuy",
        department: "Developer",
      },
      {
        userId: 12,
        fullName: "Ngo Xuan Trong",
        department: "Developer",
      },
      {
        userId: 13,
        fullName: "Nguyen Phan Luan",
        department: "Sales",
      },
      {
        userId: 14,
        fullName: "Ngan Trung Xuan",
        department: "Sales",
      },
      {
        userId: 15,
        fullName: "Vo Trong Nghia",
        department: "Developer",
      },
      {
        userId: 16,
        fullName: "Vo Trong Nam",
        department: "Developer",
      },
    ],
    authorizedUsers: [],
  },
];

function filteredSerialNumber(accessDeviceList, serialNoList) {
  const filteredAccessDeviceList = accessDeviceList.filter(
    (device) => serialNoList.indexOf(device.serialNumber) !== -1
  );

  return filteredAccessDeviceList;
}

function AccessPermission() {
  const [accessStartingDate, setAccessStartingDate] = useState(dayjs("null"));
  const [accessEndingDate, setAccessEndingDate] = useState(dayjs("null"));
  const [accessDevice, setAccessDevice] = useState([]);
  const [openAccessDeviceDropdownMenu, setOpenAccessDeviceDropdownMenu] =
    useState(false);
  const [doorShiftList, setDoorShiftList] = useState([]);

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

  const handleChangeAccessDevice = (event) => {
    const {
      target: { value },
    } = event;
    setAccessDevice(value);
  };

  const handleDoorShiftList = useCallback((data) => {
    setDoorShiftList(data);
  }, []);

  return (
    <CustomStyledAccessPermission>
      <MainHeadingLayout>Permission Assignment</MainHeadingLayout>

      <Box className="big-flex first-row">
        {/* Start Date */}
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

        {/* End Date */}
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

      {/* Access Device & Door Shifts */}
      {accessPermission.map(
        (option, index) =>
          option.startDate === accessStartingDate.format("DD/MM/YYYY") &&
          option.endDate === accessEndingDate.format("DD/MM/YYYY") && (
            <Box key={index}>
              <Box className="big-flex" sx={{ mb: "32px" }}>
                {/* Access Device */}
                <Box className="small-flex">
                  <Box sx={{ textAlign: "right", fontWeight: 550, flex: 0.5 }}>
                    Access Device
                  </Box>
                  <TextField
                    className="select"
                    name="accessDevice"
                    select
                    hiddenLabel
                    SelectProps={{
                      multiple: true,
                      value: accessDevice,
                      renderValue: (selected) => selected.join(", "),
                      onChange: handleChangeAccessDevice,
                      open: openAccessDeviceDropdownMenu,
                      onClose: handleCloseAccessDeviceDropdownMenu,
                      onOpen: handleOpenAccessDeviceDropdownMenu,
                      IconComponent: KeyboardArrowRightIcon,
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            padding: "8px 0",
                            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
                            borderRadius: "8px",
                          },
                        },
                        sx: {
                          "& .MuiMenu-list": {
                            padding: 0,
                            "& .MuiMenuItem-root": {
                              padding: "8px 20px",
                              gap: "4px",
                              "& .MuiCheckbox-root": {
                                padding: 0,
                              },
                              "& .MuiTypography-root": {
                                color: "info.main",
                                fontSize: "0.95rem",
                                fontWeight: 550,
                              },
                            },
                          },
                        },
                      },
                    }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        transform:
                          openAccessDeviceDropdownMenu && "rotate(90deg)",
                      },
                    }}
                  >
                    {option.accessDeviceList.map((device, index) => (
                      <MenuItem key={index} value={device.serialNumber}>
                        <Checkbox
                          checked={
                            accessDevice.indexOf(device.serialNumber) > -1
                          }
                        />
                        <ListItemText primary={device.serialNumber} />
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {accessDevice.length === 0 ||
                filteredSerialNumber(option.accessDeviceList, accessDevice)
                  .length === 0 ? (
                  <Box className="small-flex" />
                ) : (
                  ""
                )}

                {/* Door Shifts */}
                {accessDevice.length > 0 &&
                filteredSerialNumber(option.accessDeviceList, accessDevice)
                  .length > 0 ? (
                  <DoorShiftList
                    key={index}
                    filteredAccessDeviceList={filteredSerialNumber(
                      option.accessDeviceList,
                      accessDevice
                    )}
                    onChange={handleDoorShiftList}
                  />
                ) : (
                  ""
                )}
              </Box>

              {/* Permission Transfer List */}
              <PermissionTransferList
                unAuthorizedUsers={option.unAuthorizedUsers}
                authorizedUsers={option.authorizedUsers}
                doorShiftList={doorShiftList}
              />
            </Box>
          )
      )}
    </CustomStyledAccessPermission>
  );
}

export default AccessPermission;
