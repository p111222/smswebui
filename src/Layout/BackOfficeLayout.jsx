import React, { useContext, useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import BankHeader from "../Common Components/BankHeader.jsx";
import NavLinks from "../Common Components/NavLinks.jsx";
import { AppStore } from "../Store/appStore.jsx";
import { AuthStore } from "../Store/authStore.jsx";
import getLinkIcon from "../utils/getLinkIcon.jsx";
import getLink from "../utils/getLink.js";
import CustomerOnboardBanner from "../Common Components/SmsRequestBanner.jsx";
import { Outlet, useLocation } from "react-router-dom";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const BackOfficeLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const [open, setOpen] = useState(!isSmallScreen);
  const { setHeaderHeight, currentStep, setCurrentStep } = useContext(AppStore);
  const { user } = useContext(AuthStore);
  const location = useLocation();

  const bankHeaderRef = useRef(null);
  const appBarRef = useRef(null);
  const bannerRef = useRef(null);

  // Function to Stick Stepper Component
  const updateHeaderHeight = () => {
    const bankHeaderHeight =
      bankHeaderRef.current?.getBoundingClientRect().height || 0;
    const bannerHeight = bannerRef.current?.getBoundingClientRect().height || 0;
    const appBarHeight = appBarRef.current?.getBoundingClientRect().height || 0;
    const totalHeight = bankHeaderHeight + bannerHeight + appBarHeight;
    setHeaderHeight(totalHeight);
  };

  useEffect(() => {
    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [[bankHeaderRef, bannerRef, appBarRef, currentStep]]);

  return (
    <div>
      <div
        className="w-full print:hidden"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          background: "white",
          zIndex: "1001",
        }}
      >
        {/* Bank Header */}
        <div ref={bankHeaderRef}>
          <BankHeader />
        </div>
        {/* Links */}
        <div ref={appBarRef}>
          <div className="">
            <div className="bg-gradient-to-b from-[#fbfbfb] to-[#d7d7d7] text-white py-2 px-5"
              // sx={{
              //   background: "rgb()",
              //   background: "rgb()",
              //   color: "white",
              //   boxShadow:
              //     "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              //   width: "100%",
              //   position: "relative",
              //   padding: "0",
              //   margin: "0"
              // }}
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
                  {/* <NavLinks
                          linkName="Print"
                          linkIcon={<PersonAddAltIcon />}
                          link="/smsweb/backofficeuser/print"
                        /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div ref={bannerRef}>
          {location.pathname.includes("customeronboarding") && (
            <CustomerOnboardBanner bannerRef={bannerRef} />
          )}
        </div> */}
      </div>

      {/* Pages */}
      <div className="p-3 bg-stone-100">
        <Outlet />
      </div>
    </div>
  );
};

export default BackOfficeLayout;
