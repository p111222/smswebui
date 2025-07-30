import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Modal, Tooltip } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { AuthStore } from "../../../Store/authStore.jsx";
import { Box } from "@mui/system";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";
import { handleVaApproveReject } from "../services/pendingTaskService.js";
import { AppStore } from "../../../Store/appStore.jsx";
import { CONSTANTS } from "../../../utils/constants.js";

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

const Remarks = ({ showRemark, setShowRemark, button, selectedClientDetail, setSelectedClientDetail, setShowCustomerDetails, setRefresh }) => {

  const [remark, setRemark] = useState("")
  const makeRequest = useAxiosPrivate()
  const { user } = useContext(AuthStore)
  const { setShowToast, setMessage, setType, setLoading } = useContext(AppStore)

  return (
    <Modal
      open={showRemark}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={{ zIndex: 202 }}
    >
      <Box sx={style}>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleVaApproveReject(makeRequest, setShowToast, setMessage, setType, selectedClientDetail, setSelectedClientDetail, setShowCustomerDetails, setShowRemark, button, remark, user.userEmail, setLoading, setRemark, setRefresh)
          }
          }
          className="bg-white w-[50vw] p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex">
              <p className={`${button === "approve" ? "" : "text-red-500"}  text-md font-semibold  p-1 rounded-md`}>
                {button === "approve" ? "Do you have any remark? (optional)" : "Please provide remark"}
              </p>
              {button === "reject" && <span className="text-red-500 ml-1">*</span>}
            </div>
            <Tooltip
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,0,0,0.1)",
                },
              }}
              title="Close"
            >
              <IconButton onClick={() => {
                setShowRemark(false)
                setRemark("")
              }}>
                <CloseIcon
                  sx={{
                    color: "rgba(255,0,0,0.7)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
          <div className="">
            <Textarea
              minRows={2}
              className="w-full rounded-lg mt-2 mb-3"
              name="Remark"
              value={remark}
              autoFocus
              onChange={(e) => {
                const inputValue = e.target.value
                if (inputValue.length <= 200 && !CONSTANTS.PREVETN_SPEC_CHAR_REGEX.test(inputValue) ) {
                    setRemark(inputValue)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.target.form.requestSubmit();
                }
              }}
              variant="soft"
              placeholder="type..."
              sx={{
                "& textarea::placeholder": {
                  fontSize: "14px",
                },
                backgroundColor: "#F1F4F8",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Max: {remark.length}/200</p>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "13px",
                width: "auto",
                height: "auto",
                padding: "5px 12px",
              }}
            >
              {button === "approve" ? "Approve" : "Reject"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default Remarks;
