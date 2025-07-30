import React, { useContext, useEffect, useRef, useState } from "react";
import Toast from "./Toast";
import { handleOtpSubmit } from "../services/loginService";
import { AppStore } from "../../../Store/appStore.jsx";
import { AuthStore } from "../../../Store/authStore";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";


const OtpCredentials = ({ handleGenerateOTP,generatedOtp, showOtpMsg, setShowOtpMsg, inputs, showError, setShowError}) => {
  
  const otpRef = useRef(null);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const {setLoading} = useContext(AppStore)
  const {setUser, setAccessToken} = useContext(AuthStore)
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()

  useEffect(() => {
    setShowError(false)
    if (showOtpMsg) {
      otpRef.current.focus();
    }
  }, [showOtpMsg]);


  return (
    <form onSubmit={(event) =>{
      event.preventDefault()
      handleOtpSubmit(
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
      )
        
    } }>
      <div className="mb-2 relative">
        <label
          htmlFor="otp"
          className="block text-xs font-medium text-gray-700"
        >
          Enter the OTP sent on registered email ID
        </label>
        <input autocomplete="off"
          type="text"
          name="otp"
          id="otp"
          placeholder="Enter OTP"
          autoFocus
          className={`mt-2 block w-full border-2 rounded-md shadow-sm px-2 py-1 ${
            showOtpMsg ? "border-blue-500" : " border-transparent"
          } outline-none focus:border-2 focus:border-blue-500 text-xs`}
          value={otp}
          ref={otpRef}
          onChange={(e) => {
            const input = e.target.value;
            const isValid = /^[0-9]{0,6}$/.test(input);
            if (isValid) {
              setOtp(input);
            }
          }}
        />
        {showOtpMsg && (
          <div className="absolute bottom-[-45px] left-[20%]">
            <Toast arrow={true} message={message} />
          </div>
        )}
      </div>
      <div className="text-xs  px-2 my-2 flex items-center justify-between ">
        <p>{generatedOtp}</p>
        <p
          onClick={() => {
            handleGenerateOTP();
          }}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Resend OTP
        </p>
      </div>
      {showError && (
        <div className="mb-2">
          <Toast arrow={false} message={message} />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-[rgb(0,78,150)] text-white py-2 px-2 rounded-md shadow-sm flex items-center justify-center text-sm"
      >
        <span>Submit OTP</span>
      </button>
    </form>
  );
};

export default OtpCredentials;
