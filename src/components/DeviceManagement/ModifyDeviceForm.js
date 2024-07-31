import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import DeviceTypeSection from "./DeviceTypeSection";
import { modifyDeviceFormSchema } from "./modifyDeviceFormSchema";
import { formatDeviceFormData } from "./formatDeviceFormData";

function ModifyDeviceForm(props) {
  const {
    selectedRowData,
    handleCloseForm,
    onChange,
    deviceTypeList,
    deviceData,
  } = props;
  const [errors, setErrors] = useState(null);
  const [deviceSerialNumber, setDeviceSerialNumber] = useState(
    selectedRowData.deviceSerialNumber ? selectedRowData.deviceSerialNumber : ""
  );
  const [deviceName, setDeviceName] = useState(
    selectedRowData.deviceName ? selectedRowData.deviceName : ""
  );
  const [deviceType, setDeviceType] = useState(
    selectedRowData.deviceType ? selectedRowData.deviceType : ""
  );
  const [deviceModel, setDeviceModel] = useState(
    selectedRowData.deviceModel ? selectedRowData.deviceModel : ""
  );
  const [deviceIP, setDeviceIP] = useState(
    selectedRowData.deviceIP ? selectedRowData.deviceIP : ""
  );
  const [deviceRemark, setDeviceRemark] = useState(
    selectedRowData.deviceRemark ? selectedRowData.deviceRemark : ""
  );

  const modifyUserAccFormDataRef = useRef({
    deviceSerialNumber: deviceSerialNumber,
    deviceName: deviceName,
    deviceType: deviceType,
    deviceModel: deviceModel,
    deviceIP: deviceIP,
    deviceRemark: deviceRemark,
  });

  const handleChangeDeviceSerialNumber = (event) => {
    setDeviceSerialNumber(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceSerialNumber: event.target.value,
    };
  };

  const handleChangeDeviceName = (event) => {
    setDeviceName(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceName: event.target.value,
    };
  };

  const handleChangeDeviceType = useCallback((deviceType) => {
    setDeviceType(deviceType);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceType: deviceType,
    };
  }, []);

  const handleChangeDeviceModel = (event) => {
    setDeviceModel(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceModel: event.target.value,
    };
  };

  const handleChangeDeviceIP = (event) => {
    setDeviceIP(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceIP: event.target.value,
    };
  };

  const handleChangeDeviceRemark = (event) => {
    setDeviceRemark(event.target.value);
    modifyUserAccFormDataRef.current = {
      ...modifyUserAccFormDataRef.current,
      deviceRemark: event.target.value,
    };
  };

  const handleSubmitFormData = async (event) => {
    event.preventDefault();

    try {
      const formattedFormData = formatDeviceFormData(
        modifyUserAccFormDataRef.current
      );
      await modifyDeviceFormSchema.validate(formattedFormData, {
        abortEarly: false,
        context: {
          deviceData: deviceData.current,
          selectedDevice: selectedRowData,
        },
      });
      setErrors(null);
      onChange({
        selectedRowData: selectedRowData,
        formattedFormData: formattedFormData,
      });
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
        <Typography>Modify Device</Typography>
      </Box>
      <Box className="form-body">
        {/* Device serial number */}
        <Box className="form-section">
          <InputLabel
            id="device-serial-number-label"
            className="section-label"
            htmlFor="device-serial-number"
          >
            Serial number
          </InputLabel>
          <TextField
            name="deviceSerialNumber"
            className="section-input"
            required
            hiddenLabel
            value={deviceSerialNumber}
            inputProps={{ id: "device-serial-number" }}
            placeholder="Enter device serial number"
            error={errors?.deviceSerialNumber && true}
            helperText={errors?.deviceSerialNumber && errors.deviceSerialNumber}
            onChange={handleChangeDeviceSerialNumber}
          />
        </Box>

        {/* Device name */}
        <Box className="form-section">
          <InputLabel
            id="device-name-label"
            className="section-label"
            htmlFor="device-name"
          >
            Device name
          </InputLabel>
          <TextField
            name="deviceName"
            className="section-input"
            required
            hiddenLabel
            value={deviceName}
            inputProps={{ id: "device-name" }}
            placeholder="Enter device name"
            error={errors?.deviceName && true}
            helperText={errors?.deviceName && errors.deviceName}
            onChange={handleChangeDeviceName}
          />
        </Box>

        {/* Device type */}
        <DeviceTypeSection
          errors={errors}
          deviceTypeList={deviceTypeList}
          onChange={handleChangeDeviceType}
          selectedRowData={selectedRowData}
        />

        {/* Device model */}
        <Box className="form-section">
          <InputLabel
            id="device-model-label"
            className="section-label"
            htmlFor="device-model"
          >
            Model
          </InputLabel>
          <TextField
            name="deviceModel"
            className="section-input"
            required
            hiddenLabel
            value={deviceModel}
            inputProps={{ id: "device-model" }}
            placeholder="Enter device model"
            error={errors?.deviceModel && true}
            helperText={errors?.deviceModel && errors.deviceModel}
            onChange={handleChangeDeviceModel}
          />
        </Box>

        {/* Device IP */}
        <Box className="form-section">
          <InputLabel
            id="device-ip-label"
            className="section-label"
            htmlFor="device-ip"
          >
            Device IP
          </InputLabel>
          <TextField
            name="deviceIP"
            className="section-input"
            required
            hiddenLabel
            value={deviceIP}
            inputProps={{ id: "device-ip" }}
            placeholder="Enter device IP"
            error={errors?.deviceIP && true}
            helperText={errors?.deviceIP && errors.deviceIP}
            onChange={handleChangeDeviceIP}
          />
        </Box>

        {/* Device remark */}
        <Box className="form-section">
          <InputLabel
            id="device-remark-label"
            className="section-label"
            htmlFor="device-remark"
          >
            Remark
          </InputLabel>
          <TextField
            name="deviceRemark"
            className="section-input"
            required
            hiddenLabel
            multiline
            rows={4}
            value={deviceRemark}
            inputProps={{ id: "device-remark" }}
            placeholder="Enter device remark"
            onChange={handleChangeDeviceRemark}
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

export default ModifyDeviceForm;
