import convertTOddmmyy from "./convertTOddmmyy";

const handleDateSelect = (setStartDate, setEndDate) => (date) => {
  setStartDate(convertTOddmmyy(date.startDate));
  setEndDate(convertTOddmmyy(date.endDate));
};

export default handleDateSelect;
