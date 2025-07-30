import React, {useState, useEffect,useRef } from "react";
import Toast from "./Toast";
import { handleLogin } from "../services/loginService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppStore } from "../../../Store/appStore.jsx";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";



const Credentials = ({ handleGenerateOTP, generatedOtp ,setShowOtpBox, showEmailMsg, showCaptchaMsg, showPasswordMsg, setShowEmailMsg, setShowCaptchaMsg, setShowPasswordMsg, setEmailId, inputs, setInputs,showError, setShowError }) => {
  const {setLoading} = useContext(AppStore)
  const axiosPrivate = useAxiosPrivate()
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [message, setMessage] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);

  useEffect(() => {
    if (showEmailMsg) {
      emailRef.current.focus();
    } else if (showPasswordMsg) {
      passwordRef.current.focus();
    } else if (showCaptchaMsg) {
      captchaRef.current.focus();
    }
  }, [showEmailMsg, showPasswordMsg, showCaptchaMsg]);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setUserInput("");
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    setCaptcha(newCaptcha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "userEmail") {
      let email = value.toLowerCase();

      setEmailId(email);

      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: email,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={(event) =>{
        event.preventDefault()
        handleLogin(
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
        )
      }
      }
    >
      <div className="mb-2 relative">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-gray-700"
        >
          User ID
        </label>
        <input autocomplete="off"
          type="text"
          name="userEmail"
          id="text"
          ref={emailRef}
          autoFocus
          placeholder="User ID or Registered Email ID"
          className={`mt-1 block w-full border-2 rounded-md shadow-sm px-2 py-1 ${
            showEmailMsg ? "border-blue-500" : "border-transparent"
          }  outline-none focus:border-2 focus:border-blue-500 text-xs`}
          onChange={handleChange}
        />
        {showEmailMsg && (
          <div className="absolute bottom-[-45px] left-[20%]">
            <Toast arrow={true} message={message} />
          </div>
        )}
      </div>
      <div className="mb-2 relative">
        <label
          htmlFor="password"
          className="block text-xs font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input autocomplete="off"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            ref={passwordRef}
            autoFocus={showPasswordMsg ? true : false}
            className={`mt-1 block w-full border-2 rounded-md shadow-sm px-2 py-1 ${
              showPasswordMsg ? "border-blue-500" : "border-transparent"
            }  outline-none focus:border-2 focus:border-blue-500 text-xs`}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={!showPassword ? faEyeSlash : faEye}
            className="absolute top-1.5 right-3 cursor-pointer text-black"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
          />
        </div>
        {showPasswordMsg && (
          <div className="absolute bottom-[-45px] left-[20%]">
            <Toast arrow={true} message={message} />
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="flex relative items-center gap-2">
          <div className="flex w-[70%] items-center shadow-lg my-1">
            <input autocomplete="off"
              type="text"
              value={userInput}
              ref={captchaRef}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the text from CAPTCHA alongside"
              className={`mt-1 block w-full border-2 rounded-md shadow-sm px-2 py-2 ${
                showCaptchaMsg ? "border-blue-500" : " border-transparent"
              }  outline-none focus:border-2 
                              focus:border-blue-500 text-xs`}
            />
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={generateCaptcha}
          >
            <FontAwesomeIcon icon={faSync} />
          </div>
          <div
            id="image"
            className="text-xl italic line-through shadow-lg select-none"
          >
            {captcha}
          </div>
          {showCaptchaMsg && (
            <div className="absolute bottom-[-45px] left-[20%]">
              <Toast arrow={true} message={message} />
            </div>
          )}
        </div>
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
        <span>Send OTP</span>
      </button>
    </form>
  );
};

export default Credentials;
