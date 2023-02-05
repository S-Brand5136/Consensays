export const getMinEndDate = (date) => {
  var date = new Date(date);
  date.setDate(date.getDate() + 1);

  return date;
};
