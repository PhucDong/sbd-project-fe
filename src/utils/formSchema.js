import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  serialNumber: Yup.string().required("Serial number is required."),
  dayTimeFrameName: Yup.string().required("Day time frame name is required."),
  dayTimeFrames: Yup.array()
    .required("Day time frames are required.")
    .of(
      Yup.object().shape({
        startingTime: Yup.date().required(),
        endingTime: Yup.date().required(),
      })
    ),
});