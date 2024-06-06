import { Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function CustomTimePicker(props) {
  const {
    timeFrameNumber,
    startTime,
    endTime,
    onChange,
    // errorStartTime,
    // errorEndTime,
  } = props;
  const [startingTime, setStartingTime] = useState(null);
  const [endingTime, setEndingTime] = useState(null);
  console.log("Start time:", startTime);
  console.log("End time:", endTime);

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
    onChange({ startingTime, endingTime });
  }, [onChange, startingTime, endingTime, startTime, endTime]);

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
      <Box className="section-label" component="label">
        {`Time Frame ${timeFrameNumber + 1}`}
      </Box>
      <Box
        className="section-input"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <TimePicker
          views={["hours", "minutes"]}
          value={startingTime}
          onChange={handleChangeStartingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            // textField: {
            //   error: errorStartTime ? true : false,
            //   helperText: errorStartTime,
            // },
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
          value={endingTime}
          onChange={handleChangeEndingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            // textField: {
            //   error: errorEndTime ? true : false,
            //   helperText: errorEndTime,
            // },
          }}
          sx={{
            "& .MuiInputAdornment-root": {
              m: 0,
              "& .MuiIconButton-root": { p: 0, m: 0 },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default CustomTimePicker;
