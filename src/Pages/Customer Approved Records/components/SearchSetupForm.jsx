import React, { useContext, useEffect, useRef, useState } from "react";
import { handleSearchClick } from "../services/searchSetup";
import Input from "@mui/joy/Input";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import { Tooltip, IconButton, TextField, Button } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import handleDateModalOpen from "../../../utils/handleDateModalOpen";
import DatePickerModal from "../../../Common Components/DatePickerModal";
import ExportModalComponent from "../../../Common Components/ExportModalComponent";
import { AuthStore } from "../../../Store/authStore";
import { AppStore } from "../../../Store/appStore";
import handleDateSelect from "../../../utils/handleDateSelect";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import CustomerDetails from "../../Customer Approved Records/components/CustomerDatails";
import validateInputField from "../../../utils/validateInputField";
import { approveHistoryColumn, CONSTANTS } from "../../../utils/constants";
import getExportData from "../../../utils/getExportData";

const SearchSetupForm = ({
  selectedClientDetail,
  setSelectedClientDetail,
  showCustomerDetails,
  setShowCustomerDetails,
  customerApprovedRecordsData,
  rowData,
  setRowData,
  filteredRowList,
  setFilteredRowList,
  currentPage,
  setTotalRecords,
  isFieldDisabled,
  setIsFieldDisabled,
}) => {
  const { user } = useContext(AuthStore);
  const { setLoading, setShowToast, setMessage, setType, setClearFilter } =
    useContext(AppStore);
  const axiosPrivate = useAxiosPrivate();
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterColor, setFilterColor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  // Scroll to error Ref
  const phoneNumberRef = useRef(null)

  const [isUseEffectCalled, setIsUseEffectCalled] = useState(false)

  useEffect(() => {
    if (currentPage > 1 || isUseEffectCalled) {
      setIsUseEffectCalled(true)
      handleSearchClick(
        axiosPrivate,
        startDate,
        endDate,
        setFilteredRowList,
        setRowData,
        setMessage,
        setShowToast,
        setType,
        setLoading,
        currentPage,
        setTotalRecords
      );
    }
  }, [currentPage])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchClick(
            axiosPrivate,
            startDate,
            endDate,
            setFilteredRowList,
            setRowData,
            setMessage,
            setShowToast,
            setType,
            setLoading,
            currentPage,
            setTotalRecords
          );
        }}
        className="w-full h-full mb-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
          <div className="w-full mb-4">
            <label className="font-semibold text-sm text-neutral-500">
              Phone Number
            </label>
            {!isFieldDisabled && <span className="text-red-500 ml-1">*</span>}
            <Input
              autoComplete="off"
              ref={phoneNumberRef}
              variant="soft"
              placeholder="Enter 10-digit Phone Number"
              className="w-full mt-1"
              type="tel"
              value={phoneNumber}
              disabled={isFieldDisabled}
              onChange={(e) => {
                const inputValue = e.target.value;

                const digitsOnly = inputValue.replace(/\D/g, '');
                const truncatedValue = digitsOnly.slice(0, 10);

                setPhoneNumber(truncatedValue);

                if (truncatedValue.length === 10) {
                  setMessage("");
                  setType("");
                  setShowToast(false);
                  setToastShown(false);

                  if (fieldErrors?.custId) {
                    setFieldErrors(prev => ({ ...prev, custId: undefined }));
                  }
                } else if (!toastShown && inputValue.length > 0) {
                  setMessage("Please enter exactly 10 digits");
                  setType("error");
                  setShowToast(true);
                  setToastShown(true);
                }
              }}
              sx={{
                "& input::placeholder": { fontSize: "14px" },
                backgroundColor: "#F1F4F8",
              }}
            />
          </div>
          <div className="flex flex-col mb-2 gap-2 w-full">
            <label className="font-semibold text-sm text-neutral-500">
              Date Range :
            </label>
            <div className="flex items-center gap-2">
              <TextField
                type="text"
                className="w-full"
                id="datePicker"
                autoComplete="off"
                style={{ background: "#F1F4F8" }}
                value={
                  startDate && endDate ? `From ${startDate} To ${endDate}` : ""
                }
                placeholder="From DD-MM-YYYY To DD-MM-YYYY"
                sx={{
                  '& input[type="text"]': {
                    paddingY: "0px",
                    height: "38px",
                    width: "100%",
                    cursor: "pointer",
                    caretColor: "transparent",
                    fontSize: "14px",
                  },
                  '& input[type="text"]::placeholder': {
                    fontSize: "14px",
                  },
                  "& .MuiInputAdornment-root": {
                    marginLeft: "-10px",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <div style={{ background: "#F1F4F8" }}>
                      <CalendarMonthIcon
                        sx={{ color: "black", marginRight: "0.5em" }}
                      />
                    </div>
                  ),
                  onClick: () => handleDateModalOpen(setDateModalOpen),
                }}
              />
              {((startDate && endDate)) && (
                <Tooltip
                  onClick={() => {
                    setEndDate(null);
                    setStartDate(null);

                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,0,0,0.1)",
                    },
                  }}
                  title="Clear search setup"
                >
                  <IconButton>
                    <CancelRoundedIcon
                      sx={{
                        color: "rgba(255,0,0,0.7)",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end gap-4 items-center mt-2">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                width: "auto",
                height: "auto",
                padding: "8px 16px",
                color: "rgb(43,135,200)",
                "&:hover": {
                  backgroundColor: "#e5e7eb",
                },
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                if (!filteredRowList || filteredRowList.length === 0)  {
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
                setFilteredRowList(rowData || []);
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
      </form>
      <CustomerDetails
        showCustomerDetails={showCustomerDetails}
        selectedClientDetail={selectedClientDetail}
        setShowCustomerDetails={setShowCustomerDetails}
        setSelectedClientDetail={setSelectedClientDetail}
      />
      <DatePickerModal
        dateModalOpen={dateModalOpen}
        setDateModalOpen={setDateModalOpen}
        handleDateSelect={handleDateSelect(setStartDate, setEndDate)}
        setFilterColor={setFilterColor}
        preventMonth={true}
      />
        <ExportModalComponent
          open={exportModalOpen}
          setOpen={setExportModalOpen}
          exportData={
            (customerApprovedRecordsData?.length > 0)
              ? getExportData(customerApprovedRecordsData, approveHistoryColumn)
              : (filteredRowList?.length > 0)
                ? getExportData(filteredRowList, approveHistoryColumn)
                : []
          }
          tableName="APPROVAL-HISTORY"
        />
    </>
  );
};

export default SearchSetupForm;
