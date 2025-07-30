import React, { useContext } from "react";
import { Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import formatChatDate from "../utils/formatChatDate";
import handleDownloadChatFile from "../utils/handleDownloadChatFile";
import formatBytes from "../utils/formatBytes";
import { AuthStore } from "../Store/authStore";
import { AppStore } from "../Store/appStore";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const MessageBubble = ({
  messageId,
  message,
  createdOn,
  createdBy,
  username,
  isAttachment,
  fileName,
  fileSize,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { setLoading, setShowToast, setMessage, setType } =
    useContext(AppStore);
  const { user } = useContext(AuthStore)

  return (
    <div>
      <div
        className={`flex items-center ${createdBy === user.userEmail ? "justify-end" : "justify-start"
          }`}
      >
        <div
          className={`max-w-[60%] flex flex-col ${createdBy === user.userEmail ? "items-end" : "items-start"
            }`}
        >
          {isAttachment === "Y" && (
            <div className="rounded-lg p-1 bg-blue-300">
              <div className="rounded-[5px] bg-blue-50 text-sm px-2 py-1 flex items-center gap-2">
                <div>
                  <p className="text-[12px] text-gray-800 font-semibold">
                    {fileName ? fileName : ""}
                  </p>
                  <div className="flex items-center gap-1 text-[12px] text-gray-600">
                    <span>{fileSize && formatBytes(fileSize)}</span>
                    {fileSize && fileName && <span>.</span>}
                    <span>{fileName && fileName.split(".")[1]}</span>
                  </div>
                </div>
                <Tooltip title="Download File">
                  <DownloadIcon
                    onClick={() => {
                      handleDownloadChatFile(
                        axiosPrivate,
                        messageId,
                        fileName || "default",
                        setLoading,
                        setShowToast,
                        setMessage,
                        setType
                      );
                    }}
                    sx={{
                      color: "#60a5fa   ",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          )}
          {message && (
            <div
              className={`break-words font-semibold text-gray-800 rounded-lg px-3 py-2 mt-1 text-[15px]  ${createdBy === user.userEmail ? "bg-blue-200" : "bg-blue-50"
                } `}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex ${createdBy === user.userEmail ? "justify-end mr-1" : "justify-start ml-1"
          }`}
      >
        <Tooltip title={createdBy !== user.userEmail && createdBy}>
          <div className="flex cursor-default items-center gap-1">
            {createdBy !== user.userEmail && username && (
              <p className={`text-[11px] font-semibold text-gray-700`}>{username}.</p>
            )}
            <p className={`text-[11px] font-semibold text-gray-700`}>{formatChatDate(createdOn)}</p>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageBubble;
