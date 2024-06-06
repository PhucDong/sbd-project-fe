import React, { useEffect, useState } from "react";
import CustomTimePicker from "./CustomTimePicker";
import { Button } from "@mui/material";

function ArrayDayTimeFrame(props) {
  const { onChange, formData, setFormData } = props;

  const [dayTimeFrames, setDayTimeFrames] = useState([
    { startingTime: null, endingTime: null },
  ]);

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

  const handleAddNewTimeFrame = () => {
    setDayTimeFrames((prevItems) => [
      ...prevItems,
      { startingTime: null, endingTime: null },
    ]);
  };

  useEffect(() => {
    // onChange(dayTimeFrames);
    setFormData({ ...formData, dayTimeFrames });
  }, [onChange, dayTimeFrames, setFormData, formData]);

  return (
    <>
      {dayTimeFrames.length > 0 &&
        dayTimeFrames.map((dayTimeFrame, index) => (
          <CustomTimePicker
            key={index}
            timeFrameNumber={index}
            startTime={dayTimeFrame.startingTime}
            endTime={dayTimeFrame.endingTime}
            // errorStartTime={errors?.startingTime}
            // errorEndTime={errors?.endingTime}
            onChange={(data) => handleChangeDayTimeFrame(data, index)}
          />
        ))}

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
    </>
  );
}

export default ArrayDayTimeFrame;
