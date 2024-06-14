export const formatFormData = (formData) => {
  const arrDayTimeFrameName = formData.dayTimeFrameName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
  const formattedDayTimeFrameName = arrDayTimeFrameName.join(" ");

  const newFormData = {
    ...formData,
    dayTimeFrameName: formattedDayTimeFrameName,
  };

  return newFormData;
};
