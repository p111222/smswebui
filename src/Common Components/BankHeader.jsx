import React, { useContext, useEffect, useState } from "react";
import FederalBankLogo from "../assets/siblogo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuComponent from "./MenuComponent.jsx";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeRequest } from "../Axios.js";
import convertUtcIntoIST from "../utils/convertUtcIntoIST.js";
import { AuthStore } from "../Store/authStore.jsx";
import { AppStore } from "../Store/appStore.jsx";
import Loader from "./Loader.jsx";
import Toastify from "./Toastify.jsx";
import { useKeycloak } from "@react-keycloak/web";

const BankHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useContext(AuthStore);
  const { loading, setLoading, type, message, setShowToast, showToast } =
    useContext(AppStore);
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    return () => {
      setUser(null);
      keycloak.logout();
    };
  }, []);

  // useEffect(() => {
  //   if (!window.location.pathname.includes("customeronboarding")) {
  //     localStorage.clear();
  //     console.log("Cleared");
  //   }
  // }, [window.location.pathname]);

  const menuItems = [{ text: "Logout", icon: <LogoutIcon /> }];
  const navigate = useNavigate();

  const handleItemClick = (text) => {
    setLoading(true);
    if (text === "Logout") {
      keycloak.logout();
      setUser(null)
    }
  };

  const getRole = (userType) => {
    if (userType === "useradmin") {
      return "User Admin"
    } else if (userType === "backOfficeUser") {
      return "Back Office User"
    } else if (userType === "grievanceRedressal") {
      return "Grievance Redressal"
    } else if (userType === "itSupport") {
      return "IT Support"
    } else if (userType === "branchMaker") {
      return "Branch Maker"
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <div className="flex justify-between relative bg-white items-center py-1">
        <div className="mx-6 cursor-pointer">
          <img
            src={FederalBankLogo}
            alt="Federal Bank Logo"
            style={{ width: "8em" }}
          />
        </div>
        {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <span className="text-[27px] font-[900]  text-[rgb(150, 0, 145)] font-brlnsr">
            Notification{" "}
          </span>
          <span className="text-[27px] font-[900] text-[#FAA61A] font-brlnsr">
            Hub
          </span>
        </div> */}
        <div className="flex items-center">
          <div className="space-y-[1px]">
            {user && user.lastLogin && (
              <p className="text-[14px] text-neutral-500">{`Last Login: ${user.lastLogin}`}</p>
            )}
            {user && user.userType && (
              <p className="text-[14px] text-neutral-500">
                Role: {getRole(user.userType)}
              </p>
            )}
          </div>
          <p className="text-neutral-500 w-[2px] h-7 bg-neutral-500 mx-4"></p>
          <div
            onClick={handleClick}
            className="flex text-neutral-500 cursor-pointer gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className="flex items-center">
              <p className="text-[14px]">{user ? user.userName : "Guest"}</p>
              <KeyboardArrowDownIcon />
            </div>
          </div>
          {anchorEl && (
            <MenuComponent
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              menuItems={menuItems}
              handleItemClick={handleItemClick}
            />
          )}
        </div>
      </div>
      {/* Loading */}
      <Loader />
      <Toastify
        message={message}
        setShowToast={setShowToast}
        showToast={showToast}
        type={type}
      />
    </div>
  );
};

export default BankHeader;
