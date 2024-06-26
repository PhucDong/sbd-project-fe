import { Box, IconButton } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomTimePicker(props) {
  const {
    dayTimeFrameNumber,
    startTime,
    endTime,
    onChange,
    errorStartingTime,
    errorEndingTime,
    handleDeleteTimeFrame,
    isDayTimeFrameDeleted,
    setIsDayTimeFrameDeleted,
  } = props;
  const [startingTime, setStartingTime] = useState(dayjs(null));
  const [endingTime, setEndingTime] = useState(dayjs(null));

  const handleChangeStartingTime = (newStartingTime) => {
    setStartingTime(newStartingTime);
  };

  const handleChangeEndingTime = (newEndingTime) => {
    setEndingTime(newEndingTime);
  };

  useEffect(() => {
    if (startTime === startingTime && endTime === endingTime) {
      return;
    }
    if (isDayTimeFrameDeleted) {
      setStartingTime(startTime);
      setEndingTime(endTime);
      setIsDayTimeFrameDeleted(false);
      return;
    }
    onChange({ startingTime, endingTime });
  }, [
    onChange,
    startingTime,
    endingTime,
    startTime,
    endTime,
    isDayTimeFrameDeleted,
    setIsDayTimeFrameDeleted,
  ]);

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <Box className="section-label" component="label">
        {`Time Frame ${dayTimeFrameNumber + 1}`}
      </Box>
      <Box
        className="section-input"
        sx={{
          display: "flex",
          gap: "6px",
        }}
      >
        <TimePicker
          views={["hours", "minutes"]}
          value={dayjs(startTime).isValid() ? dayjs(startTime) : startingTime}
          onChange={handleChangeStartingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            textField: {
              error: errorStartingTime ? true : false,
              helperText: errorStartingTime ? "Starting time is required." : "",
            },
          }}
          sx={{
            "& .MuiInputAdornment-root": {
              m: 0,
              "& .MuiIconButton-root": { p: 0, m: 0 },
            },
          }}
        />
        <TimePicker
          views={["hours", "minutes"]}
          value={dayjs(endTime).isValid() ? dayjs(endTime) : endingTime}
          onChange={handleChangeEndingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            textField: {
              error: errorEndingTime ? true : false,
              helperText: errorEndingTime ? "Ending time is required." : "",
            },
          }}
          sx={{
            "& .MuiInputAdornment-root": {
              m: 0,
              "& .MuiIconButton-root": { p: 0, m: 0 },
            },
          }}
        />
        <IconButton
          sx={{ p: 0, height: "100%" }}
          onClick={() => handleDeleteTimeFrame(dayTimeFrameNumber)}
        >
          <DeleteIcon
            sx={{
              fontSize: "1.6rem",
              color: errorStartingTime || errorEndingTime ? "error.main" : "",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CustomTimePicker;
