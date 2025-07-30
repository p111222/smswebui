import React, { useContext } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip, IconButton, Box, Typography, Modal } from "@mui/material";
import { AuthStore } from "../Store/authStore.jsx";
import { AppStore } from "../Store/appStore.jsx";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "0.8em",
  boxShadow: 24,
  p: 4,
};

const ExportModalComponent = ({ open, setOpen, exportData, tableName }) => {
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthStore)
  const { setLoading } = useContext(AppStore)

  const customeFileName = () => {
    return `CH-${user && user.userName.toUpperCase()}-${tableName}-${moment(new Date()).format("DD-MM-YYYY")}`
  }

  const formattedString = tableName && tableName
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());


  const title = user && (user.userType === "corporateUsers" || user.userType === "corporateUserAdmin") ? `${formattedString} - ${user.userName}` : formattedString;

  const downloadCSV = () => {
    if (!exportData.length > 0) {
      return;
    }
    const headers = Object.keys(exportData[0]).join(",");
    const rows = exportData
      .map((obj) => Object.values(obj).join(","))
      .join("\n");
    const csvContent = headers + "\n" + rows;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${customeFileName()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadXLSX = () => {
    if (!exportData.length > 0) {
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${customeFileName()}.xlsx`);
  };

  // Static Columns
  const downloadPDF = () => {
    if (!exportData.length > 0) {
      return;
    }
    setLoading(true)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [841, 1189], // A3 size in points
    });

    doc.setFontSize(16);
    doc.text(title, 40, 40)

    const columns = Object.keys(exportData[0]);
    const rows = exportData.map((obj) => {
      console.log(obj);
      return Object.values(obj)
    }
    );

    doc.autoTable({
      startY: 60, // Start below the title
      head: [columns],
      body: rows,
    });
    doc.save(`${customeFileName()}.pdf`);
    setLoading(false)
  };

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center justify-between gap-3">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Export
          </Typography>
          <Tooltip
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.1)", // Change background color on hover
              },
            }}
            title="Close"
          >
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{
                  color: "rgba(255,0,0,0.7)",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex items-center gap-10 justify-between">
          <div
            onClick={downloadCSV}
            className="flex flex-col gap-3 items-center hover:bg-gray-300 cursor-pointer p-5 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
            <span>CSV</span>
          </div>
          <div
            onClick={downloadXLSX}
            className="flex flex-col gap-3 items-center hover:bg-gray-300 cursor-pointer p-5 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span>XLSX</span>
          </div>
          <div
            onClick={downloadPDF}
            className="flex flex-col gap-3 items-center hover:bg-gray-300 cursor-pointer p-5 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <span>PDF</span>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ExportModalComponent;
