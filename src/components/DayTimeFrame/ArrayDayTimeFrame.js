import CustomTimePickerGroup from "./CustomTimePickerGroup";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef } from "react";

function ArrayDayTimeFrame(props) {
  const {
    formData,
    setFormData,
    dayTimeFrames,
    setDayTimeFrames,
    errors,
    isDayTimeFrameDeleted,
    setIsDayTimeFrameDeleted,
  } = props;

  // const dayTimeFramesRef = useRef(dayTimeFrames);

  const handleChangeTimePicker = useCallback(
    (data) => {
      setDayTimeFrames((prevDayTimeFrames) => {
        const currentDayTimeFrames = [...prevDayTimeFrames];

        if (data.startingTime.isValid() && data.endingTime.isValid()) {
          currentDayTimeFrames.forEach((dayTimeFrame, index) => {
            if (data.dayTimeFrameIndex === index) {
              currentDayTimeFrames[index] = data;
            } else {
              currentDayTimeFrames[index] = {
                dayTimeFrameIndex: index,
                ...dayTimeFrame,
              };
            }
          });
        }

        // dayTimeFramesRef.current = currentDayTimeFrames;

        return currentDayTimeFrames;
      });
      // console.log("onChange function run!");
    },
    [setDayTimeFrames]
  );

  const handleAddNewTimeFrame = () => {
    setDayTimeFrames((prevItems) => {
      const newDayTimeFrames = [
        ...prevItems,
        { startingTime: dayjs(null), endingTime: dayjs(null) },
      ];

      // dayTimeFramesRef.current = newDayTimeFrames;

      return newDayTimeFrames;
    });
  };

  const handleDeleteTimeFrame = (dayTimeFrameId) => {
    const filteredDayTimeFrames = dayTimeFrames.filter(
      (dayTimeFrame, index) => index !== dayTimeFrameId
    );
    setIsDayTimeFrameDeleted(true);
    setDayTimeFrames(filteredDayTimeFrames);

    // dayTimeFramesRef.current = filteredDayTimeFrames;
  };

  // Problem
  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     dayTimeFrames: [...dayTimeFrames],
  //   });
  //   console.log("useEffect 1 run!");
  // }, [dayTimeFrames, formData, setFormData]);

  // Solution
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      // dayTimeFrames: [...dayTimeFramesRef.current],
      dayTimeFrames: [...dayTimeFrames],
    }));
    // console.log("useEffect 1 run!");
  }, [dayTimeFrames, setFormData]);

  return (
    <>
      {dayTimeFrames?.length > 0 ? (
        dayTimeFrames.map((dayTimeFrame, index) => (
          <CustomTimePickerGroup
            key={index}
            dayTimeFrameNumber={index}
            startTime={dayTimeFrame.startingTime}
            endTime={dayTimeFrame.endingTime}
            onChange={handleChangeTimePicker}
            errorStartingTime={errors?.[`dayTimeFrames[${index}].startingTime`]}
            errorEndingTime={errors?.[`dayTimeFrames[${index}].endingTime`]}
            handleDeleteTimeFrame={handleDeleteTimeFrame}
            isDayTimeFrameDeleted={isDayTimeFrameDeleted}
            setIsDayTimeFrameDeleted={setIsDayTimeFrameDeleted}
          />
        ))
      ) : (
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            mt: "12px",
            color: "error.main",
          }}
        >
          <Typography className="Mui-error">{errors?.dayTimeFrames}</Typography>
        </Box>
      )}

      <Box sx={{ mt: "12px", mx: "auto" }}>
        <Button
          onClick={handleAddNewTimeFrame}
          sx={{
            backgroundColor: "secondary.main",
            textTransform: "capitalize",
            borderRadius: "20px",
            lineHeight: "100%",
            py: "8px",
            px: "20px",
            fontSize: "1rem",
            color: "#fff",
            fontWeight: 550,
            "&:hover": { backgroundColor: "secondary.main" },
          }}
        >
          Add Time Frame
        </Button>
      </Box>
    </>
  );
}

export default ArrayDayTimeFrame;
