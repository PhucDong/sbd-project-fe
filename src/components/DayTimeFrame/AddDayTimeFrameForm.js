import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomStyledFormButton from "../CustomStyledFormButton";
import dayjs from "dayjs";
import "../../App.css";
import ArrayDayTimeFrame from "./ArrayDayTimeFrame";
import { useState } from "react";
import { validationSchema } from "../../utils/formSchema";
import { formatFormData } from "../../utils/formFormat";

const deviceSerialNumbers = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
];

function AddDayTimeFrameForm(props) {
  const { handleCloseForm, onChange, dayTimeFrameData } =
    props;
  const [errors, setErrors] = useState(null);
  const [openSerialNoDropdownMenu, setOpenSerialNoDropdownMenu] =
    useState(false);
  const [isDayTimeFrameDeleted, setIsDayTimeFrameDeleted] = useState(false);
  const [dayTimeFrames, setDayTimeFrames] = useState([
    {
      dayTimeFrameIndex: 0,
      startingTime: dayjs(null),
      endingTime: dayjs(null),
    },
  ]);
  const [formData, setFormData] = useState({
    serialNumber: deviceSerialNumbers[0].value,
    dayTimeFrameName: "",
    dayTimeFrames: dayTimeFrames,
  });

  const handleCloseSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(false);
  const handleOpenSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(true);

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
      await validationSchema.validate(formData, {
        abortEarly: false,
        context: { dayTimeFrameData: dayTimeFrameData },
      });
      const formattedFormData = formatFormData(formData);
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
        <Typography>Add Day Time Frame</Typography>
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
            required
            select
            hiddenLabel
            value={formData.serialNumber}
            onChange={handleChangeFormInput}
            inputProps={{ id: "serial-number" }}
            error={errors?.serialNumber}
            helperText={errors?.serialNumber && errors.serialNumber}
            SelectProps={{
              open: openSerialNoDropdownMenu,
              onClose: handleCloseSerialNoDropdownMenu,
              onOpen: handleOpenSerialNoDropdownMenu,
              IconComponent: KeyboardArrowRightIcon,
            }}
            sx={{
              "& .MuiSvgIcon-root": {
                transform: openSerialNoDropdownMenu && "rotate(90deg)",
              },
            }}
          >
            {deviceSerialNumbers.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

export default AddDayTimeFrameForm;
