import { Box, IconButton } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomTimePickerGroup(props) {
  const {
    dayTimeFrameNumber,
    newStartTime,
    newEndTime,
    onChange,
    errorStartingTime,
    errorEndingTime,
    handleDeleteTimeFrame,
    isDayTimeFrameDeleted,
    setIsDayTimeFrameDeleted,
  } = props;
  const [startingTime, setStartingTime] = useState(
    dayjs(newStartTime).isValid() ? dayjs(newStartTime) : null
  );
  const [endingTime, setEndingTime] = useState(
    dayjs(newEndTime).isValid() ? dayjs(newEndTime) : null
  );
  const handleChangeStartingTime = (newStartingTime) => {
    setStartingTime(newStartingTime);
  };

  const handleChangeEndingTime = (newEndingTime) => {
    setEndingTime(newEndingTime);
  };

  useEffect(() => {
    if (isDayTimeFrameDeleted) {
      setStartingTime(newStartTime);
      setEndingTime(newEndTime);
      setIsDayTimeFrameDeleted(false);
      return;
    }
    if (startingTime || endingTime) {
      onChange({
        dayTimeFrameIndex: dayTimeFrameNumber,
        startingTime,
        endingTime,
      });
    }
  }, [
    onChange,
    startingTime,
    endingTime,
    newStartTime,
    newEndTime,
    isDayTimeFrameDeleted,
    setIsDayTimeFrameDeleted,
    dayTimeFrameNumber,
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
        {/* Start time */}
        <TimePicker
          views={["hours", "minutes"]}
          value={startingTime}
          onChange={handleChangeStartingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            textField: {
              error: errorStartingTime ? true : false,
              helperText: errorStartingTime && "Starting time is required.",
            },
          }}
          sx={{
            "& .MuiInputAdornment-root": {
              m: 0,
              "& .MuiIconButton-root": { p: 0, m: 0 },
            },
          }}
        />
        {/* End time */}
        <TimePicker
          views={["hours", "minutes"]}
          disabled={startingTime ? false : true}
          value={endingTime}
          minTime={startingTime}
          onChange={handleChangeEndingTime}
          slotProps={{
            actionBar: {
              actions: ["clear", "cancel", "accept"],
            },
            textField: {
              error: errorEndingTime ? true : false,
              helperText: errorEndingTime && "Ending time is required.",
            },
          }}
          sx={{
            "& .MuiInputAdornment-root": {
              m: 0,
              "& .MuiIconButton-root": { p: 0, m: 0 },
            },
          }}
        />

        {/* Delete a time frame */}
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

export default CustomTimePickerGroup;
