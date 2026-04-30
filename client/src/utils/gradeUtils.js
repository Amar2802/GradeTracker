export const getGradeBadgeClass = (grade) => {
  switch (grade) {
    case "A":
      return "success";
    case "B":
      return "primary";
    case "C":
      return "warning";
    case "D":
      return "secondary";
    default:
      return "danger";
  }
};

export const calculateAveragePercentage = (grades) => {
  if (!grades.length) {
    return 0;
  }

  const totalPercentage = grades.reduce(
    (sum, item) => sum + Number(item.percentage || 0),
    0
  );

  return (totalPercentage / grades.length).toFixed(2);
};
