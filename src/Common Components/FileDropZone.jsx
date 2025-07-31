import React, { useContext } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AppStore } from "../Store/appStore";

const FileDropZone = ({
  handleFileChange,
  fileTypes,
  setFileBlob,
  setFileData,
  setFilteredData,
}) => {
  const { setMessage, setShowToast, setType } = useContext(AppStore);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length === 0) {
      return;
    }
    const fileType = droppedFiles[0].name.split(".")[1];
    if (fileTypes.includes(fileType)) {
      handleFileChange(
        droppedFiles,
        fileType,
        setFileData,
        setFileBlob,
        setMessage,
        setShowToast,
        setType,
        setFilteredData
      );
      setShowToast(true);
      setMessage(`File ${droppedFiles[0].name} successfully added.`);
      setType("success");
    } else {
      setShowToast(true);
      setMessage("File not supported");
      setType("error");
    }
    event.target.value = null;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (event) => {
    console.log(event);

    const selectedFiles = event.target.files;

    if (selectedFiles.length === 0) {
      return;
    }

    const fileType = selectedFiles[0].name.split(".")[1];
    console.log(fileType);

    if (fileTypes.includes(fileType)) {
      handleFileChange(
        selectedFiles,
        fileType,
        setFileData,
        setFileBlob,
        setMessage,
        setShowToast,
        setType,
        setFilteredData
      );
      setShowToast(true);
      setMessage(`File ${selectedFiles[0].name} successfully added.`);
      setType("success");
    } else {
      setShowToast(true);
      setMessage("File not supported");
      setType("error");
    }
    event.target.value = null;
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      htmlFor="fileUpload"
    >
      <div className="cursor-pointer rounded-xl p-4 border-4 border-gray-400 border-dotted">
        <label
          htmlFor="fileUpload"
          className="w-full h-full cursor-pointer rounded-xl p-4"

        >
          <input
            autocomplete="off"
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            id="fileUpload"
          />
          <div className="w-full text-2xl justify-center">
            <p className="text-center">
              Drag and drop an pdf or click to upload
            </p>
          </div>
          <div htmlFor="fileUpload" className="flex items-center justify-center">
            <CloudUploadIcon sx={{ fontSize: "60px" }} />
          </div>
        </label>
      </div>
    </label>
  );
};

export default FileDropZone;
