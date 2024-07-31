import * as Yup from "yup";

export const modifyDeviceFormSchema = Yup.object().shape({
  deviceSerialNumber: Yup.string()
    .test(
      "checkDuplicateSerialNumber",
      "Duplicate serial number. Please enter another one.",
      function (value) {
        if (!value) {
          return true;
        }

        const { deviceData, selectedDevice } = this.options.context;
        const deviceIndex = deviceData.findIndex(
          (device) =>
            device.deviceSerialNumber === selectedDevice.deviceSerialNumber
        );

        let newDeviceData;
        if (deviceIndex === 0) {
          newDeviceData = deviceData.slice(1);
        } else if (deviceIndex === deviceData.length - 1) {
          newDeviceData = deviceData.slice(0, deviceData.length - 1);
        } else {
          newDeviceData = [
            ...deviceData.slice(0, deviceIndex),
            ...deviceData.slice(deviceIndex + 1),
          ];
        }

        const foundIndex = newDeviceData.findIndex(
          (device) => device.deviceSerialNumber === value
        );

        if (foundIndex === -1) {
          return true;
        } else {
          return false;
        }
      }
    )
    .required("Serial number is required."),
  deviceName: Yup.string().required("Name is required."),
  deviceType: Yup.string().min(1, "Please select at least 1 type."),
  deviceModel: Yup.string().required("Model is required."),
  deviceIP: Yup.string()
    .test(
      "checkDuplicateDeviceIP",
      "Duplicate IP address. Please enter another one.",
      function (value) {
        if (!value) {
          return true;
        }

        const { deviceData, selectedDevice } = this.options.context;
        const deviceIndex = deviceData.findIndex(
          (device) => device.deviceIP === selectedDevice.deviceIP
        );

        let newDeviceData;
        if (deviceIndex === 0) {
          newDeviceData = deviceData.slice(1);
        } else if (deviceIndex === deviceData.length - 1) {
          newDeviceData = deviceData.slice(0, deviceData.length - 1);
        } else {
          newDeviceData = [
            ...deviceData.slice(0, deviceIndex),
            ...deviceData.slice(deviceIndex + 1),
          ];
        }

        const foundIndex = newDeviceData.findIndex(
          (device) => device.deviceIP === value
        );

        if (foundIndex === -1) {
          return true;
        } else {
          return false;
        }
      }
    )
    .matches(
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
      {
        message: "IP address is not valid. Please enter another one.",
        excludeEmptyString: true,
      }
    )
    .required("IP address is required."),
});
