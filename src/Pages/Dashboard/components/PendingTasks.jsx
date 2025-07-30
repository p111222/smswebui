import React, { useContext, useEffect, useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import PageTitle from "../../../Common Components/PageTitle.jsx";
import IosShareIcon from "@mui/icons-material/IosShare";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AuthStore } from "../../../Store/authStore.jsx";
import ExportModalComponent from "../../../Common Components/ExportModalComponent.jsx";
import DatagridComponent from "../../../Common Components/DatagridComponent.jsx";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";
import handleSort from "../../../utils/handleSort.js";
import { AppStore } from "../../../Store/appStore.jsx";
import onFilterChange from "../../../utils/onFilterChange.js";
import handleSelection from "../../../utils/handleSelection.js";
import RequestDetails from "./RequestDetails.jsx";
import Remarks from "./Remarks.jsx";
import { getPendingCustomers } from "../services/pendingTaskService.js";
import { useNavigate } from "react-router-dom";
import { getPendingTaskColumns } from "../services/getPendingTaskColumns.jsx";
import Pagination from "../../../Common Components/Pagination.jsx";
import getExportData from "../../../utils/getExportData.js";
import { pendingColumns } from "../../../utils/constants.js";
import PaginationWithoutApi from "../../../Common Components/PaginationWithoutApi.jsx";

const PendingTasks = ({ pendingGridApi, setPendingGridApi }) => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useContext(AuthStore);
  const navigate = useNavigate();
  const { setClearFilter, setFilterValue, setLoading, setTaskType, setShowToast, setMessage, setType, setMakerEmail } = useContext(AppStore);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [filteredRowList, setFilteredRowList] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [remainingData, setRemainingData] = useState([]);
  const [approveReject, setApproveReject] = useState([]);
  const [selectedClientDetail, setSelectedClientDetail] = useState(null);
  const [showRemark, setShowRemark] = useState(false);
  const [button, setButton] = useState("");
  const [refresh, setRefresh] = useState("");
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)


  useEffect(() => {
    getPendingCustomers(setFilteredRowList, setRowData, axiosPrivate, setLoading, setShowData, setRemainingData);

    return () => {
      setFilterValue("");
    };
  }, [refresh]);

  return (
    <>
      <Card
        sx={{
          boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
        }}
      >
        <CardContent>
          <PageTitle
            titleText="Task Board"
            titleIcon={
              <DashboardIcon
                style={{ color: "rgb(148,25,20)", fontSize: "25px" }}
              />
            }
          />
          <hr className="mt-3" />
          <div className="flex items-center justify-between my-3">
            <p className="font-semibold text-lg bg-gray-200 text-black-800 px-3 py-[6px] rounded-full inline-block">
              Pending Items
            </p>
            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (filteredRowList.length === 0) {
                    setShowToast(true)
                    setMessage("No data to export")
                    setType("info")
                    return
                  }
                  setExportModalOpen(true);
                }}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(43,135,200)",
                  "&:hover": {
                    backgroundColor: "#e5e7eb",
                  },
                }}
                startIcon={<IosShareIcon />}
              >
                Export
              </Button>
              <Button
                onClick={() => {
                  setShowData(remainingData)
                  setClearFilter(true);
                }}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "rgb(148,25,20)",
                  "&:hover": {
                    backgroundColor: "#e5e7eb",
                  },
                }}
                startIcon={<ClearAllIcon />}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          <DatagridComponent
            gridApi={pendingGridApi}
            setGridApi={setPendingGridApi}
            data={showData ? showData : []}
            columnDefs={getPendingTaskColumns(
              axiosPrivate,
              setShowCustomerDetails,
              setSelectedClientDetail,
              navigate,
              user,
              setLoading,
              setTaskType,
              setMakerEmail
            )}
            handleSort={handleSort(
              showData,
              setShowData,
              pendingGridApi
            )}
            onFilterChange={onFilterChange(showData, setShowData, filteredRowList)}
            rowSelection="multiple"
            handleSelection={handleSelection(setApproveReject)}
            isPagination={false}
          />
          <PaginationWithoutApi currentPage={currentPage} setCurrentPage={setCurrentPage} setRowData={setRowData} rowData={rowData} filteredRowList={filteredRowList} setFilteredRowList={setFilteredRowList} showData={showData} setShowData={setShowData} setRemainingData={setRemainingData} />
        </CardContent>
        <RequestDetails
          selectedClientDetail={selectedClientDetail}
          setSelectedClientDetail={setSelectedClientDetail}
          showCustomerDetails={showCustomerDetails}
          setShowCustomerDetails={setShowCustomerDetails}
          setShowRemark={setShowRemark}
          setButton={setButton}
        />
        <Remarks
          selectedClientDetail={selectedClientDetail}
          setSelectedClientDetail={setSelectedClientDetail}
          setShowCustomerDetails={setShowCustomerDetails}
          showRemark={showRemark}
          setShowRemark={setShowRemark}
          button={button}
          setRefresh={setRefresh}
        />
        <ExportModalComponent
          open={exportModalOpen}
          setOpen={setExportModalOpen}
          exportData={
            approveReject.length > 0 ? getExportData(approveReject, pendingColumns) : getExportData(showData, pendingColumns)
          }
          tableName="PENDING-TASKS"
        />
      </Card>
    </>
  );
};

export default PendingTasks;
