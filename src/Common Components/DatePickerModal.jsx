import React, { useContext, useEffect, useState } from "react";
import { isBefore, isToday } from "date-fns";
import {
  Button,
  Box,
  Typography,
  Modal,
  IconButton,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { AppStore } from "../Store/appStore.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  borderRadius: "0.7em",
  boxShadow: 24,
  p: 4,
};


const DatePickerModal = ({
  dateModalOpen,
  setDateModalOpen,
  handleDateSelect,
  filter,
  setFilterColor,
}) => {

  const getLastWeek = () =>{
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    return lastWeek;
  }

  const [startDate, setStartDate] = useState(getLastWeek());
  const [endDate, setEndDate] = useState(new Date());
  const [isFromToValid, setIsFromToValid] = useState(false);
  const { activeFilterColumn, setClearFilter } = useContext(AppStore);

  useEffect(() => {
    if (activeFilterColumn === null) {
      setStartDate(new Date());
      setEndDate(new Date());
    }
  }, [activeFilterColumn]);

  const handleApply = () => {
    if (startDate && endDate) {
      setFilterColor("red");
    } else {
      setClearFilter(false);
      setFilterColor("default");
    }

    handleDateSelect({
      startDate: startDate,
      endDate: endDate,
    });
    setDateModalOpen(false);
  };

  const handleCancel = () => {
    setDateModalOpen(false);
    setStartDate(getLastWeek());
    setEndDate(new Date());
  };



  useEffect(()=>{
    setIsFromToValid(isBefore(endDate,startDate))
  },[startDate,endDate])

  return (
    <Modal open={dateModalOpen} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <div className="flex items-center justify-between mb-2">
          <Typography id="modal-modal-title" variant="h6">
            {filter ? "Filter By Date" : "Search By Date"}
          </Typography>
          <Tooltip title="Close">
            <IconButton onClick={handleCancel}>
              <CloseIcon sx={{ color: "rgba(255,0,0,0.7)" }} />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 fixed-height-datepicker">
          <div>
            <p className="text-center mb-1 font-bold text-[16px]">From</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showMonthDropdown
              showYearDropdown
              inline
              dropdownMode="select"
              maxDate={new Date()}
              minDate={new Date(0)}
              renderCustomHeader={({ date, changeYear, changeMonth }) => (
                <div
                  className="flex items-center justify-center gap-2"
                  style={{ marginBottom: "10px" }}
                >
                  <select
                    className="px-2 py-1 outline-none  rounded-sm font-bold "
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {Array.from({ length: 3 }, (_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="px-2 py-1 outline-none rounded-sm font-bold "
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(value)}
                  >
                    {Array.from(Array(12).keys()).map((month) => (
                      <option key={month} value={month}>
                        {new Date(0, month).toLocaleString("en", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>
          <div>
            <p className="text-center mb-1 font-bold text-[16px]">To</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showMonthDropdown
              showYearDropdown
              inline
              dropdownMode="select"
              maxDate={new Date()}
              minDate={new Date(0)}
              renderCustomHeader={({ date, changeYear, changeMonth }) => (
                <div
                  className="flex items-center justify-center gap-2"
                  style={{ marginBottom: "10px" }}
                >
                  <select
                    className="px-2 py-1 outline-none rounded-sm font-bold "
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {Array.from({ length: 3 }, (_, index) => {
                      const year = new Date().getFullYear() - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="px-2 py-1 outline-none rounded-sm font-bold "
                    value={date.getMonth()}
                    onChange={({ target: { value } }) => changeMonth(value)}
                  >
                    {Array.from(Array(12).keys()).map((month) => (
                      <option key={month} value={month}>
                        {new Date(0, month).toLocaleString("en", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 mt-3">
          <div className="flex items-center text-red-500">
            {isFromToValid && (
              <p>
                Please select proper{" "}
                <span className="font-bold  italic">From</span> and{" "}
                <span className="font-bold  italic">To</span> date
              </p>
            )}
          </div>
          <div className="space-x-3">
            <Button
              disabled={isFromToValid}
              onClick={handleApply}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DatePickerModal;
