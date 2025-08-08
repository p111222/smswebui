// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
// import BankHeader from "../Common Components/BankHeader.jsx";
// import NavLinks from "../Common Components/NavLinks.jsx";
// import { AppStore } from "../Store/appStore.jsx";
// import { AuthStore } from "../Store/authStore.jsx";
// import getLinkIcon from "../utils/getLinkIcon.jsx";
// import getLink from "../utils/getLink.js";
// import CustomerOnboardBanner from "../Common Components/SmsRequestBanner.jsx";
// import { Outlet, useLocation } from "react-router-dom";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import MiniDrawerComponent from "../Common Components/MiniDrawerComponent.jsx";

// const BackOfficeLayout = () => {
//   const isSmallScreen = useMediaQuery("(max-width: 650px)");
//   const [open, setOpen] = useState(!isSmallScreen);
//   const { setHeaderHeight, currentStep, setCurrentStep, MiniDrawerComponentOpen, setMiniDrawerComponentOpen } = useContext(AppStore);
//   const { user } = useContext(AuthStore);
//   const location = useLocation();

//   const bankHeaderRef = useRef(null);
//   const appBarRef = useRef(null);
//   const bannerRef = useRef(null);

//   // Function to Stick Stepper Component
//   const updateHeaderHeight = () => {
//     const bankHeaderHeight =
//       bankHeaderRef.current?.getBoundingClientRect().height || 0;
//     const bannerHeight = bannerRef.current?.getBoundingClientRect().height || 0;
//     const appBarHeight = appBarRef.current?.getBoundingClientRect().height || 0;
//     const totalHeight = bankHeaderHeight + bannerHeight + appBarHeight;
//     setHeaderHeight(totalHeight);
//   };

//   useEffect(() => {
//     updateHeaderHeight();

//     window.addEventListener("resize", updateHeaderHeight);
//     return () => {
//       window.removeEventListener("resize", updateHeaderHeight);
//     };
//   }, [[bankHeaderRef, bannerRef, appBarRef, currentStep]]);

//   const handleDrawerOpen = () => {
//     console.log("hii");

//     setMiniDrawerComponentOpen(true);
//   };

//   const handleDrawerClose = () => {
//     console.log("hii");

//     setMiniDrawerComponentOpen(false);
//   };

//   return (
//     <div>
//       <div
//         className="w-full print:hidden"
//         style={{
//           position: "sticky",
//           top: 0,
//           left: 0,
//           background: "white",
//           zIndex: "1001",
//         }}
//       >
//         {/* Bank Header */}
//         <div ref={bankHeaderRef}>
//           <BankHeader />
//         </div>
//         {/* Links */}
//         <div ref={appBarRef}>
//           {/* <div className=""> */}
//           <div className="bg-gradient-to-b from-[#fbfbfb] to-[#d7d7d7] text-white py-2 px-5"
//           // sx={{
//           //   background: "rgb()",
//           //   background: "rgb()",
//           //   color: "white",
//           //   boxShadow:
//           //     "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//           //   width: "100%",
//           //   position: "relative",
//           //   padding: "0",
//           //   margin: "0"
//           // }}
//           >
//             <div className="flex justify-between">
//               <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
//                 {user.pageAccess &&
//                   user.pageAccess.map((linkname) => {
//                     return (
//                       <NavLinks
//                         key={linkname}
//                         linkName={linkname}
//                         linkIcon={getLinkIcon(linkname)}
//                         link={getLink(user.userType, linkname)}
//                       />
//                     );
//                   })}
//                 {/* <NavLinks
//                           linkName="Print"
//                           linkIcon={<PersonAddAltIcon />}
//                           link="/smsweb/backofficeuser/print"
//                         /> */}
//               </div>
//             </div>
//           </div>
//           {/* </div> */}
//         </div>
//         {/* <div ref={bannerRef}>
//           {location.pathname.includes("customeronboarding") && (
//             <CustomerOnboardBanner bannerRef={bannerRef} />
//           )}
//         </div> */}
//       </div>

