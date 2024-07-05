import { Checkbox, ListItemText, ListSubheader, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

function DoorShiftGroup(props) {
  const { device, onChange, doorShiftListData } = props;
  const [doorShiftSelection, setDoorShiftSelection] = useState(
    doorShiftListData.length > 0
      ? () => {
          const filteredDoor = doorShiftListData.filter(
            (door) => door.doorName === device.serialNumber
          );
          return filteredDoor[0]?.[`door${device.serialNumber}`];
        }
      : ""
  );

  const handleToggle = (newShift) => () => {
    if (newShift === doorShiftSelection) {
      setDoorShiftSelection("");
    } else {
      setDoorShiftSelection(newShift);
    }
  };

  useEffect(() => {
    onChange({
      doorName: device.serialNumber,
      [`door${device.serialNumber}`]: doorShiftSelection,
    });
  }, [onChange, doorShiftSelection, device.serialNumber]);

  return (
    <>
      <ListSubheader>{device.serialNumber}</ListSubheader>
      {device.dayTimeFrameNames.map((shift, index) => (
        <MenuItem key={index} value={shift} onClick={handleToggle(shift)}>
          <Checkbox checked={doorShiftSelection === shift} />
          <ListItemText primary={shift} />
        </MenuItem>
      ))}
    </>
  );
}

export default DoorShiftGroup;
