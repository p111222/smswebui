// import React from "react";
// import { NavLink } from "react-router-dom";

// const NavLinks = ({ linkName, linkIcon, link }) => {
//   return (
//     <NavLink
//       onClick={() => localStorage.clear()}
//       className={({ isActive }) =>
//         `${isActive
//           ? "bg-[rgb(148,25,20)] text-white hover:bg-[rgb(148,25,20)] hover:text-white py-1 px-2 rounded-md"
//           : "py-1 px-2 text-black"
//         }`
//       }
//       to={link}
//     >
//       <div className="flex items-center gap-x-1 cursor-pointer">
//         {linkIcon}
//         <p className="text-[14px] font-semibold">{linkName}</p>
//       </div>
//     </NavLink>
//   );
// };

// export default NavLinks;


import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ linkName, linkIcon, link }) => {
  return (
    <NavLink
      onClick={() => localStorage.clear()}
      className={({ isActive }) =>
        `${
          isActive
            ? "bg-[rgb(148,25,20)] text-white"
            : "text-black hover:bg-[rgb(148,25,20)] hover:text-white"
        } py-1 px-2 rounded-md transition-colors duration-200`
      }
      to={link}
    >
      <div className="flex items-center gap-x-1 cursor-pointer">
        {linkIcon}
        <p className="text-[14px] font-semibold">{linkName}</p>
      </div>
    </NavLink>
  );
};

export default NavLinks;
