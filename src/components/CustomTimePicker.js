import { Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function CustomTimePicker(props) {
  const { timeFrameNumber, startTime, endTime, onChange } = props;
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
    onChange({ startingTime, endingTime });
  }, [onChange, startingTime, endingTime, startTime, endTime]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Box className="section-label" component="label">
        {`Time Frame ${timeFrameNumber + 1}`}
      </Box>
      <Box
        className="section-input"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          // "& .MuiFormLabel-root.MuiInputLabel-root": {
          //   width: "100%",
          //   textAlign: "left",
          // },
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
