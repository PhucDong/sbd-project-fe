import { Box } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";

function CustomTimePicker(props) {
  const { timeFrameNumber, startTime, endTime } =
    props;
  const [startingTime, setStartingTime] = useState(startTime);
  const [endingTime, setEndingTime] = useState(endTime);

  const handleChangeStartingTime = (newStartingTime) => {
    setStartingTime(newStartingTime);
    // setStartTime(newStartingTime);
  };

  const handleChangeEndingTime = (newEndingTime) => {
    setEndingTime(newEndingTime);
    // setEndTime(newEndingTime);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Box className="section-label" component="label">
        {`Time Frame ${timeFrameNumber}`}
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
