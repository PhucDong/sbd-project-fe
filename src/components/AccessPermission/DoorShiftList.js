import { Box, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useCallback, useEffect, useState } from "react";
import DoorShiftGroup from "./DoorShiftGroup";

// const dayTimeFrameNames = ["All Day", "Not In", "Part Time"];

function DoorShiftList(props) {
  const { filteredAccessDeviceList, onChange } = props;
  const [openDoorDropdownMenu, setOpenDoorDropdownMenu] = useState(false);
  const [shiftList, setShiftList] = useState([]);

  const handleCloseDoorDropdownMenu = () => setOpenDoorDropdownMenu(false);
  const handleOpenDoorDropdownMenu = () => setOpenDoorDropdownMenu(true);

  const handleDoorShiftGroup = useCallback((data) => {
    setShiftList((prevList) => {
      const newDoorShiftList = [...prevList, data];

      const neededIndex = newDoorShiftList.findIndex(
        (item) => item.doorName === data.doorName
      );

      if (neededIndex !== -1 && neededIndex !== newDoorShiftList.length - 1) {
        newDoorShiftList.splice(neededIndex, 1);
      }

      return newDoorShiftList;
    });
  }, []);

  // useEffect(() => {
  //   // console.log("Door shift list: ", doorShiftList);
  //   if (doorShiftList.length > 1) {
  //     let newDoorShiftList;
  //     const neededIndex = doorShiftList.findIndex(
  //       (item) => item.doorName === doorShiftData.doorName
  //     );
  //     if (neededIndex === 0) {
  //       newDoorShiftList = doorShiftList.slice(1);
  //     } else if (neededIndex === doorShiftList.length - 1) {
  //       newDoorShiftList = [...doorShiftList];
  //     } else {
  //       newDoorShiftList = [
  //         ...doorShiftList.slice(0, neededIndex),
  //         ...doorShiftList.slice(neededIndex + 1),
  //       ];
  //     }
  //     setShiftList(newDoorShiftList);
  //   }
  // }, [doorShiftList, doorShiftData]);

  useEffect(() => {
    if (shiftList.length > 0) {
      onChange(shiftList);
    }
  }, [onChange, shiftList]);

  return (
    <Box className="small-flex">
      <Box sx={{ textAlign: "right", fontWeight: 550, flex: 0.5 }}>Doors</Box>
      <TextField
        className="select"
        name="doorDevice"
        select
        hiddenLabel
        SelectProps={{
          value: "",
          open: openDoorDropdownMenu,
          onClose: handleCloseDoorDropdownMenu,
          onOpen: handleOpenDoorDropdownMenu,
          IconComponent: KeyboardArrowRightIcon,
          MenuProps: {
            PaperProps: {
              sx: {
                padding: "8px 0 24px 0",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
              },
            },
            sx: {
              "& .MuiMenu-list": {
                padding: 0,
                "& .MuiListSubheader-root": {
                  lineHeight: "100%",
                  padding: "16px 20px 0 20px",
                  color: "info.main",
                  fontWeight: 550,
                  fontSize: "1rem",
                },
                "& .MuiMenuItem-root": {
                  padding: "10px 20px 0 20px",
                  gap: "4px",
                  "& .MuiCheckbox-root": {
                    padding: 0,
                  },
                  "& .MuiTypography-root": {
                    color: "info.main",
                    fontSize: "0.95rem",
                  },
                },
              },
            },
          },
        }}
        sx={{
          "& .MuiSvgIcon-root": {
            transform: openDoorDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {filteredAccessDeviceList.map((device, index) => (
          <DoorShiftGroup
            key={index}
            device={device}
            doorShiftListData={shiftList}
            onChange={handleDoorShiftGroup}
          />
        ))}
      </TextField>
    </Box>
  );
}

export default DoorShiftList;
