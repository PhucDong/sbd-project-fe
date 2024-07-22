import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useRef, useState } from "react";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import dayjs from "dayjs";
import DeptListSection from "./DeptListSection";
import { formatUpperDeptFormData } from "./formatUpperDeptFormData";
import { addUpperDeptFormSchema } from "./addUpperDeptFormSchema";

function AddUpperDeptForm(props) {
  const { handleCloseForm, onChange, manageDeptList, upperDeptData } = props;
  const [errors, setErrors] = useState(null);

  const upperDeptNameRef = useRef("");
  const createDateRef = useRef(dayjs(null));
  const remarkRef = useRef("");

  const addFormDataRef = useRef({
    upperDeptName: upperDeptNameRef.current,
    deptList: [],
    deptNameList: [],
    deptCodeList: [],
    deptPhoneList: [],
    createDate: createDateRef.current,
    remark: remarkRef.current,
  });

  const handleChangeUpperDeptName = (event) => {
    upperDeptNameRef.current = event.target.value;
    addFormDataRef.current = {
      ...addFormDataRef.current,
      upperDeptName: upperDeptNameRef.current,
    };
  };

  const handleChangeRemark = (event) => {
    remarkRef.current = event.target.value;
    addFormDataRef.current = {
      ...addFormDataRef.current,
      remark: remarkRef.current,
    };
  };

  const handleChangeCreateDate = (newCreateDate) => {
    createDateRef.current = newCreateDate;
    addFormDataRef.current = {
      ...addFormDataRef.current,
      createDate: createDateRef.current,
    };
  };

  const handleChangeDeptList = useCallback((data) => {
    addFormDataRef.current = {
      ...addFormDataRef.current,
      deptList: data,
      deptNameList: data.map((item) => item.deptName),
      deptCodeList: data.map((item) => item.deptCode),
      deptPhoneList: data.map((item) => item.deptPhone),
    };
  }, []);

  const handleSubmitFormData = async (event) => {
    event.preventDefault();

    try {
      const formattedFormData = formatUpperDeptFormData(addFormDataRef.current);
      await addUpperDeptFormSchema.validate(formattedFormData, {
        abortEarly: false,
        context: { upperDeptData: upperDeptData.current },
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
        <Typography>Add Upper Department</Typography>
      </Box>
      <Box className="form-body">
        {/* Upper Dept Name */}
        <Box className="form-section">
          <InputLabel
            id="upper-dept-name-label"
            className="section-label"
            htmlFor="upper-dept-name"
          >
            Upper Dept Name
          </InputLabel>
          <TextField
            name="upperDeptName"
            className="section-input"
            required
            hiddenLabel
            ref={upperDeptNameRef}
            inputProps={{ id: "upper-dept-name" }}
            placeholder="Enter upper dept name"
            error={errors?.upperDeptName && true}
            helperText={errors?.upperDeptName && errors.upperDeptName}
            onChange={handleChangeUpperDeptName}
          />
        </Box>

        {/* Dept List */}
        <DeptListSection
          manageDeptList={manageDeptList}
          onChange={handleChangeDeptList}
          errors={errors}
        />

        {/* Create Date */}
        <Box className="form-section">
          <Box
            component="label"
            htmlFor="create-date"
            className="section-label"
          >
            Create Date
          </Box>
          <DatePicker
            className="section-input"
            name="createDate"
            inputRef={createDateRef}
            onChange={handleChangeCreateDate}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                id: "create-date",
                error: errors?.createDate && true,
                helperText: errors?.createDate && errors.createDate,
              },
            }}
          />
        </Box>

        {/* Remark */}
        <Box className="form-section">
          <InputLabel
            id="remark-label"
            className="section-label"
            htmlFor="remark"
          >
            Remark
          </InputLabel>
          <TextField
            name="remark"
            className="section-input"
            hiddenLabel
            multiline
            rows={4}
            ref={remarkRef}
            inputProps={{ id: "remark" }}
            placeholder="Enter your remark"
            onChange={handleChangeRemark}
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

export default AddUpperDeptForm;
