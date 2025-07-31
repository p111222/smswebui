// import React, { useContext, useEffect, useState } from "react";
// import FederalBankLogo from "../assets/siblogo.png";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import MenuComponent from "./MenuComponent.jsx";
// import { useNavigate } from "react-router-dom";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { makeRequest } from "../Axios.js";
// import convertUtcIntoIST from "../utils/convertUtcIntoIST.js";
// import { AuthStore } from "../Store/authStore.jsx";
// import { AppStore } from "../Store/appStore.jsx";
// import Loader from "./Loader.jsx";
// import Toastify from "./Toastify.jsx";
// import { useKeycloak } from "@react-keycloak/web";

// const BankHeader = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { user, setUser } = useContext(AuthStore);
//   const { loading, setLoading, type, message, setShowToast, showToast } =
//     useContext(AppStore);
//   const { keycloak, initialized } = useKeycloak();

//   useEffect(() => {
//     return () => {
//       setUser(null);
//       keycloak.logout();
//     };
//   }, []);


//   const menuItems = [{ text: "Logout", icon: <LogoutIcon /> }];
//   const navigate = useNavigate();

//   const handleItemClick = (text) => {
//     setLoading(true);
//     if (text === "Logout") {
//       keycloak.logout();
//       setUser(null)
//     }
//   };

