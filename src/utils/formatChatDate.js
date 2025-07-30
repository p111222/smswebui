import moment from "moment";
import convertUtcIntoIST from "./convertUtcIntoIST";

const formatChatDate = (date) => {

  function isValidDate(dateString) {
    const format = 'DD-MM-YYYY HH:mm:ss';
    const date = moment(dateString, format, true);
    return date.isValid() && date.format(format) === dateString;
  }

  const now = moment();
  const IST = isValidDate(date) ? date : convertUtcIntoIST(date);
  const inputDate = moment(IST, "DD-MM-YYYY HH:mm:ss");

  if (now.isSame(inputDate, "day")) {
    return `Today at ${inputDate.format("hh:mm A")}`;
  } else if (now.diff(inputDate, "days") === 1) {
    return `Yesterday at ${inputDate.format("hh:mm A")}`;
  } else if (now.isSame(inputDate, "year")) {
    return `${inputDate.format("DD MMM")} at ${inputDate.format("hh:mm A")}`;
  } else {
    return `${inputDate.format("DD MMM YYYY")} at ${inputDate.format(
      "hh:mm A"
    )}`;
  }
};

export default formatChatDate;
