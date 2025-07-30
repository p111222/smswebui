import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { Tooltip } from "@mui/material";

const Pagination = ({
    totalRecords,
    recordsPerPage,
    currentPage,
    setCurrentPage,
    filteredData
}) => {

    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const handleFirstPage = () => {
        if (totalRecords === 0) {
            return;
        }
        setCurrentPage(1);
    };
    const handleLastPage = () => {
        if (totalRecords === 0) {
            return;
        }
        setCurrentPage(totalPages);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="border text-sm border-[#BABFC7] mt-[-2px] gap-10 px-4 py-2 rounded-br-sm rounded-bl-sm flex items-center justify-end">
            <p>
                <span className="font-bold">Total Records: </span>
                {filteredData.length}<span className="font-bold"> out of</span> {totalRecords}
            </p>
            <p className="flex items-center gap-2">
                <Tooltip title={currentPage === 1 ? "" : "First Page"}>
                    <FirstPageIcon
                        onClick={handleFirstPage}
                        sx={{
                            cursor: currentPage === 1 ? "" : "pointer",
                            color: currentPage === 1 ? "lightgray" : "",
                            fontSize: "19px",
                        }}
                    />
                </Tooltip>
                <Tooltip title={currentPage === 1 ? "" : "Previous Page"}>
                    <KeyboardArrowLeftIcon
                        sx={{
                            cursor: currentPage === 1 ? "" : "pointer",
                            color: currentPage === 1 ? "lightgray" : "",
                            fontSize: "19px",
                        }}
                        onClick={handlePreviousPage}
                    />
                </Tooltip>

                <span>
                    {totalRecords === 0 ? (
                        <p className="">Page 0 of 0</p>
                    ) : (
                        <p className="">
                            Page {currentPage} of {totalPages}
                        </p>
                    )}
                </span>
                <Tooltip
                    title={
                        currentPage === totalPages || totalRecords === 0 ? "" : "Next Page"
                    }
                >
                    <KeyboardArrowRightIcon
                        sx={{
                            cursor:
                                currentPage === totalPages || totalRecords === 0
                                    ? ""
                                    : "pointer",
                            color:
                                currentPage === totalPages || totalRecords === 0
                                    ? "lightgray"
                                    : "",
                            fontSize: "19px",
                        }}
                        onClick={handleNextPage}
                    />
                </Tooltip>

                <Tooltip
                    title={
                        currentPage === totalPages || totalRecords === 0 ? "" : "Last Page"
                    }
                >
                    <LastPageIcon
                        sx={{
                            cursor:
                                currentPage === totalPages || totalRecords === 0
                                    ? ""
                                    : "pointer",
                            color:
                                currentPage === totalPages || totalRecords === 0
                                    ? "lightgray"
                                    : "",
                            fontSize: "19px",
                        }}
                        onClick={handleLastPage}
                    />
                </Tooltip>
            </p>
        </div>
    );
};

export default Pagination;
