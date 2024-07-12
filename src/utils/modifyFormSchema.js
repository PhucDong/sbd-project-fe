import * as Yup from "yup";

export const modifyValidationSchema = Yup.object().shape({
  serialNumber: Yup.string().required("Serial number is required."),
  dayTimeFrameName: Yup.string()
    .required("Day time frame name is required.")
    .test(
      "checkAvailability",
      "Duplicate name. Please enter another name.",
      function (value) {
        if (!value) {
          return true;
        }
        const { dayTimeFrameData, selectedDayTimeFrameName } =
          this.options.context;
        const indexSelectedDayTimeFrame = dayTimeFrameData.findIndex(
          (dayTimeFrame) =>
            dayTimeFrame.dayTimeFrameName === selectedDayTimeFrameName
        );

        let newDayTimeFrameData;
        if (indexSelectedDayTimeFrame === 0) {
          newDayTimeFrameData = dayTimeFrameData.slice(1);
        } else if (indexSelectedDayTimeFrame === dayTimeFrameData.length - 1) {
          newDayTimeFrameData = dayTimeFrameData.slice(
            0,
            dayTimeFrameData.length - 1
          );
        } else {
          newDayTimeFrameData = [
            ...dayTimeFrameData.slice(0, indexSelectedDayTimeFrame),
            ...dayTimeFrameData.slice(indexSelectedDayTimeFrame + 1),
          ];
        }

        const number = newDayTimeFrameData.findIndex(
          (dayTimeFrame) => dayTimeFrame.dayTimeFrameName === value
        );

        if (number === -1) {
          return true;
        } else {
          return false;
        }
      }
    ),
  dayTimeFrames: Yup.array()
    .min(1, "Day time frames are required.")
    .of(
      Yup.object().shape({
        startingTime: Yup.date().required(),
        endingTime: Yup.date().required(),
      })
    ),
});
