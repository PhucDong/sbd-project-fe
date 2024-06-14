import { Box, InputLabel, TextField, Typography } from "@mui/material";
import CustomStyledFormButton from "./CustomStyledFormButton";
import "../App.css";
import ArrayDayTimeFrame from "./ArrayDayTimeFrame";
import { useState } from "react";
import { formatFormData } from "../utils/formFormat";
import { validationSchema } from "../utils/formSchema";

function ModifyDayTimeFrameForm(props) {
  const { onChange, selectedRowData, handleCloseModifyForm } = props;
  const [errors, setErrors] = useState(null);
  const [isDayTimeFrameDeleted, setIsDayTimeFrameDeleted] = useState(false);
  const [dayTimeFrames, setDayTimeFrames] = useState(
    selectedRowData.dayTimeFrames
  );
  const [formData, setFormData] = useState({
    serialNumber: selectedRowData.serialNumber,
    dayTimeFrameName: selectedRowData.dayTimeFrameName,
    dayTimeFrames: selectedRowData.dayTimeFrames,
  });

  const handleChangeFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeDayTimeFrames = (newDayTimeFrameArray) => {
    setFormData({ ...formData, dayTimeFrames: [...newDayTimeFrameArray] });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const formattedFormData = formatFormData(formData);
      onChange(formattedFormData);
      handleCloseModifyForm();
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
        <Typography>Modify Day Time Frame</Typography>
      </Box>
      <Box className="form-body">
        {/* Serial number */}
        <Box className="form-section">
          <InputLabel
            id="serial-number-label"
            className="section-label"
            htmlFor="serial-number"
          >
            Serial No.
          </InputLabel>
          <TextField
            name="serialNumber"
            className="section-input"
            disabled
            hiddenLabel
            defaultValue={formData.serialNumber}
            inputProps={{ id: "serial-number" }}
            sx={{
              "& .Mui-disabled": {
                backgroundColor: "#F0F0F0",
              },
            }}
          />
        </Box>

        {/* Day time frame name */}
        <Box className="form-section">
          <InputLabel
            id="name-input-label"
            className="section-label"
            htmlFor="name-input"
          >
            Name
          </InputLabel>
          <TextField
            name="dayTimeFrameName"
            className="section-input"
            required
            hiddenLabel
            value={formData.dayTimeFrameName}
            inputProps={{ id: "name-input" }}
            placeholder="Enter day time frame name"
            error={errors?.dayTimeFrameName && true}
            helperText={errors?.dayTimeFrameName && errors.dayTimeFrameName}
            onChange={handleChangeFormInput}
          />
        </Box>

        {/* Day time frames */}
        <Box className="form-section form-section-direction">
          <ArrayDayTimeFrame
            formData={formData}
            setFormData={setFormData}
            dayTimeFrames={dayTimeFrames}
            setDayTimeFrames={setDayTimeFrames}
            onChange={handleChangeDayTimeFrames}
            errors={errors ? errors : null}
            isDayTimeFrameDeleted={isDayTimeFrameDeleted}
            setIsDayTimeFrameDeleted={setIsDayTimeFrameDeleted}
          />
        </Box>

        <Box
          sx={{
            mt: "40px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <CustomStyledFormButton onClick={handleCloseModifyForm}>
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

export default ModifyDayTimeFrameForm;