//   const getRole = (userType) => {
//     if (userType === "useradmin") {
//       return "User Admin"
//     } else if (userType === "backOfficeUser") {
//       return "Back Office User"
//     } else if (userType === "grievanceRedressal") {
//       return "Grievance Redressal"
//     } else if (userType === "itSupport") {
//       return "IT Support"
//     } else if (userType === "branchMaker") {
//       return "Branch Maker"
//     }
//   }

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   return (
//     <div>
//       <div className="flex justify-between relative bg-white items-center py-1">
//         <div className="mx-6 cursor-pointer">
//           <img
//             src={FederalBankLogo}
//             alt="Federal Bank Logo"
//             style={{ width: "8em" }}
//           />
//         </div>
//         <div className="flex items-center">
//           <div className="space-y-[1px]">
//             {user && user.lastLogin && (
//               <p className="text-[14px] text-neutral-500">{`Last Login: ${user.lastLogin}`}</p>
//             )}
//             {user && user.userType && (
//               <p className="text-[14px] text-neutral-500">
//                 Role: {getRole(user.userType)}
//               </p>
//             )}
//           </div>
//           <p className="text-neutral-500 w-[2px] h-7 bg-neutral-500 mx-4"></p>
//           <div
//             onClick={handleClick}
//             className="flex text-neutral-500 cursor-pointer gap-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
//               />
//             </svg>
//             <div className="flex items-center">
//               <p className="text-[14px]">{user ? user.userName : "Guest"}</p>
//               <KeyboardArrowDownIcon />
//             </div>
//           </div>
//           {anchorEl && (
//             <MenuComponent
//               anchorEl={anchorEl}
//               setAnchorEl={setAnchorEl}
//               menuItems={menuItems}
//               handleItemClick={handleItemClick}
//             />
//           )}
//         </div>
//       </div>
//       <Loader />
//       <Toastify
//         message={message}
//         setShowToast={setShowToast}
//         showToast={showToast}
//         type={type}
//       />
//     </div>
//   );
// };

// export default BankHeader;




// import React, { useContext, useState } from "react";
// import FederalBankLogo from "../assets/siblogo.png";
// import { useKeycloak } from "@react-keycloak/web";
// import Loader from "./Loader";
// import Toastify from "./Toastify";
// import { AuthStore } from "../Store/authStore.jsx";
// import { AppStore } from "../Store/appStore.jsx";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { styled } from "@mui/system";

// const UserCircle = styled('div')({
//   width: '160px',
//   height: '160px',
//   borderRadius: '50%',
//   border: '1px solid rgb(100, 15, 10)',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '16px',
//   backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//   position: 'relative',
//   '&:after': {
//     content: '""',
//     position: 'absolute',
//     top: '-5px',
//     left: '-5px',
//     right: '-5px',
//     bottom: '-5px',
//     borderRadius: '50%',
//     border: '1px solid rgba(100, 15, 10, 0.3)',
//     zIndex: -1
//   }
// });

// const UserDetail = styled('div')({
//   fontSize: '12px',
//   color: '#333',
//   textAlign: 'center',
//   margin: '4px 0',
//   fontWeight: 500
// });

// const UserName = styled('div')({
//   fontSize: '14px',
//   fontWeight: 'bold',
//   color: 'rgb(100, 15, 10)',
//   marginBottom: '8px'
// });

// const LogoutButton = styled('button')({
//   backgroundColor: 'transparent',
//   border: '1px solid rgb(100, 15, 10)',
//   color: 'rgb(100, 15, 10)',
//   borderRadius: '20px',
//   padding: '8px 16px',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '8px',
//   cursor: 'pointer',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     backgroundColor: 'rgb(100, 15, 10)',
//     color: 'white'
//   }
// });

// const BankHeader = () => {
//   const { user, setUser } = useContext(AuthStore);
//   const { setLoading } = useContext(AppStore);
//   const { keycloak } = useKeycloak();

//   const handleLogout = () => {
//     setLoading(true);
//     keycloak.logout();
//     setUser(null);
//   };

//   const getRole = (userType) => {
//     const roles = {
//       useradmin: "User Admin",
//       backOfficeUser: "Back Office User",
//       grievanceRedressal: "Grievance Redressal",
//       itSupport: "IT Support",
//       branchMaker: "Branch Maker"
//     };
//     return roles[userType] || userType;
//   };

//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center py-4 px-8 bg-white">
//         <div>
//           <img
//             src={FederalBankLogo}
//             alt="Federal Bank Logo"
//             style={{ width: "8em" }}
//           />
//         </div>

//         {user ? (
//           <div className="flex items-center gap-8">
//             <UserCircle>
//               <AccountCircleIcon 
//                 style={{ 
//                   color: 'rgb(100, 15, 10)', 
//                   fontSize: '40px',
//                   marginBottom: '8px'
//                 }} 
//               />
//               <UserName>{user.userName || "User"}</UserName>
//               {user.lastLogin && (
//                 <UserDetail>Last Login: {user.lastLogin}</UserDetail>
//               )}
//               {user.userType && (
//                 <UserDetail>Role: {getRole(user.userType)}</UserDetail>
//               )}
//             </UserCircle>

//             <LogoutButton onClick={handleLogout}>
//               <LogoutIcon fontSize="small" />
//               <span>Logout</span>
//             </LogoutButton>
//           </div>
//         ) : (
//           <div className="flex items-center">
//             {/* Login button can be added here if needed */}
//           </div>
//         )}
//       </div>

//       <Loader />
//       <Toastify />
//     </div>
//   );
// };

// export default BankHeader;
import React, { useContext } from "react";
import FederalBankLogo from "../assets/siblogo.png";
import { useKeycloak } from "@react-keycloak/web";
import { AuthStore } from "../Store/authStore.jsx";
import { AppStore } from "../Store/appStore.jsx";
import Loader from "./Loader";
import Toastify from "./Toastify";
import LogoutIcon from "@mui/icons-material/Logout";

const BankHeader = () => {
  const { user, setUser } = useContext(AuthStore);
  const { setLoading } = useContext(AppStore);
  const { keycloak } = useKeycloak();

  const handleLogout = () => {
    setLoading(true);
    keycloak.logout();
    setUser(null);
  };

  const getRole = (userType) => {
    const roles = {
      useradmin: "Admin",
      backOfficeUser: "Back Office",
      grievanceRedressal: "Grievance",
      itSupport: "IT Support",
      branchMaker: "Branch"
    };
    return roles[userType] || userType;
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center py-2 px-4 bg-white border-b border-gray-100">
        <div>
          <img
            src={FederalBankLogo}
            alt="Federal Bank Logo"
            className="w-28"
          />
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {/* Compact User Details Box */}
            <div className="border border-[rgb(100,15,10)] rounded-md px-3 py-2 bg-white shadow-xs">
              <div className="flex flex-col gap-0.5">
                <div className="text-sm font-semibold text-[rgb(100,15,10)] truncate max-w-[120px]">
                  {user.userName || "User"}
                </div>
                <div className="text-[12px] text-gray-600 leading-tight">
                  {user.lastLogin && `Login: ${user.lastLogin}`}
                  {user.userType && ` • ${getRole(user.userType)}`}
                </div>
              </div>
            </div>

            {/* Elegant Logout Button */}
            <button 
              onClick={handleLogout}
              className="border border-[rgb(100,15,10)] text-[rgb(100,15,10)] rounded-md px-3 py-1.5 flex items-center gap-1 hover:bg-[rgb(100,15,10)] hover:text-white transition-all duration-200"
            >
              <LogoutIcon className="!text-xs" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        ) : null}
      </div>

      <Loader />
      <Toastify />
    </div>
  );
};

export default BankHeader;