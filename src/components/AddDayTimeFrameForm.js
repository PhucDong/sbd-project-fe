import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import CustomTimePicker from "./CustomTimePicker";
import CustomStyledButton from "./CustomStyledButton";
import dayjs from "dayjs";

const deviceSerialNumbers = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
];

function AddDayTimeFrameForm({ handleCloseAddForm }) {
  const [serialNumber, setSerialNumber] = useState(
    deviceSerialNumbers[0].value
  );
  const [openSerialNoDropdownMenu, setOpenSerialNoDropdownMenu] =
    useState(false);
  const [dayTimeFrameName, setDayTimeFrameName] = useState("All Day");

  const [dayTimeFrames, setDayTimeFrames] = useState([
    { startingTime: dayjs(null), endingTime: dayjs(null) },
  ]);

  const handleChangeSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };

  const handleChangeDayTimeFrameName = (event) => {
    setDayTimeFrameName(event.target.value);
  };

  const handleCloseSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(false);
  const handleOpenSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(true);

  const handleAddNewTimeFrame = () => {
    setDayTimeFrames((prevItems) => [
      ...prevItems,
      { startingTime: dayjs(null), endingTime: dayjs(null) },
    ]);
  };

  const handleChangeDayTimeFrame = (data, index) => {
    if (data.startingTime.isValid() && data.endingTime.isValid()) {
      setDayTimeFrames((prevItems) => {
        const updatedDayTimeFrames = prevItems.map((dayTimeFrame, i) =>
          i === index ? { ...data } : dayTimeFrame
        );
        return updatedDayTimeFrames;
      });
    }
  };

  const handleSubmitFormData = () => {
    console.log(78, serialNumber);
    console.log(79, dayTimeFrameName);
    dayTimeFrames.forEach((dayTimeFrame) => {
      console.log(81, dayTimeFrame.startingTime.format("HH:mm"));
      console.log(82, dayTimeFrame.endingTime.format("HH:mm"));
    });
    handleCloseAddForm();
  };

  useEffect(() => {
    console.log(87, dayTimeFrames);
  }, [dayTimeFrames]);

  return (
    <>
      <Box className="form-header">
        <Typography>Add Day Time Frame</Typography>
      </Box>
      <Box className="form-body">
        <Box className="form-section">
          <InputLabel
            id="serial-number-label"
            className="section-label"
            htmlFor="serial-number"
          >
            Serial No.
          </InputLabel>
          <TextField
            name="serial-number"
            required
            select
            hiddenLabel
            value={serialNumber}
            onChange={handleChangeSerialNumber}
            inputProps={{ id: "serial-number" }}
            SelectProps={{
              open: openSerialNoDropdownMenu,
              onClose: handleCloseSerialNoDropdownMenu,
              onOpen: handleOpenSerialNoDropdownMenu,
              IconComponent: KeyboardArrowRightIcon,
            }}
            className="section-input"
            sx={{
              "& .MuiSvgIcon-root": {
                transform: openSerialNoDropdownMenu && "rotate(90deg)",
              },
            }}
          >
            {deviceSerialNumbers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box className="form-section">
          <InputLabel
            id="name-input-label"
            className="section-label"
            htmlFor="name-input"
          >
            Name
          </InputLabel>
          <TextField
            name="name-input"
            className="section-input"
            required
            hiddenLabel
            value={dayTimeFrameName}
            onChange={handleChangeDayTimeFrameName}
            inputProps={{ id: "name-input" }}
          />
        </Box>

        <Box className="form-section form-section-direction">
          {dayTimeFrames.length > 0 &&
            dayTimeFrames.map((dayTimeFrame, index) => (
              <CustomTimePicker
                key={index}
                timeFrameNumber={index}
                startTime={dayTimeFrame.startingTime}
                endTime={dayTimeFrame.endingTime}
                onChange={(data) => handleChangeDayTimeFrame(data, index)}
              />
            ))}
        </Box>

        <Button
          onClick={handleAddNewTimeFrame}
          sx={{
            backgroundColor: "secondary.main",
            textTransform: "capitalize",
            borderRadius: "20px",
            lineHeight: "100%",
            py: "8px",
            px: "20px",
            mt: "12px",
            fontSize: "1rem",
            color: "#fff",
            fontWeight: 550,
            "&:hover": { backgroundColor: "secondary.main" },
          }}
        >
          Add Time Frame
        </Button>
        <Box
          sx={{
            mt: "40px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <CustomStyledButton onClick={handleCloseAddForm}>
            Cancel
          </CustomStyledButton>
          <CustomStyledButton onClick={handleSubmitFormData}>
            Save
          </CustomStyledButton>
        </Box>
      </Box>
    </>
  );
}

export default AddDayTimeFrameForm;
