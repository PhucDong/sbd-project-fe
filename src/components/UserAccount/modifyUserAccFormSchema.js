import * as Yup from "yup";

export const modifyUserAccFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, {
      message:
        "User fullname doesn't contain numbers or special characters. For example, Nguyen Van A.",
      excludeEmptyString: true,
    })
    .required("User fullname is required."),
  email: Yup.string()
    .matches(/(\w\.?)+@[\w.-]+\.\w{2,}/, {
      message: "Incorrect email format. For example, nguyenvana@gmail.com",
    })
    .required("User email is required."),
  functionModuleList: Yup.array().min(
    1,
    "Please select at least 1 function module."
  ),
});
