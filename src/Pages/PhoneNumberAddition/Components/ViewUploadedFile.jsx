import React, { useRef, useState } from "react";
import DatagridComponent from "../../../Common Components/DatagridComponent";
import { Button, Modal } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import FastForwardIcon from "@mui/icons-material/FastForward";
import EditIcon from "@mui/icons-material/Edit";
import getUploadedFileColumns from "../services/getUploadedFileColumns";
import {
  getTotalErrorRowsCount,
  getTotalSuccessfullRowsCount,
} from "../services/fileMethods";
import { Box } from "@mui/system";

const ViewUploadedFile = ({
  vaData,
  setVaData,
  fileData,
  showUploadedFile,
  setShowUploadedFile,
  vaErrors,
  currentErrors,
  setOpen,
  setError,
  filteredData,
  filteredErrors,
  setFilteredData,
  selectNeededRows,
}) => {
  const [gridApi, setGridApi] = useState();
  const [isEditable, setIsEditable] = useState(false);

  const handleEditOrSave = () => {
    setIsEditable(!isEditable);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: "0.8em",
    boxShadow: 24,
    p: 2,
    minWidth: "90vw",
    zIndex: "100",
  };

  return (
    <>
      <Modal
        open={showUploadedFile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-5 bg-white rounded-lg"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-xl ">Preview of uploaded file</p>
              <div className="mt-2 flex items-center gap-3 justify-end">
                {true && (
                  <>
                    <Button
                      onClick={handleEditOrSave}
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "13px",
                        "&:hover": {
                          backgroundColor: "rgb(208, 233, 252)",
                        },
                      }}
                      startIcon={!isEditable ? <EditIcon /> : <SaveIcon />}
                    >
                      {!isEditable ? "Edit" : "Save"}
                    </Button>
                  </>
                )}
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "13px",
                    "&:hover": {
                      backgroundColor: "rgb(208, 233, 252)",
                    },
                  }}
                  startIcon={<FastForwardIcon />}
                >
                  {vaErrors && vaErrors.length > 0
                    ? "Ignore Errors and Continue"
                    : "Continue"}
                </Button>
                <Button
                  onClick={() => {
                    setVaData([]);
                    setShowUploadedFile(false);
                    setError(false);
                    setIsEditable(false);
                    setFilteredData([]);
                  }}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: "rgba(255,84,84,1)",
                    borderColor: "rgba(255,84,84,.5)",
                    "&:hover": {
                      backgroundColor: "rgb(208, 233, 252)",
                    },
                  }}
                  startIcon={<CancelIcon />}
                >
                  Cancel Upload
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 px-2 py-3 my-3 rounded-[5px] flex items-center justify-between gap-20">
              <label className=" text-[16px] text-neutral-500">
                <span className="font-semibold ">File Name:</span>{" "}
                {fileData && fileData.name}
              </label>
              <label
                onClick={() => selectNeededRows("total")}
                className="text-[16px] cursor-pointer text-blue-500 underline"
              >
                <span className="font-semibold">Number of Rows:</span>{" "}
                {vaData && vaData.length}
              </label>
              <label
                onClick={() => selectNeededRows("success")}
                className=" text-[16px] cursor-pointer text-blue-500 underline"
              >
                <span className="font-semibold">
                  Number of Successfull Rows:
                </span>{" "}
                {vaErrors && getTotalSuccessfullRowsCount(vaErrors, vaData)}
              </label>
              <label
                onClick={() => selectNeededRows("error")}
                className=" text-[16px] cursor-pointer text-blue-500 underline"
              >
                <span className="font-semibold">
                  Number of Rows with Errors:
                </span>{" "}
                {vaErrors && getTotalErrorRowsCount(vaErrors)}
              </label>
            </div>
            <DatagridComponent
              gridApi={gridApi}
              setGridApi={setGridApi}
              data={filteredData}
              setData={setFilteredData}
              editable={isEditable}
              columnDefs={getUploadedFileColumns(currentErrors)}
              csvData={vaData}
              setCsvData={setVaData}
              type={"vaUpload"}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewUploadedFile;
