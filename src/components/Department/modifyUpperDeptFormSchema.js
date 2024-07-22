import * as Yup from "yup";

export const modifyUpperDeptFormSchema = Yup.object().shape({
  upperDeptName: Yup.string().required("Upper Dept Name is required."),
  deptList: Yup.array().min(1, "Please select at least 1 department."),
  createDate: Yup.date().typeError("Please select a date."),
});
