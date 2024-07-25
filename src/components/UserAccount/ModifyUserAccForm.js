import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import FunctionModuleSection from "./FunctionModuleSection";
import { modifyUserAccFormSchema } from "./modifyUserAccFormSchema";
import { formatUserAccFormData } from "./formatUserAccFormData";

function ModifyUserAccForm(props) {
  const {
    selectedRowData,
    handleCloseForm,
    onChange,
    manageFunctionModuleList,
  } = props;
  const [errors, setErrors] = useState(null);
  const [fullName, setFullName] = useState(
    selectedRowData.fullName ? selectedRowData.fullName : ""
  );
  const [email, setEmail] = useState(
    selectedRowData.email ? selectedRowData.email : ""
  );
  const [description, setDescription] = useState(
    selectedRowData.description ? selectedRowData.description : ""
  );
  const functionModuleListRef = useRef([]);

  const modifyUserAccFormDataRef = useRef({
    id: selectedRowData.id,
    fullName: fullName,
    email: email,
    password: selectedRowData.password,
    functionModuleList: [],
    description: description,
  });

  const handleChangeUserFullName = (event) => {
    setFullName(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      fullName: event.target.value,
    };
  };

  const handleChangeUserEmail = (event) => {
    setEmail(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      email: event.target.value,
    };
  };

  const handleChangeFunctionModuleList = useCallback((moduleList) => {
    functionModuleListRef.current = [...moduleList];
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      functionModuleList: moduleList,
    };
  }, []);

  const handleChangeUserDescription = (event) => {
    setDescription(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      description: event.target.value,
    };
  };

  const handleSubmitFormData = async (event) => {
    event.preventDefault();

    try {
      const formattedFormData = formatUserAccFormData(
        modifyUserAccFormDataRef.current
      );
      await modifyUserAccFormSchema.validate(formattedFormData, {
        abortEarly: false,
      });
      setErrors(null);
      onChange(formattedFormData);
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
        <Typography>Modify User Account</Typography>
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
            value={fullName}
            hiddenLabel
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
            value={email}
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
          selectedRowData={selectedRowData}
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
            value={description}
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

export default ModifyUserAccForm;
