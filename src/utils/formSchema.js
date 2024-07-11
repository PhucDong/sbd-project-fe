import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
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
        const { dayTimeFrameData } = this.options.context;

        const number = dayTimeFrameData.findIndex(
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
    .required("Day time frames are required.")
    .of(
      Yup.object().shape({
        startingTime: Yup.date().required(),
        endingTime: Yup.date().required(),
      })
    ),
});