//       {/* Pages */}
//       <div className="">

//         <div>
//           {/* <MiniDrawerComponent handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} MiniDrawerComponentOpen ={MiniDrawerComponentOpen} setMiniDrawerComponentOpen = {setMiniDrawerComponentOpen}/> */}
//         </div>
//         <div className="min-h-lvh p-3 bg-stone-100">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BackOfficeLayout;


import React, { useContext, useEffect, useRef, useState } from "react";
import { IconButton, useMediaQuery } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BankHeader from "../Common Components/BankHeader.jsx";
import NavLinks from "../Common Components/NavLinks.jsx";
import { AppStore } from "../Store/appStore.jsx";
import { AuthStore } from "../Store/authStore.jsx";
import getLinkIcon from "../utils/getLinkIcon.jsx";
import getLink from "../utils/getLink.js";
import { Outlet } from "react-router-dom";

const BackOfficeLayout = () => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const [open, setOpen] = useState(!isSmallScreen);
  const { setHeaderHeight, MiniDrawerComponentOpen, setMiniDrawerComponentOpen } = useContext(AppStore);
  const { user } = useContext(AuthStore);
  
  const bankHeaderRef = useRef(null);
  const appBarRef = useRef(null);
  const navContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Update header height for positioning
  const updateHeaderHeight = () => {
    const bankHeaderHeight = bankHeaderRef.current?.offsetHeight || 0;
    const appBarHeight = appBarRef.current?.offsetHeight || 0;
    setHeaderHeight(bankHeaderHeight + appBarHeight);
  };

  // Check scroll position for arrow visibility
  const checkScroll = () => {
    if (navContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll actions
  const scroll = (direction) => {
    if (navContainerRef.current) {
      const scrollAmount = 200;
      navContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Set up event listeners and initial checks
  useEffect(() => {
    updateHeaderHeight();
    checkScroll();
    
    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
      checkScroll();
    });

    if (bankHeaderRef.current) resizeObserver.observe(bankHeaderRef.current);
    if (appBarRef.current) resizeObserver.observe(appBarRef.current);
    
    window.addEventListener('resize', checkScroll);
    navContainerRef.current?.addEventListener('scroll', checkScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScroll);
      navContainerRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, [user.pageAccess]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="sticky top-0 z-50 print:hidden bg-white shadow-sm">
        <div ref={bankHeaderRef}>
          <BankHeader />
        </div>
        
        {/* Navigation Bar */}
        <div ref={appBarRef} className="relative bg-gradient-to-b from-[#fbfbfb] to-[#d7d7d7]">
          <div className="flex items-center py-2">
            {/* Left Scroll Arrow */}
            {showLeftArrow && (
              <IconButton 
                onClick={() => scroll('left')}
                size="small"
                className="!absolute left-0 z-10 bg-white shadow-md hover:bg-gray-100 ml-1"
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(148,25,20,0.9)', color: "white"  } 
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            )}

            {/* Navigation Links Container */}
            <div
              ref={navContainerRef}
              className="w-full overflow-x-auto scrollbar-hide whitespace-nowrap px-8 py-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'smooth',
              }}
            >
              <div className="inline-flex items-center space-x-4">
                {user.pageAccess?.map((linkname) => (
                  <NavLinks
                    key={linkname}
                    linkName={linkname}
                    linkIcon={getLinkIcon(linkname)}
                    link={getLink(user.userType, linkname)}
                    className="flex-shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Right Scroll Arrow */}
            {showRightArrow && (
              <IconButton 
                onClick={() => scroll('right')}
                size="small"
                className="!absolute right-0 z-10 bg-white shadow-md hover:bg-gray-100 mr-1"
                sx={{ 
                  '&:hover': { backgroundColor: 'rgba(148,25,20,0.9)', color: "white" } 
                }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-stone-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default BackOfficeLayout;
