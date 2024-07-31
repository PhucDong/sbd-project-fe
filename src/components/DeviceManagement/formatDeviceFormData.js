export const formatDeviceFormData = (formData) => {
  const { deviceSerialNumber, deviceName, deviceModel } = formData;

  const formattedDeviceSerialNumber = deviceSerialNumber.toUpperCase();

  const formattedDeviceName = deviceName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    })
    .join(" ");

  const formattedDeviceModel = deviceModel.toUpperCase();

  const newFormData = {
    ...formData,
    deviceSerialNumber: formattedDeviceSerialNumber,
    deviceName: formattedDeviceName,
    deviceModel: formattedDeviceModel,
  };
  
  return newFormData;
};
