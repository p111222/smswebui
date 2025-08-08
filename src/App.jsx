import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login.jsx";
import NotFound from "./Common Components/NotFound.jsx";
import ProtectedRoute from "./Common Components/ProtectedRoute.jsx";
// import ItAdminLayout from "./Layout/ItAdminLayout.jsx";
// import UserManagement from "./Pages/User Management/UserManagement.jsx";
// import BranchLayout from "./Layout/BranchLayout.jsx";
import BackOfficeLayout from "./Layout/BackOfficeLayout.jsx";
import ApprovalHistory from "./Pages/Approval History/ApprovalHistory.jsx";
import { useContext, useEffect, useRef, useState } from "react";
// import PreviewMaker from "./Pages/Customer Onboarding/PreviewMaker.jsx";
import { useKeycloak } from "@react-keycloak/web";
import { AuthStore } from "./Store/authStore.jsx";
import WarningPopup from "./Common Components/WarningPopup.jsx";
import PrintCustomerData from "./Common Components/PrintCustomerData.jsx";
import SmsOptInOut from "./Pages/SmsRequest/Pages/SmsOptInOut.jsx";
import SmsRequest from "./Pages/SmsRequest/SmsRequest.jsx";
import SmsBlockLift from "./Pages/SmsBlockLift/SmsBlockLift.jsx";
import PhoneNumberAddition from "./Pages/PhoneNumberAddition/PhoneNumberAddition.jsx";
import MpinGeneration from "./Pages/MpinGeneration/MpinGeneration.jsx";
import CustomerRequirementDashboard from "./Pages/CustomerRequirementDashboard/CustomerRequests.jsx";
import Dashboard from "./Pages/Dashboard/Dashbaord.jsx";
import SmsViewLog from "./Pages/SmsViewLog/SmsViewLog.jsx";
import CustomerApprovedRecords from "./Pages/Customer Approved Records/CustomerApprovedRecords.jsx";

function App() {
  const { keycloak } = useKeycloak();
  const { user, setUser } = useContext(AuthStore);

  const [warning, setWarning] = useState(false);
  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const handleLogout = () => {
    setWarning(false)
    setUser(null);
    keycloak.logout();
  };

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const handleBackButton = () => {
      if (isMounted.current) {
        handleLogout();
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBackButton);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      // Cleanup event listeners
      isMounted.current = false;
      window.removeEventListener("beforeunload", handleBackButton);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    resetTimers(); // Start the timers on mount

    const activityListener = () => {
      if (warning) setWarning(false); // Hide warning on activity
      resetTimers(); // Reset timers on user activity
    };

    console.log("Inside User effect");

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach(event => window.addEventListener(event, activityListener));

    return () => {
      events.forEach(event => window.removeEventListener(event, activityListener));
      clearTimeout(logoutTimerRef.current);
      clearTimeout(warningTimerRef.current);
    };
  }, [warning]); // Re-run effect when warning state changes


  const resetTimers = () => {

    console.log("resetting the time");
    clearTimeout(logoutTimerRef.current);
    clearTimeout(warningTimerRef.current);

    warningTimerRef.current = setTimeout(() => {
      setWarning(true);
    }, 270000);

    // Logout after 5 minutes (300000ms)
    if (warning) {
      logoutTimerRef.current = setTimeout(() => {
        handleLogout();
        console.log("Loggin out after message");
      }, 30000);
    }
  };

  const router = createBrowserRouter([
    // It Admin
    // {
    //   path: "/smsweb/useradmin",
    //   element: (
    //     <ProtectedRoute layout={ItAdminLayout}>
    //       <ItAdminLayout />
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: "/smsweb/useradmin/adminmodule",
    //       element: <UserManagement />,
    //     },
    //   ],
    // },
    //Branch Maker
    // {
    //   path: "/smsweb/branchmaker",
    //   element: (
    //     <ProtectedRoute layout={BranchLayout}>
    //       <BranchLayout />
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: "/smsweb/branchmaker/branchmodule",
    //       element: <BranchModuleForCashAndCheque />,
    //     },
    //   ],
    // },

    // Back Office User
    // {
    //   path: "/smsweb/backofficeuser",
    //   element: (
    //     <ProtectedRoute layout={BackOfficeLayout}>
    //       <BackOfficeLayout />
    //     </ProtectedRoute>
    //   ),
    //   children: [
    //     {
    //       path: "/smsweb/backofficeuser/taskboard",
    //       element: <Dashboard />,
    //     },
    //     // {
    //     //   path: "/smsweb/backofficeuser/preview/:clientCode",
    //     //   element: <PreviewMaker />,
    //     // },
    //     // {
    //     //   path: "/smsweb/backofficeuser/preview/config/:clientCode",
    //     //   element: <PreviewMaker />,
    //     // },
    //     {
    //       path: "/smsweb/backofficeuser/smsoptinout",
    //       element: <SmsRequest />,
    //     },
    //     {
    //       path: "/smsweb/backofficeuser/smsblocklift",
    //       element: <SmsBlockLift />,
    //     },
    //     {
    //       path: "/smsweb/backofficeuser/phonenumberaddition",
    //       element: <PhoneNumberAddition />,
    //     },
    //     {
    //       path: "/smsweb/backofficeuser/mpingeneration",
    //       element: <MpinGeneration />,
    //     },
    //     {
    //       path: "/smsweb/backofficeuser/approvalauditlog",
    //       element: <ApprovalHistory />,
    //     },

    //     // {
    //     //   path: "/smsweb/backofficeuser/print",
    //     //   element: <PrintCustomerData />,
    //     // },
    //   ],
    // },
    {
      path: "/smsweb/branchuser",
      element: (
        <ProtectedRoute layout={BackOfficeLayout}>
          <BackOfficeLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/smsweb/branchuser/customerrequests",
          element: <CustomerRequirementDashboard />,
        },
        {
          path: "/smsweb/branchuser/taskboard",
          element: <Dashboard />,
        },
        {
          path: "/smsweb/branchuser/smsoptinout",
          element: <SmsRequest />,
        },
        {
          path: "/smsweb/branchuser/smsblocklift",
          element: <SmsBlockLift />,
        },
        {
          path: "/smsweb/branchuser/phonenumberaddition",
          element: <PhoneNumberAddition />,
        },
        {
          path: "/smsweb/branchuser/mpingeneration",
          element: <MpinGeneration />,
        },
        {
          path: "/smsweb/branchuser/customerapprovedrecords",
          element: <CustomerApprovedRecords />,
        },
        {
          path: "/smsweb/branchuser/approvalauditlog",
          element: <ApprovalHistory />,
        },
        {
          path: "/smsweb/branchuser/smsviewlog",
          element: <SmsViewLog />,
        },

        // {
        //   path: "/smsweb/branchuser/print",
        //   element: <PrintCustomerData />,
        // },
      ],
    },
    {
      path: "/smsweb/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Navigate to="/smsweb/login" />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);


  return (
    <div className=" App relative">
      {warning && <WarningPopup />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
