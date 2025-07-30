import React from "react";
import { Button, IconButton, Modal, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
 
const FileInstruction = ({ showInstruction, setShowInstruction }) => {
  return (
    <Modal
      open={showInstruction}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center justify-center h-screen">
        <div
          onClick={(e) => e.stopPropagation()}
          className="py-2 px-3 max-w-[40%] bg-white rounded-lg"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl ">Instruction</p>
            <div className="flex items-center gap-3 justify-end">
              <Tooltip
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,0,0,0.1)",
                  },
                }}
                title="Close"
              >
                <IconButton>
                  <CloseIcon
                    onClick={() => {
                      setShowInstruction(false);
                    }}
                    sx={{
                      color: "rgba(255,0,0,0.7)",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className=" text-gray-800"><span className="font-semibold">1.</span> Only 100 records are allowed.</p>
            <p className=" text-gray-800"><span className="font-semibold">2.</span> Only text, csv and xlsx files are supported.</p>
            <p className=" text-gray-800"><span className="font-semibold">3.</span> Download the sample file for reference. Before uploading, match the file header with the sample file.</p>
            <p className=" text-gray-800"><span className="font-semibold">4.</span> After uploading the file, please enter the valid client code.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
 
export default FileInstruction;