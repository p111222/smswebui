import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Tooltip, Modal, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IosShareIcon from "@mui/icons-material/IosShare";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import DownloadIcon from "@mui/icons-material/Download";
import {
  handleClose,
  handleDownloadButtonClick,
} from "../services/pendingTaskService";
import { AuthStore } from "../../../Store/authStore.jsx";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";
import { AppStore } from "../../../Store/appStore.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "0.8em",
  boxShadow: 24,
  p: 2,
};

const RequestDetails = ({
  selectedClientDetail,
  showCustomerDetails,
  setSelectedClientDetail,
  setShowRemark,
  setButton,
  setShowCustomerDetails,
}) => {
  const { user } = useContext(AuthStore);
  const { setShowToast, setMessage, setType, setLoading } = useContext(AppStore);
  const axiosPrivate = useAxiosPrivate();

  if (!selectedClientDetail) {
    return
  }

  return (
    <Modal
      open={showCustomerDetails}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    // sx={{ zIndex: 201 }}
    >
      <Box sx={style}>
        <div className="w-[90vw] md:w-[45vw] ">

          <div className="flex items-center justify-between gap-3">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Request Details
            </Typography>
            <div className="flex gap-3">
              <Button
                disabled={user.userEmail.split("@")[0] === selectedClientDetail.Maker}
                onClick={() => {
                  setShowRemark(true)
                  setButton("approve")
                }
                }
                color="success"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "rgb(208, 233, 252)",
                  },
                }}
                startIcon={<CheckCircleIcon />}
              >
                Approve
              </Button>
              <Button
                disabled={user.userEmail.split("@")[0] === selectedClientDetail.Maker}
                onClick={() => {
                  setShowRemark(true)
                  setButton("reject")
                }
                }
                color="error"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  "&:hover": {
                    backgroundColor: "rgb(208, 233, 252)",
                  },
                }}
                startIcon={<CancelIcon />}
              >
                Reject
              </Button>
              <Tooltip
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.1)", // Change background color on hover
                  },
                }}
                title="Close"
              >
                <IconButton onClick={() => handleClose(setSelectedClientDetail, setShowCustomerDetails)}>
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
            <div className="grid grid-cols-2 gap-x-2">
              <div className="grid grid-cols-2 gap-1">
                <label className="text-[14px] w-fit text-black">
                  <span className="font-semibold">File ID: </span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail["Task ID"]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className=" text-[14px] text-black">
                  <span className="font-semibold"> Date-Timestamp:</span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail["Date-Timestamp"]}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="grid grid-cols-2 gap-1">
                <label className=" text-[14px] text-black">
                  <span className="font-semibold">Task Type: </span>
                </label>
                <span
                  className={`font-[500] break-words flex items-center gap-1 ${selectedClientDetail &&
                    selectedClientDetail["Task Type"] === "NEW SETUP"
                    ? "text-[green]"
                    : `${selectedClientDetail &&
                      selectedClientDetail["Task Type"] === "MODIFY SETUP"
                      ? "text-[orange]"
                      : "text-[blue]"
                    }`
                    }`}
                >
                  <span className="mt-[-2px] break-words">
                    {selectedClientDetail &&
                      selectedClientDetail["Task Type"] === "VA FILE UPLOAD" && (
                        <IosShareIcon
                          style={{ fontSize: "1.3em", color: "blue" }}
                        />
                      )}
                  </span>
                  <span className="break-words">
                    {selectedClientDetail && selectedClientDetail["Task Type"]}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="text-[14px] text-black">
                  <span className="font-semibold">Client Code: </span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail["Client Code"]}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-cente2 gap-x-2 ">
              <div className="grid grid-cols-2 gap-1">
                <label className="text-[14px] text-black">
                  <span className="font-semibold">Customer Name: </span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail["Customer Name"]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <label className="text-[14px] text-black">
                  <span className="font-semibold">Maker: </span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail.Maker}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-cente2 gap-x-2 ">
              <div className="grid grid-cols-2 gap-1">
                <label className="text-[14px] text-black">
                  <span className="font-semibold">Status: </span>
                </label>
                <span className="break-words">
                  {selectedClientDetail && selectedClientDetail.Status}
                </span>
              </div>
            </div>
          </div>
          {/* Download Button */}
          <div className="flex items-center justify-end">
            <Button
              variant="outlined"
              onClick={() =>
                handleDownloadButtonClick(selectedClientDetail["Task ID"], axiosPrivate, setShowToast, setMessage, setType, setShowCustomerDetails, setLoading)
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
          </div>
        </div>
      </Box>
    </Modal >
  );
};

export default RequestDetails;
