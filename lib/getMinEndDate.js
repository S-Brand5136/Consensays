export const getMinEndDate = (curentDate) => {
  const date = new Date(curentDate);
  date.setDate(date.getDate() + 1);

  return date;
};
