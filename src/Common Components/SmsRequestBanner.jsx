import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { AuthStore } from "../Store/authStore.jsx";
import { AppStore } from "../Store/appStore.jsx";

const SmsRequestBanner = () => {
  const { user } = useContext(AuthStore)
  const navigate = useNavigate()
  const { bannerCustID, bannerCustName, bannerPhoneNumber, currentStep } = useContext(AppStore)

  // const params = new URLSearchParams(window.location.search);

  // const taskType = params.get('type');


  return (
    <div className="w-full z-[999] shadow-lg bg-white py-[6px] px-[25px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-10">
          {/* {taskType === "MODIFYSETUP" ? (
            <div className="flex items-center gap-2">
              <EditIcon
                style={{ fontSize: "1.3em", color: "orange" }}
              />
              <span className="font-semibold text-[15px] text-[orange]">
                MODIFY SETUP
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FiberNewIcon
                style={{ fontSize: "1.3em", color: "green" }}
              />
              <span className="font-semibold text-[15px] text-[green]">
                NEW SETUP
              </span>
            </div>
          )}
          {(params.clientCode) && (
            <Button
              className="stepper"
              onClick={() => navigate("/smsweb/backofficeuser/dashboard")}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Back to Dashboard
            </Button>
          )} */}
          {bannerCustID && bannerCustName && (
            <div className="flex text-[15px] items-center gap-4">
              <div>
                <span className="font-bold text-gray-700">Phone Number :</span>
                {bannerPhoneNumber}
              </div>
              <div>
                <span className="font-bold text-gray-700">Customer Id :</span>
                {bannerCustID}
              </div>
              <div>
                <span className="font-bold text-gray-700">Customer Name :</span>
                {bannerCustName}
              </div>
            </div>
          )}
        </div>
        {currentStep === 4 &&
          // window.location.pathname.includes("smsrequest") && (
            window.location.pathname.includes("smsrequest-home") && (
            <div className="flex gap-x-2">
              <Button
                className="stepper"
                variant="contained"
                onClick={() => {
                  window.print();
                }}
                sx={{
                  backgroundColor: "rgb(250,166,26)",
                  "&:hover": {
                    backgroundColor: "rgba(250,166,26,0.9)", 
                  },
                  textTransform: "none",
                  paddingInline: 1,
                  paddingBlock: 0.3,
                  fontSize: "14px"
                }}
              >
                Download PDF
              </Button>
            </div>
          )}
      </div>
    </div>
  )
}

export default SmsRequestBanner