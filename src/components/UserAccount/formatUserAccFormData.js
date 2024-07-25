export const formatUserAccFormData = (formData) => {
  const currentUserFullName = formData.fullName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
  const formattedUserFullName = currentUserFullName.join(" ");

  const newFormData = {
    ...formData,
    fullName: formattedUserFullName,
  };
  return newFormData;
};
