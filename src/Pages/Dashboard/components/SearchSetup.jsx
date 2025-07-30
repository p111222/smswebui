import React, { useContext, useState } from "react";
import DatagridComponent from "../../../Common Components/DatagridComponent";
import DatePickerModal from "../../../Common Components/DatePickerModal";
import { Card, CardContent, Tooltip, Switch } from "@mui/material";
import { AuthStore } from "../../../Store/authStore.jsx";
import ExportModalComponent from "../../../Common Components/ExportModalComponent.jsx";
import handleSort from "../../../utils/handleSort.js";
import onFilterChange from "../../../utils/onFilterChange.js";
import handleSelection from "../../../utils/handleSelection.js";
import handleDateSelect from "../../../utils/handleDateSelect.js";
import { AppStore } from "../../../Store/appStore.jsx";
import SearchSetupForm from "./SearchSetupForm.jsx";
import { handleStatusChange } from "../services/searchSetupService.js";
import { useNavigate } from "react-router-dom";
import { getSearchSetupColumn } from "../services/getSearchSetupColumn.jsx";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate.js";
import getExportData from "../../../utils/getExportData.js";
import { searchSetupColumns } from "../../../utils/constants.js";

const SearchSetup = ({ searchGridApi, setSearchGridApi }) => {
  const { user } = useContext(AuthStore);
  const { setLoading, setClientActiveFlg, setTaskType, setMakerEmail } = useContext(AppStore);
  const axiosPrivate = useAxiosPrivate();
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchRowData, setSearchRowData] = useState([]);
  const [viewDetails, setViewDetails] = useState([]);
  const [filteredRowList, setFilteredRowList] = useState([]);
  const [filterColor, setFilterColor] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  console.log("CUrrent: ", currentPage)

  return (
    <Card
      sx={{
        boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "15px",
      }}
    >
      <CardContent>
        <p className="font-semibold text-lg bg-gray-200 text-black-800 px-3 py-[6px] rounded-full inline-block">
          Approve Record Search
        </p>
        <SearchSetupForm
          startDate={startDate}
          endDate={endDate}
          setSearchRowData={setSearchRowData}
          setDateModalOpen={setDateModalOpen}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setExportModalOpen={setExportModalOpen}
          currentPage={currentPage}
          setTotalRecords={setTotalRecords}
          searchRowData={searchRowData}
          setFilteredRowList={setFilteredRowList}
        />
        <DatagridComponent
          gridApi={searchGridApi}
          setGridApi={setSearchGridApi}
          data={filteredRowList ? filteredRowList : []}
          columnDefs={getSearchSetupColumn(axiosPrivate, navigate, user, setLoading, setClientActiveFlg, setTaskType, setMakerEmail)}
          RowMissingMsg="Please provide search parameters"
          handleSort={handleSort(
            filteredRowList,
            setFilteredRowList,
            searchGridApi
          )}
          onFilterChange={onFilterChange(filteredRowList, setFilteredRowList, searchRowData)}
          handleSelection={handleSelection(setViewDetails)}
          rowSelection="multiple"
          isPagination={true}
          isPaginationWithoutApi={false}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRecords={totalRecords}
        />
        <DatePickerModal
          dateModalOpen={dateModalOpen}
          setDateModalOpen={setDateModalOpen}
          handleDateSelect={handleDateSelect(setStartDate, setEndDate)}
          setFilterColor={setFilterColor}
          preventMonth={false}
        />
        <ExportModalComponent
          open={exportModalOpen}
          setOpen={setExportModalOpen}
          exportData={viewDetails.length > 0 ? getExportData(viewDetails, searchSetupColumns) : getExportData(searchRowData, searchSetupColumns)}
          tableName="SEARCH-SETUP"
        />
      </CardContent>
    </Card>
  );
};

export default SearchSetup;
