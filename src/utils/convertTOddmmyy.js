const convertTOddmmyy = (date) => {
  const currDate = date.getDate();
  const currMonth = date.getMonth() + 1;
  const currYear = date.getFullYear();
  const fullDate = `${currDate < 10 ? `0${currDate}` : currDate}-${
    currMonth < 10 ? `0${currMonth}` : currMonth
  }-${currYear < 10 ? `0${currYear}` : currYear}`;
  console.log("Full Date: ", fullDate);
  return fullDate;
};

export default convertTOddmmyy;
