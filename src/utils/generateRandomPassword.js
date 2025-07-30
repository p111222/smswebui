// Generate Random Alphanumeric Password
const generateRandomPassword = () => {
  const alphaNumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let randomPassword = "";
  for (let i = 0; i < 20; i++) {
    randomPassword =
      randomPassword +
      alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }

  return randomPassword;
};

export default generateRandomPassword;
