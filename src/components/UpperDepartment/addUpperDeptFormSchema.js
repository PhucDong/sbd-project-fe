import * as Yup from "yup";

export const addUpperDeptFormSchema = Yup.object().shape({
  upperDeptName: Yup.string()
    .required("Upper Dept Name is required.")
    .test(
      "checkAvailability",
      "Duplicate name. Please enter another name.",
      function (value) {
        if (!value) {
          return true;
        }

        const { upperDeptData } = this.options.context;

        const number = upperDeptData.findIndex(
          (upperDept) => upperDept.upperDeptName === value
        );

        if (number === -1) {
          return true;
        } else {
          return false;
        }
      }
    ),
  deptList: Yup.array().min(1, "Please select at least 1 department."),
  createDate: Yup.date().typeError("Please select a date."),
});
