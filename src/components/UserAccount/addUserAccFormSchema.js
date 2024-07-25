import * as Yup from "yup";

export const addUserAccFormSchema = Yup.object().shape({
  // fullname & email:
  // _no special characters & numbers
  // _capitalize 1st letter of each word
  fullName: Yup.string()
    .test(
      "checkAvailability",
      "User hasn't registered. Please register before proceeding.",
      function (value) {
        if (!value) {
          return true;
        }

        const { userAccountList } = this.options.context;

        const number = userAccountList.findIndex(
          (account) => account.fullName === value
        );

        if (number === -1) {
          return false;
        } else {
          return true;
        }
      }
    )
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, {
      message:
        "User fullname doesn't contain numbers or special characters. For example, Nguyen Van A.",
      excludeEmptyString: true,
    })
    .required("User fullname is required."),
  email: Yup.string()
    .test(
      "checkAvailability",
      "User hasn't registered. Please register before proceeding.",
      function (value) {
        if (!value) {
          return true;
        }

        const { userAccountList } = this.options.context;

        const number = userAccountList.findIndex(
          (account) => account.email === value
        );

        if (number === -1) {
          return false;
        } else {
          return true;
        }
      }
    )
    .matches(/(\w\.?)+@[\w.-]+\.\w{2,}/, {
      message: "Incorrect email format. For example, nguyenvana@gmail.com",
    })
    .required("User email is required."),
  functionModuleList: Yup.array().min(
    1,
    "Please select at least 1 function module."
  ),
});
