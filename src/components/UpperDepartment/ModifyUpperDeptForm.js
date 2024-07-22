import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useRef, useState } from "react";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import dayjs from "dayjs";
import DeptListSection from "./DeptListSection";
import { modifyUpperDeptFormSchema } from "./modifyUpperDeptFormSchema";
import { formatUpperDeptFormData } from "./formatUpperDeptFormData";

function ModifyUpperDeptForm(props) {
  const {
    selectedRowData,
    handleCloseForm,
    onChange,
    manageDeptList,
    upperDeptData,
  } = props;
  const [errors, setErrors] = useState(null);

  const upperDeptName = selectedRowData.upperDeptName
    ? selectedRowData.upperDeptName
    : "";
  const [createDate, setCreateDate] = useState(
    selectedRowData.createDate.isValid()
      ? selectedRowData.createDate
      : dayjs(null)
  );
  const [remark, setRemark] = useState(
    selectedRowData.remark && selectedRowData.remark
  );

  const modifyFormDataRef = useRef({
    upperDeptName: upperDeptName,
    deptList: [],
    deptNameList: [],
    deptCodeList: [],
    deptPhoneList: [],
    createDate: createDate,
    remark: remark,
  });

  const handleChangeRemark = (event) => {
    const { value } = event.target;
    setRemark(value);
    modifyFormDataRef.current = {
      ...modifyFormDataRef.current,
      remark: value,
    };
  };

  const handleChangeCreateDate = (newCreateDate) => {
    setCreateDate(newCreateDate);
    modifyFormDataRef.current = {
      ...modifyFormDataRef.current,
      createDate: newCreateDate,
    };
  };

  const handleChangeDeptList = useCallback((data) => {
    modifyFormDataRef.current = {
      ...modifyFormDataRef.current,
      deptList: data,
      deptNameList: data.map((item) => item.deptName),
      deptCodeList: data.map((item) => item.deptCode),
      deptPhoneList: data.map((item) => item.deptPhone),
    };
  }, []);

  const handleSubmitFormData = async (event) => {
    event.preventDefault();

    try {
      const formattedFormData = formatUpperDeptFormData(modifyFormDataRef.current);
      await modifyUpperDeptFormSchema.validate(formattedFormData, {
        abortEarly: false,
        context: {
          selectedUpperDeptName: selectedRowData.upperDeptName,
          upperDeptData: upperDeptData,
        },
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
        <Typography>Modify Upper Department</Typography>
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
            disabled
            defaultValue={upperDeptName}
            inputProps={{ id: "upper-dept-name" }}
          />
        </Box>

        {/* Dept List */}
        <DeptListSection
          selectedRowData={selectedRowData}
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
            value={createDate}
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
            value={remark}
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

export default ModifyUpperDeptForm;
