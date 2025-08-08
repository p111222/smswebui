import React, { useContext, useState } from "react";
import {
  handleClose,
  handleDownloadButtonClick,
} from "../../Dashboard/services/pendingTaskService";
import { AppStore } from "../../../Store/appStore";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { Tooltip, IconButton, Button, Modal, Typography, Box } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClarificationBox from "./ClarificationBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "0.8em",
  boxShadow: 24,
  py: 2,
  px: 3,
};

const CustomerDetails = ({
  showCustomerDetails,
  selectedClientDetail,
  setShowCustomerDetails,
  setSelectedClientDetail,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { setShowToast, setMessage, setType, setLoading } = useContext(AppStore);
  const [showClarificationBox, setShowClarificationBox] = useState(false);
  const [existingClarifications, setExistingClarifications] = useState([]);

  console.log("clarificationfield", selectedClientDetail);


  const handleViewClarificationTrail = (selectedClarification) => {

    try {
      const parsedJson = JSON.parse(selectedClarification);
      console.log("json",parsedJson);


      setExistingClarifications(parsedJson)
      setShowClarificationBox(true)
    } catch (e) {
      console.error(e)
      setExistingClarifications([])
      setShowClarificationBox(false)
    }
  }

  const getTaskTypeColor = (selectedClientDetail) => {
    if (selectedClientDetail["Task Type"].toLowerCase() === "new setup") {
      return "text-[purple]"
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "modify setup") {
      return "text-[orange]"
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "va file upload") {
      return "text-[blue]"
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "corp activation") {
      return "text-[green]"
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "corp deactivation") {
      return "text-[red]"
    } else {
      return ""
    }
  }
  const getTaskTypeIcon = (selectedClientDetail) => {
    if (selectedClientDetail["Task Type"].toLowerCase() === "new setup") {
      return <FiberNewIcon style={{ fontSize: "1.5em", color: "purple" }} />
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "modify setup") {
      return <EditIcon style={{ fontSize: "1.5em", color: "orange" }} />
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "va file upload") {
      return <IosShareIcon style={{ fontSize: "1.3em", color: "blue" }} />
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "corp activation") {
      return <StarIcon style={{ fontSize: "1.5em", color: "green" }} />
    } else if (selectedClientDetail["Task Type"].toLowerCase() === "corp deactivation") {
      return <StarBorderIcon style={{ fontSize: "1.5em", color: "red" }} />
    } else {
      return ""
    }
  }


  return (
    <Modal
      open={showCustomerDetails}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex w-[80vw] lg:w-[45vw] items-center justify-between gap-3">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Customer Details
          </Typography>
          <div className="flex gap-x">
            <Tooltip
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,0,0,0.1)", // Change background color on hover
                },
              }}
              title="Close"
            >
              <IconButton
                onClick={() =>
                  handleClose(setSelectedClientDetail, setShowCustomerDetails)
                }
              >
                <CloseIcon
                  sx={{
                    color: "rgba(255,0,0,0.7)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className=" py-3 mt-3 rounded-[5px] bg-gray-100 text-sm px-2 space-y-5">
          <div className="grid grid-cols-2  gap-x-2">
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] w-fit text-black">
                <span className="font-semibold">Task ID: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Task ID"]}
              </span>
            </div>
            <div className="grid grid-cols-2 ">
              <label className=" text-[14px] text-black">
                <span className="font-semibold">Date-Timestamp:</span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Date-Timestamp"]}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2  gap-x-2">
            <div className="grid grid-cols-2  gap-1">
              <label className=" text-[14px] text-black">
                <span className="font-semibold">Task Type: </span>
              </label>
              <span
                className={`font-[500] break-words flex items-center gap-1 ${selectedClientDetail ? getTaskTypeColor(selectedClientDetail) : ""}`}
              >
                <span className="mt-[-2px] break-words">
                  {selectedClientDetail ? getTaskTypeIcon(selectedClientDetail) : ""}
                </span>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail["Task Type"]}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] text-black">
                <span className="font-semibold">Client Code: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Client Code"]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 items-center  gap-x-2 ">
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] text-black">
                <span className="font-semibold">Customer Name: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Customer Name"]}
              </span>
            </div>
            <div className="grid grid-cols-2 ">
              <label className=" text-[14px] text-black">
                <span className="font-semibold">Maker: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Maker"]}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 items-cente2  gap-x-2 ">
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] text-black">
                <span className="font-semibold">Checker: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Checker"]}
              </span>
            </div>
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] text-black">
                <span className="font-semibold">Remark: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Remark"]}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 items-cente2  gap-x-2 ">
            <div className="grid grid-cols-2 ">
              <label className="text-[14px] text-black">
                <span className="font-semibold">Status: </span>
              </label>
              <span className="break-words">
                {selectedClientDetail && selectedClientDetail["Status"]}
              </span>
            </div>
            {selectedClientDetail && selectedClientDetail["clarificationfield"] &&
              <div className="grid grid-cols-2">
                <label className="text-[14px] text-black">
                  <span className="font-semibold">Clarifications Raised: </span>
                </label>
                <span className="break-words text-blue-500 underline cursor-pointer" onClick={() => handleViewClarificationTrail(selectedClientDetail["clarificationfield"])}>
                  View Clarification
                </span>
              </div>}
          </div>
        </div>
        <div className="flex items-center justify-end">
          {selectedClientDetail &&
            selectedClientDetail["Task Type"].toLowerCase() === "va file upload" && (
              <Button
                variant="outlined"
                onClick={() =>
                  handleDownloadButtonClick(
                    selectedClientDetail["File ID"],
                    axiosPrivate,
                    setShowToast,
                    setMessage,
                    setType,
                    setShowCustomerDetails,
                    setLoading
                  )
                }
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "rgb(208, 233, 252)",
                  },
                }}
                startIcon={<DownloadIcon />}
              >
                Download File
              </Button>
            )}
          <ClarificationBox
            showClarificationBox={showClarificationBox}
            setShowClarificationBox={setShowClarificationBox}
            existingClarifications={existingClarifications}
          />
        </div>
      </Box>
    </Modal>
    // <div
    //   onClick={handleClose}
    //   className={`w-screen h-screen bg-black ${
    //     showCustomerDetails && selectedClientDetail ? "scale-100" : "scale-0"
    //   } duration-200 bg-opacity-50 fixed top-0 left-0 z-[1002] flex items-center justify-center`}
    // >
    //   <div
    //     onClick={(e) => e.stopPropagation()}
    //     className="bg-white p-4 rounded-lg"
    //   >
    //     <div className="flex items-center justify-between">
    //       <p className="font-semibold text-xl">Customer Details</p>
    //       <Tooltip
    //         sx={{
    //           "&:hover": {
    //             backgroundColor: "rgba(255,0,0,0.1)", // Change background color on hover
    //           },
    //         }}
    //         title="Close"
    //       >
    //         <IconButton
    //           onClick={() =>
    //             handleClose(setSelectedClientDetail, setShowCustomerDetails)
    //           }
    //         >
    //           <CloseIcon
    //             sx={{
    //               color: "rgba(255,0,0,0.7)",
    //             }}
    //           />
    //         </IconButton>
    //       </Tooltip>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CustomerDetails;
