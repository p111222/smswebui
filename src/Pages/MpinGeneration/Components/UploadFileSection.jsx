import React from 'react'
import { useContext, useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FileDropZone from "../../../Common Components/FileDropZone";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import DecisionBox from "../../../Common Components/DecisionBox.jsx";
import { AppStore } from "../../../Store/appStore.jsx";
import { AuthStore } from "../../../Store/authStore.jsx";
import { useNavigate } from "react-router-dom";

import FileInstruction from "./FileInstruction.jsx";

const UploadFileSection = () => {

     const [fileBlob, setFileBlob] = useState({});
    const [open, setOpen] = useState(false);
    const { user } = useContext(AuthStore);
    const [showUploadedFile, setShowUploadedFile] = useState(false);
    const { setMessage, setShowToast, setType } = useContext(AppStore);
    const [filteredData, setFilteredData] = useState([]); 
    const [filteredErrors, setFilteredErrors] = useState([]); 
    const [duplicacyData, setDuplicacyData] = useState([]);
    const [configData, setConfigData] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false)

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();


    return (
        <div>

            <div>
                <div className="flex items-center gap-2 my-3">
                    <p className="font-semibold text-lg bg-gray-200 text-black-800 px-3 py-[6px] rounded-full inline-block">
                        File Upload
                    </p>
                    <Tooltip onClick={() => setShowInstruction(true)} title="Instruction">
                        <div className="px-2 py-[5px] cursor-pointer bg-[rgb(0,78,150)] rounded-full">
                            <QuestionMarkIcon sx={{ fontSize: "20px", color: "white" }} />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex items-start gap-4 flex-wrap justify-between">
                    <div className="h-[200px] mt-3">
                        <FileDropZone
                            // setFilteredData={setFilteredData}
                            // setFileBlob={setFileBlob}
                            // setFileData={setVaData}
                            // fileTypes={["csv", "xls", "xlsx", "txt", "CSV", "XLS", "CLSX", "TXT"]}
                        />
                    </div>
                    {/* <Button
                        variant="outlined"
                        // onClick={handleDownloadSampleFile}
                        sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                        startIcon={<DownloadIcon />}
                    >
                        Downloads Standard File
                    </Button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-28 pt-2 items-center justify-center"></div>
            </div>
            {/* <ViewUploadedFile
                vaData={vaData}
                setVaData={setVaData}
                fileData={fileBlob}
                showUploadedFile={showUploadedFile}
                setShowUploadedFile={setShowUploadedFile}
                vaErrors={vaErrors}
                currentErrors={filterOn ? filteredErrors : vaErrors}
                setOpen={setOpen}
                setError={setVaErrors}
                filteredData={filteredData}
                filteredErrors={filteredErrors}
                setFilteredData={setFilteredData}
                selectNeededRows={selectNeededRows}
            /> */}
            <DecisionBox
                open={open}
                heading={"Confirmation"}
                // msg={`Records without errors will be send to another back office user for approval (${vaErrors && getTotalSuccessfullRowsCount(vaErrors, vaData)
                //     })`}
                // onOkClick={() => {
                //     handleForwardToChecker(
                //         vaData, vaErrors, fileBlob, user, setMessage, setShowToast, setType, makeRequest, setOpen, setShowUploadedFile, navigate, "VA request send for approval with FILEID"
                //     );
                // }}
                onCancelClick={() => {
                    setOpen(false);
                }}
                type={"confirm"}
            />
            <FileInstruction showInstruction={showInstruction} setShowInstruction={setShowInstruction} />

        </div>
    )
}

export default UploadFileSection