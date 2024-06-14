import CustomTimePicker from "./CustomTimePicker";
import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";

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

  const handleChangeTimePicker = (data, timeIndex) => {
    if (data.startingTime.isValid() && data.endingTime.isValid()) {
      const updatedDayTimeFrames = dayTimeFrames.map((dayTimeFrame, index) => {
        if (timeIndex === index) {
          return { dayTimeFrameIndex: timeIndex, ...data };
        }
        return { dayTimeFrameIndex: timeIndex, ...dayTimeFrame };
      });

      setDayTimeFrames(updatedDayTimeFrames);
      setFormData({ ...formData, dayTimeFrames: [...updatedDayTimeFrames] });
    }
  };

  const handleAddNewTimeFrame = () => {
    setDayTimeFrames((prevItems) => [
      ...prevItems,
      { startingTime: dayjs(null), endingTime: dayjs(null) },
    ]);
    setFormData({
      ...formData,
      dayTimeFrames: [
        ...dayTimeFrames,
        { startingTime: dayjs(null), endingTime: dayjs(null) },
      ],
    });
  };

  const handleDeleteTimeFrame = (dayTimeFrameId) => {
    const filteredDayTimeFrames = dayTimeFrames.filter(
      (dayTimeFrame, index) => index !== dayTimeFrameId
    );
    setIsDayTimeFrameDeleted(true);
    setDayTimeFrames(filteredDayTimeFrames);
    setFormData({
      ...formData,
      dayTimeFrames:
        filteredDayTimeFrames.length > 0 ? filteredDayTimeFrames : null,
    });
  };

  return (
    <>
      {dayTimeFrames?.length > 0 ? (
        dayTimeFrames.map((dayTimeFrame, index) => (
          <CustomTimePicker
            key={index}
            dayTimeFrameNumber={index}
            startTime={dayTimeFrame.startingTime}
            endTime={dayTimeFrame.endingTime}
            onChange={(data) => handleChangeTimePicker(data, index)}
            errorStartingTime={errors?.[`dayTimeFrames[${index}].startingTime`]}
            errorEndingTime={errors?.[`dayTimeFrames[${index}].endingTime`]}
            handleDeleteTimeFrame={handleDeleteTimeFrame}
            isDayTimeFrameDeleted={isDayTimeFrameDeleted}
            setIsDayTimeFrameDeleted={setIsDayTimeFrameDeleted}
          />
        ))
      ) : (
        <Box sx={{ width: "100%", textAlign: "center", mt: "12px", color: "error.main" }}>
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
