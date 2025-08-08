import axios from "axios";
import encryptData from "../../../utils/encryptData";
import { makeRequest } from "../../../Axios";

export const handleLogin = async (
  axiosPrivate,
  inputs,
  setInputs,
  userInput,
  captcha,
  generatedOtp,
  setMessage,
  setShowEmailMsg,
  setShowPasswordMsg,
  setShowCaptchaMsg,
  handleGenerateOTP,
  setShowOtpBox,
  setShowError,
  generateCaptcha,
  setUserInput,
  setLoading
) => {
  if (inputs.userEmail === "") {
    setMessage("Please enter your email.");
    setShowEmailMsg(true);
    setShowError(false);
    return;
  }
  if (inputs.password === "") {
    setMessage("Please enter your password.");
    setShowPasswordMsg(true);
    setShowError(false);
    return;
  }
  if (userInput === "") {
    setMessage("Please complete the captcha.");
    setShowCaptchaMsg(true);
    setShowError(false);
    return;
  }
  setLoading(true);
  const domain = "@federalbank.co.in";
  let email = inputs.userEmail.toLowerCase();
  if (!inputs.userEmail.includes("@") || inputs.userEmail.endsWith(domain)) {
    if (!inputs.userEmail.includes(domain)) {
      email = email + domain;
    }
  }
  const newInput = {
    userEmail: email,
    password: inputs.password,
  };

  const encryptedData = await encryptData(newInput);

  if (userInput === captcha) {
    try {
      const res = await axiosPrivate.post(
        `/api/auth/initialCheck`,
        { inputs: encryptedData }
      );
      if (res.data.valid) {
        // Only generate OTP if one hasn't been generated already
        if (!generatedOtp) {
          handleGenerateOTP(inputs);
        }
        setShowOtpBox(true);
        startTimeout();
        setShowError(false);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setMessage("This user is dormant. Kindly contact your admin.");
        setShowError(true);
        generateCaptcha();
      } else {
        setMessage("Invalid Credentials.");
        generateCaptcha();
        setShowError(true);
      }
    } finally {
      setLoading(false);
    }
  } else {
    setMessage("Invalid captcha. Please try again.");
    setShowCaptchaMsg(true);
    setShowError(false);
    setUserInput("");
    generateCaptcha();
    setLoading(false);
  }
};

export const handleOtpSubmit = async (
  navigate,
  axiosPrivate,
  otp,
  generatedOtp,
  inputs,
  setMessage,
  setShowOtpMsg,
  setLoading,
  setUser,
  setShowError,
  setOtp,
  setAccessToken
) => {
  if (otp === "") {
    setMessage("Please enter the OTP.");
    setShowOtpMsg(true);
    return;
  }

  setLoading(true);

  const encryptedData = await encryptData(inputs);

  if (otp === generatedOtp) {
    try {
      const res = await axiosPrivate.post(import.meta.env.VITE_BASE_URL + "/api/auth/login", {
        inputs: encryptedData,
      });
      const userData = res.data;
      setUser(userData);
      setAccessToken(userData.accessToken);
      navigateToUserPage(
        userData.userType,
        userData.pageAccess[0],
        navigate,
        userData.pwdResetReq
      );
    } catch (error) {
      if (
        error?.status === 409 &&
        error?.response?.data?.message ===
        "Not able to login please contact your administrator"
      ) {
        setShowError(true);
        setMessage("Kindly contact your admin.");
      } else if (
        error?.status === 409 &&
        error?.response?.data?.message === "User is already logged in."
      ) {
        setShowError(true);
        setMessage("User is already logged in.");
      }
    } finally {
      setOtp("");
      setLoading(false);
    }
  } else {
    setLoading(false);
    setOtp("");
    setShowError(true);
    setMessage("Invalid OTP. Please try again.");
  }
};

export const getPage = (page) => {

  if (page === "Customer Requests") {
    return "customerrequests";
  } else if (page === "SMS Opt-In/Out") {
    return "smsoptinout";
  } else if (page === "SMS Block Lift") {
    return "smsblocklift";
  } else if (page === "Phone Number Addition") {
    return "phonenumberaddition";
  } else if (page === "Mpin Generation") {
    return "mpingeneration";
  } else if (page === "SMS View Log") {
    return "smsviewlog";
  } else if (page === "VA Maintenance") {
    return "vamaintenance";
  } else if (page === "Reconciliation") {
    return "reconciliation";
  } else if (page === "Branch Module for Cash and Cheque") {
    return "branchmodule";
  } else if (page === "Task Board") {
    return "taskboard";
  } else if (page === "IT Support") {
    return "itsupport";
  } else if (page === "Approval Audit Log") {
    return "approvalauditlog";
  } else if (page === "Support") {
    return "support";
  } else if (page === "VA Creation") {
    return "vacreation";
  } else if (page === "Reports") {
    return "report";
  } else if (page === "API Audit Log") {
    return "apiauditlog";
  } else if (page === "User Management") {
    return "adminmodule";
  } else if (page === "User Creation") {
    return "corporateadmin";
  } else if (page === "Grievance Redressal") {
    return "grievanceredressal";
  } else {
    return "pagenotfound";
  }
};

export const navigateToUserPage = (userType, page, navigate, pwdResetReq) => {
  if (!userType || !page) {
    console.error("User type or page is undefined", { userType, page });
    return;
  }

  console.log("navigatetouserpage function" + userType);


  switch (userType) {
    case "useradmin":
      navigate(`/smsweb/useradmin/${getPage(page)}`);
      break;
    case "backOfficeUser":
      navigate(`/smsweb/backofficeuser/${getPage(page)}`);
      break;
    case "itSupport":
      navigate(`/smsweb/itsupport/${getPage(page)}`);
      break;
    case "branchuser":
      navigate(`/smsweb/branchuser/${getPage(page)}`);
      break;
    case "grievanceRedressal":
      navigate(`/smsweb/grievanceredressal/${getPage(page)}`);
      break;
    default:
      navigate("/");
      break;
  }
};
