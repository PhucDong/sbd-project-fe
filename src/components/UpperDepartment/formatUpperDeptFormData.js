export const formatUpperDeptFormData = (formData) => {
  const currentUpperDeptName = formData.upperDeptName
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    });
  const formattedUpperDeptName = currentUpperDeptName.join(" ");

  const newFormData = {
    ...formData,
    upperDeptName: formattedUpperDeptName,
  };

  return newFormData;
};
