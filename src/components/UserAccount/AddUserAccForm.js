import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import FunctionModuleSection from "./FunctionModuleSection";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import { addUserAccFormSchema } from "./addUserAccFormSchema";
import { formatUserAccFormData } from "./formatUserAccFormData";

function AddUserAccForm(props) {
  const {
    handleCloseForm,
    manageFunctionModuleList,
    userAccountList,
    onChange,
  } = props;
  const [errors, setErrors] = useState(null);

  const fullNameRef = useRef("");
  const emailRef = useRef("");
  const descriptionRef = useRef("");
  const functionModuleListRef = useRef([]);

  const addUserAccFormDataRef = useRef({
    fullName: "",
    email: "",
    functionModuleList: [],
    description: "",
  });

  const handleChangeUserFullName = (event) => {
    fullNameRef.current = event.target.value;
    addUserAccFormDataRef.current = {
      ...addUserAccFormDataRef.current,
      fullName: fullNameRef.current,
    };
  };

  const handleChangeUserEmail = (event) => {
    emailRef.current = event.target.value;
    addUserAccFormDataRef.current = {
      ...addUserAccFormDataRef.current,
      email: emailRef.current,
    };
  };

  const handleChangeUserDescription = (event) => {
    descriptionRef.current = event.target.value;
    addUserAccFormDataRef.current = {
      ...addUserAccFormDataRef.current,
      description: descriptionRef.current,
    };
  };

  const handleChangeFunctionModuleList = useCallback((moduleList) => {
    functionModuleListRef.current = [...moduleList];
    addUserAccFormDataRef.current = {
      ...addUserAccFormDataRef.current,
      functionModuleList: functionModuleListRef.current,
    };
  }, []);

  const handleSubmitFormData = async (event) => {
    event.preventDefault();
    try {
      const formattedFormData = formatUserAccFormData(
        addUserAccFormDataRef.current
      );
      await addUserAccFormSchema.validate(formattedFormData, {
        abortEarly: false,
        context: { userAccountList: userAccountList },
      });
      onChange(formattedFormData);
      setErrors(null);
      handleCloseForm();
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Box className="form-header">
        <Typography>Add User Account</Typography>
      </Box>
      <Box className="form-body">
        {/* User Full Name */}
        <Box className="form-section">
          <InputLabel
            id="user-full-name-label"
            className="section-label"
            htmlFor="user-full-name"
          >
            Full Name
          </InputLabel>
          <TextField
            name="fullName"
            className="section-input"
            required
            hiddenLabel
            ref={fullNameRef}
            inputProps={{ id: "user-full-name" }}
            placeholder="Enter user full name"
            error={errors?.fullName && true}
            helperText={errors?.fullName && errors.fullName}
            onChange={handleChangeUserFullName}
          />
        </Box>

        {/* User Email */}
        <Box className="form-section">
          <InputLabel
            id="user-email-label"
            className="section-label"
            htmlFor="user-email"
          >
            Email
          </InputLabel>
          <TextField
            name="email"
            className="section-input"
            required
            hiddenLabel
            ref={emailRef}
            inputProps={{ id: "user-email" }}
            placeholder="Enter user email"
            error={errors?.email && true}
            helperText={errors?.email && errors.email}
            onChange={handleChangeUserEmail}
          />
        </Box>

        {/* Function module section */}
        <FunctionModuleSection
          errors={errors}
          manageFunctionModuleList={manageFunctionModuleList}
          onChange={handleChangeFunctionModuleList}
        />

        {/* Description */}
        <Box className="form-section">
          <InputLabel
            id="description-label"
            className="section-label"
            htmlFor="description"
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            className="section-input"
            required
            hiddenLabel
            multiline
            rows={4}
            ref={descriptionRef}
            inputProps={{ id: "description" }}
            placeholder="Enter user description"
            onChange={handleChangeUserDescription}
          />
        </Box>

        {/* Cancel & save buttons */}
        <Box
          sx={{
            mt: "40px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <CustomStyledFormButton onClick={handleCloseForm}>
            Cancel
          </CustomStyledFormButton>
          <CustomStyledFormButton onClick={handleSubmitFormData}>
            Save
          </CustomStyledFormButton>
        </Box>
      </Box>
    </>
  );
}

export default AddUserAccForm;
