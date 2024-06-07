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
import * as Yup from "yup";
import ArrayDayTimeFrame from "./ArrayDayTimeFrame";
import { useState } from "react";

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

// Validate form inputs with Yup
const validationSchema = Yup.object().shape({
  serialNumber: Yup.string().required("Serial number is required."),
  dayTimeFrameName: Yup.string().required("Day time frame name is required."),
  dayTimeFrames: Yup.array(
    Yup.object().shape({
      startingTime: Yup.date().required(),
      endingTime: Yup.date().required(),
    })
  ).required(),
});

function AddDayTimeFrameForm({ handleCloseAddForm }) {
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
      await validationSchema.validate(formData, { abortEarly: false });
      handleCloseAddForm();
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
          <CustomStyledFormButton onClick={handleCloseAddForm}>
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

// <form onSubmit={handleSubmit} className="form">
//   <div>
//     <label htmlFor="firstName">First name:</label>
//     <input
//       id="firstName"
//       type="text"
//       name="firstName"
//       value={formData?.firstName}
//       autoComplete="on"
//       placeholder="Enter your first name"
//       onChange={handleChange}
//     />
//     {errors?.firstName && <div className="error">{errors.firstName}</div>}
//   </div>
//   <div>
//     <label htmlFor="lastName">Last name:</label>
//     <input
//       id="lastName"
//       type="text"
//       name="lastName"
//       value={formData.lastName}
//       autoComplete="on"
//       placeholder="Enter your last name"
//       onChange={handleChange}
//     />
//     {errors?.lastName && <div className="error">{errors.lastName}</div>}
//   </div>
//   <div>
//     <label htmlFor="email">Email:</label>
//     <input
//       id="email"
//       type="text"
//       name="email"
//       value={formData.email}
//       autoComplete="on"
//       placeholder="Enter your email"
//       onChange={handleChange}
//     />
//     {errors?.email && <div className="error">{errors.email}</div>}
//   </div>
//   <div>
//     <label htmlFor="phoneNumber">Phone number:</label>
//     <input
//       id="phoneNumber"
//       type="text"
//       name="phoneNumber"
//       value={formData.phoneNumber}
//       autoComplete="on"
//       placeholder="Enter your phone number"
//       onChange={handleChange}
//     />
//     {errors?.phoneNumber && (
//       <div className="error">{errors.phoneNumber}</div>
//     )}
//   </div>
//   <div>
//     <label htmlFor="password">Password:</label>
//     <input
//       id="password"
//       type="password"
//       name="password"
//       value={formData.password}
//       placeholder="Enter your password"
//       onChange={handleChange}
//     />
//     {errors?.password && <div className="error">{errors.password}</div>}
//   </div>
//   <div>
//     <label htmlFor="confirmPassword">Confirm password:</label>
//     <input
//       id="confirmPassword"
//       type="password"
//       name="confirmPassword"
//       value={formData.confirmPassword}
//       placeholder="Confirm your password"
//       onChange={handleChange}
//     />
//     {errors?.confirmPassword && (
//       <div className="error">{errors.confirmPassword}</div>
//     )}
//   </div>
//   <div>
//     <label htmlFor="age">Age:</label>
//     <input
//       id="age"
//       type="number"
//       name="age"
//       value={formData.age}
//       autoComplete="on"
//       placeholder="Enter your age"
//       onChange={handleChange}
//     />
//     {errors?.age && <div className="error">{errors.age}</div>}
//   </div>
//   <div>
//     <label htmlFor="gender">Gender:</label>
//     <select
//       id="gender"
//       name="gender"
//       value={formData.gender}
//       onChange={handleChange}
//     >
//       <option value="male">Male</option>
//       <option value="female">Female</option>
//       <option value="other">Other</option>
//     </select>
//     {errors?.gender && <div className="error">{errors.gender}</div>}
//   </div>
//   <div>
//     <label>Interests:</label>
//     <label htmlFor="coding">
//       <input
//         id="coding"
//         type="checkbox"
//         name="coding"
//         checked={formData.interests.includes("coding")}
//         onChange={handleCheckboxChange}
//       />
//       Coding
//     </label>
//     <label htmlFor="sports">
//       <input
//         id="sports"
//         type="checkbox"
//         name="sports"
//         checked={formData.interests.includes("sports")}
//         onChange={handleCheckboxChange}
//       />
//       Sports
//     </label>
//     <label htmlFor="reading">
//       <input
//         id="reading"
//         type="checkbox"
//         name="reading"
//         checked={formData.interests.includes("reading")}
//         onChange={handleCheckboxChange}
//       />
//       Reading
//     </label>
//     {errors?.interests && <div className="error">{errors.interests}</div>}
//   </div>
//   <div>
//     <label htmlFor="birthDate">Date of birth:</label>
//     <input
//       id="birthDate"
//       type="date"
//       name="birthDate"
//       value={formData.birthDate}
//       placeholder="Enter your date of birth"
//       onChange={handleChange}
//     />
//     {errors?.birthDate && <div className="error">{errors.birthDate}</div>}
//   </div>
//   <button type="submit">Submit</button>
// </form>

// <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//   <Stack spacing={2}>
//     {!!errors.responseError && (
//       <Alert severity="error">{errors.responseError.message}</Alert>
//     )}
//     <FTextField
//       name="name"
//       fullWidth
//       rows={4}
//       placeholder="Name"
//       sx={{
//         "& fieldset": {
//           borderWidth: `1px !important`,
//           borderColor: alpha("#919EAB", 0.32),
//         },
//       }}
//     />
//     <FTextField
//       name="url"
//       fullWidth
//       placeholder="Image Url"
//       sx={{
//         "& fieldset": {
//           borderWidth: `1px !important`,
//           borderColor: alpha("#919EAB", 0.32),
//         },
//       }}
//     />
//     <FTextField
//       name="type1"
//       fullWidth
//       rows={4}
//       placeholder="Type 1"
//       sx={{
//         "& fieldset": {
//           borderWidth: `1px !important`,
//           borderColor: alpha("#919EAB", 0.32),
//         },
//       }}
//     />
//     <FTextField
//       name="type2"
//       fullWidth
//       rows={4}
//       placeholder="Type 2"
//       sx={{
//         "& fieldset": {
//           borderWidth: `1px !important`,
//           borderColor: alpha("#919EAB", 0.32),
//         },
//       }}
//     />

//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-end",
//       }}
//     >
//       <LoadingButton
//         type="submit"
//         variant="contained"
//         size="small"
//         loading={isSubmitting}
//       >
//         Create Pokemon
//       </LoadingButton>
//     </Box>
//   </Stack>
// </FormProvider>

// const handleCheckboxChange = (e) => {
//   const { name, checked } = e.target;
//   let updatedInterests = [...formData.interests];

//   if (checked) {
//     updatedInterests.push(name);
//   } else {
//     updatedInterests = updatedInterests.filter(
//       (interest) => interest !== name
//     );
//   }

//   setFormData({
//     ...formData,
//     interests: updatedInterests,
//   });
// };

// const onSubmit = (data) => {
//   let { name, url, type1, type2 } = data;

//   try {
//     if (!name || !url || !type1) {
//       throw new Error(
//         "Missing form information. Remember that each pokemon has either 1 or 2 types."
//       );
//     }
//     name = name.toLowerCase();
//     type1 = type1.toLowerCase();

//     const duplicatePokemon = pokemonNames.filter(
//       (pokemonName) => pokemonName === name
//     );

//     if (duplicatePokemon.length > 0) {
//       throw new Error("Pokemon already exists.");
//     }

//     const isPokemonType1Valid = pokemonTypes.includes(type1);
//     if (isPokemonType1Valid === false) {
//       throw new Error("Pokemon's type 1 is invalid.");
//     }

//     if (type2) {
//       type2 = type2.toLowerCase();
//       const isPokemonType2Valid = pokemonTypes.includes(type2);

//       if (isPokemonType2Valid === false) {
//         throw new Error("Pokemon's type 2 is invalid.");
//       }
//     }

//     dispatch(
//       addPokemon({
//         name,
//         imgUrl: url,
//         types: type2 ? [type1, type2] : [type1],
//       })
//     );
//     // navigate(`/pokemons/${id}`);
//     setOpen(false);
//     reset();
//   } catch (error) {
//     setError("responseError", { message: error.message });
//   }
// };
