import React, { useContext } from "react";
import { AuthStore } from "../Store/authStore.jsx";
import getLinkIcon from "../utils/getLinkIcon.jsx";
import NavLinks from "../Common Components/NavLinks.jsx";
import getLink from "../utils/getLink.js";
import BankHeader from "../Common Components/BankHeader.jsx";
import { AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

const ItAdminLayout = () => {
  const { user } = useContext(AuthStore);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          background: "white",
          zIndex: "1001",
        }}
      >
        <div>
          <BankHeader />
        </div>
        <div className="">
        <div className="">
            <div className="bg-[rgb(206,24,30)] text-white py-2 px-5"
              sx={{
                background: "rgb(0 78 150)",
                color: "white",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                width: "100%",
                position: "relative",
                padding: "0",
                margin: "0"
              }}
            >
              <div className="flex justify-between">
                <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
                  {user.pageAccess &&
                    user.pageAccess.map((linkname) => {
                      return (
                        <NavLinks
                          key={linkname}
                          linkName={linkname}
                          linkIcon={getLinkIcon(linkname)}
                          link={getLink(user.userType, linkname)}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-stone-100">
        <Outlet />
      </div>
    </div>
  );
};

export default ItAdminLayout;
