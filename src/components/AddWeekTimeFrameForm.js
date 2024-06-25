import {
  Box,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomStyledFormButton from "./CustomStyledFormButton";
import dayjs from "dayjs";
import "../App.css";
import ArrayDayTimeFrame from "./ArrayDayTimeFrame";
import { useState } from "react";
import { validationSchema } from "../utils/formSchema";
import { formatFormData } from "../utils/formFormat";

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

function AddWeekTimeFrameForm(props) {
  const { handleCloseForm, onChange } = [props];
  const [errors, setErrors] = useState(null);
  const [openSerialNoDropdownMenu, setOpenSerialNoDropdownMenu] = useState(false);
  const [isWeekTimeFrameDeleted, setIsWeekTimeFrameDeleted] = useState(false);
  const [weekTimeFrames, setWeekTimeFrames] = useState([
    {
      weekTimeFrameIndex: 0,
      startingTime: dayjs(null),
      endingTime: dayjs(null),
    },
  ]);
  const [formData, setFormData] = useState({
    serialNumber: deviceSerialNumbers[0].value,
    weekTimeFrameName: "",
    weekTimeFrames: weekTimeFrames,
  });

  const handleOpenSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(true);

  const handleCloseSerialNoDropdownMenu = () =>
    setOpenSerialNoDropdownMenu(false);

  const handleChangeFormInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeWeekTimeFrames = (newWeekTimeFrameArray) => {
    setFormData({ ...formData, weekTimeFrames: [...newWeekTimeFrameArray] });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const formattedFormData = formatFormData(formData);
      onChange(formattedFormData);
      handleCloseForm();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <>
      <Box className="form-header">
        <Typography>Add Week Time Frame</Typography>
      </Box>
      <Box className="form-body">
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
          type="number" max="999" step="1"
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
          {/*this shit missing*/}
        </TextField>
      </Box>
      <Box className="form-section">
        <InputLabel
          id="name-input-label"
          className="section-label"
          htmlFor="name-input"
        >
          Name
        </InputLabel>
        <TextField
          name="weekTimeFrameName"
          className="section-input"
          required
          type="text"
          hiddenLabel
          value={formData.weekTimeFrameName}
          inputProps={{ id: "name-input" }}
        placeholder="Enter week time frame name"
        error = {errors?.weekTimeFrameName && errors.weekTimeFrameName}
        onChange={handleChangeFormInput}
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
        <CustomStyledFormButton onClick={handleCloseForm}>
          Cancel
        </CustomStyledFormButton>
        <CustomStyledFormButton onClick={handleSubmitFormData}>
          Save
        </CustomStyledFormButton>
      </Box>
    </>
  )
}

export default AddWeekTimeFrameForm;
