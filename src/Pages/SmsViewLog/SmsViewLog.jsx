import React, { useEffect, useState } from "react";
import SearchSetupForm from "./components/SearchSetupForm";
import DatagridComponent from "../../Common Components/DatagridComponent";
import { Card, CardContent } from "@mui/material";
import handleSelection from "../../utils/handleSelection";
import handleSort from "../../utils/handleSort";
import onFilterChange from "../../utils/onFilterChange";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PageTitle from "../../Common Components/PageTitle";
import { getColumnData } from "./services/getColumnData.jsx";
import BookIcon from '@mui/icons-material/Book';

const SmsViewLog = () => {

    const [gridApi, setGridApi] = useState(null);
    const [selectedClientDetail, setSelectedClientDetail] = useState(null);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const [approvalHistoryData, setApprovalHistoryData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [filteredRowList, setFilteredRowList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    return (

        <div
            onClick={() => {
                if (gridApi) {
                    gridApi.deselectAll();
                }
            }}
        >
            <Card
                sx={{
                    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "15px",
                }}
            >
                <CardContent>
                    <PageTitle
                        titleText="Sms View Log"
                        titleIcon={
                            <BookIcon
                                style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
                            />
                        }
                    />
                    <hr className="my-4" />
                    <SearchSetupForm
                        selectedClientDetail={selectedClientDetail}
                        setSelectedClientDetail={setSelectedClientDetail}
                        showCustomerDetails={showCustomerDetails}
                        setShowCustomerDetails={setShowCustomerDetails}
                        rowData={rowData}
                        setRowData={setRowData}
                        filteredRowList={filteredRowList}
                        setFilteredRowList={setFilteredRowList}
                        approvalHistoryData={approvalHistoryData}
                        setApprovalHistoryData={setApprovalHistoryData}
                        currentPage={currentPage}
                        setTotalRecords={setTotalRecords}
                    />
                    <DatagridComponent
                        gridApi={gridApi}
                        setGridApi={setGridApi}
                        data={filteredRowList ? filteredRowList : ""}
                        columnDefs={getColumnData(
                            setShowCustomerDetails,
                            setSelectedClientDetail
                        )}
                        handleSort={handleSort(
                            filteredRowList,
                            setFilteredRowList,
                            gridApi
                        )}
                        RowMissingMsg="Kindly provide search parameters"
                        onFilterChange={onFilterChange(filteredRowList, setFilteredRowList, rowData)}
                        type="dashboard1"
                        handleSelection={handleSelection(setApprovalHistoryData)}
                        rowSelection="multiple"
                        isPagination={true}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalRecords={totalRecords}
                    />
                </CardContent>
            </Card>
        </div>

    );
}

export default SmsViewLog