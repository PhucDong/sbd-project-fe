import { Box, InputLabel, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import CustomStyledFormButton from "../_share/CustomStyledFormButton";
import DeviceTypeSection from "./DeviceTypeSection";
import { formatDeviceFormData } from "./formatDeviceFormData";
import { addDeviceFormSchema } from "./addDeviceFormSchema";

function AddDeviceForm(props) {
  const { handleCloseForm, deviceTypeList, onChange, deviceData } = props;
  const [errors, setErrors] = useState(null);

  const deviceNameRef = useRef("");
  const deviceSerialNumberRef = useRef("");
  const deviceTypeRef = useRef("");
  const deviceModelRef = useRef([]);
  const deviceIPRef = useRef("");
  const deviceRemarkRef = useRef("");

  const addDeviceFormDataRef = useRef({
    deviceSerialNumber: "",
    deviceName: "",
    deviceType: "",
    deviceModel: "",
    deviceIP: "",
    deviceRemark: "",
  });

  const handleChangeDeviceSerialNumber = (event) => {
    deviceSerialNumberRef.current = event.target.value;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceSerialNumber: deviceSerialNumberRef.current,
    };
  };

  const handleChangeDeviceName = (event) => {
    deviceNameRef.current = event.target.value;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceName: deviceNameRef.current,
    };
  };

  const handleChangeDeviceType = useCallback((deviceType) => {
    deviceTypeRef.current = deviceType;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceType: deviceTypeRef.current,
    };
  }, []);

  const handleChangeDeviceModel = (event) => {
    deviceModelRef.current = event.target.value;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceModel: deviceModelRef.current,
    };
  };

  const handleChangeDeviceIP = (event) => {
    deviceIPRef.current = event.target.value;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceIP: deviceIPRef.current,
    };
  };

  const handleChangeDeviceRemark = (event) => {
    deviceRemarkRef.current = event.target.value;
    addDeviceFormDataRef.current = {
      ...addDeviceFormDataRef.current,
      deviceRemark: deviceRemarkRef.current,
    };
  };

  const handleSubmitFormData = async (event) => {
    event.preventDefault();
    try {
      const formattedFormData = formatDeviceFormData(
        addDeviceFormDataRef.current
      );
      await addDeviceFormSchema.validate(formattedFormData, {
        abortEarly: false,
        context: { deviceData: deviceData.current },
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
        <Typography>Add Device</Typography>
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
            ref={deviceSerialNumberRef}
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
            ref={deviceNameRef}
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
            ref={deviceModelRef}
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
            ref={deviceIPRef}
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
            ref={deviceRemarkRef}
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

export default AddDeviceForm;
