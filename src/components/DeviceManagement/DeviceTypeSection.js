import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function DeviceTypeSection(props) {
  const { errors, deviceTypeList, onChange, selectedRowData } = props;
  const [deviceType, setDeviceType] = useState(
    selectedRowData?.deviceType.length > 0 ? selectedRowData.deviceType : ""
  );
  const [openDeviceTypeDropdownMenu, setOpenDeviceTypeDropdownMenu] =
    useState(false);

  const handleChangeDeviceType = (event) => {
    // setDeviceType(event.target.value);
    const selectedValue = event.target.value;
    if (deviceType === selectedValue) {
      setDeviceType("");
    } else {
      setDeviceType(selectedValue);
    }
  };

  const handleCloseDeviceTypeDropdownMenu = () => {
    setOpenDeviceTypeDropdownMenu(false);
  };
  const handleOpenDeviceTypeDropdownMenu = () => {
    setOpenDeviceTypeDropdownMenu(true);
  };

  useEffect(() => {
    onChange(deviceType);
    console.log("Device type: ", deviceType);
  }, [deviceType, onChange]);

  return (
    <Box className="form-section">
      <InputLabel
        id="device-type-label"
        className="section-label"
        htmlFor="device-type"
      >
        Type
      </InputLabel>
      <TextField
        inputProps={{ id: "device-type" }}
        name="deviceType"
        className="section-input"
        required
        select
        hiddenLabel
        error={errors?.deviceType && true}
        helperText={errors?.deviceType && errors.deviceType}
        value={deviceType}
        onChange={handleChangeDeviceType}
        SelectProps={{
          renderValue: (selected) => selected,
          open: openDeviceTypeDropdownMenu,
          onClose: handleCloseDeviceTypeDropdownMenu,
          onOpen: handleOpenDeviceTypeDropdownMenu,
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
            transform: openDeviceTypeDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {deviceTypeList.map((type) => (
          <MenuItem
            key={type}
            value={type}
            onClick={() => handleChangeDeviceType({ target: { value: type } })}
          >
            <Checkbox id={type} name={type} checked={type === deviceType} />
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default DeviceTypeSection;
