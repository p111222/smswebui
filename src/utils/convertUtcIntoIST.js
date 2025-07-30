import moment from "moment-timezone";

const convertUtcIntoIST = (utcTimeString) => {
  const utcTime = moment.utc(utcTimeString, "YYYY-MM-DDTHH:mm:ss.SSS[SSS]");
  const istTime = utcTime.clone().tz("Asia/Kolkata");

  return istTime.format("DD-MM-YYYY HH:mm:ss");
};


export default convertUtcIntoIST;
