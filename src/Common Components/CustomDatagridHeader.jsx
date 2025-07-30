import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DatePickerModal from "./DatePickerModal";
import convertTOddmmyy from "../utils/convertTOddmmyy";
import { AppStore } from "../Store/appStore.jsx";
import { approvalHistoryStatus, CONSTANTS, operatorOptionsForConcern, operatorOptionsForNumber, operatorOptionsForRole, operatorOptionsForString, operatorOptionsForTaskType, operatorOptionsForTicketStatus, pendingTaskStatus, requestTypeRole, vaStatus } from "../utils/constants.js";
import CustomHeaderCheckbox from "./CustomHeaderCheckbox.jsx";

const CustomDatagridHeader = (props) => {
  const { column, onSort, onFilterChange, gridApi, columnState, api, data } = props;

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [columnWidth, setColumnWidth] = useState("");
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [filterOperator, setFilterOperator] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterColor, setFilterColor] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { clearFilter, setClearFilter, setLoading, isFilterActive,
    setIsFilterActive,
    lastFilterColumn,
    setLastFilterColumn, } = useContext(AppStore);
  const [statusOption, setStatusOption] = useState([])
  const [roleOption, setRoleOption] = useState([])

  const [dateField, setDateField] = useState("");

  useEffect(() => {
    if (column.userProvidedColDef.colId === "supportGrieStatus") {
      setStatusOption(operatorOptionsForTicketStatus)
    } else if (window.location.pathname.includes("approvalhistory")) {
      setStatusOption(approvalHistoryStatus)
    } else if (window.location.pathname.includes("vamaintenance")) {
      setStatusOption(vaStatus)
    } else if (column.userProvidedColDef.colId === "searchSetupStatus") {
      setStatusOption(vaStatus)
    } else if (column.userProvidedColDef.colId === "pendingTaskStatus") {
      setStatusOption(pendingTaskStatus)
    } else if (column.userProvidedColDef.colId === "pendingRole") {
      setRoleOption(operatorOptionsForRole)
    } else if (column.userProvidedColDef.colId === "approvedRole") {
      setRoleOption([{ value: "useradmin", label: "useradmin" }, ...operatorOptionsForRole])
    }
  }, [])



  useEffect(() => {
    if (clearFilter) {
      setFilterValue("");
      setFilterOperator()
      setClearFilter(false);
      setFilterColor("default");
      setStartDate("");
      setEndDate("");
      setIsFilterActive(0);
      setLastFilterColumn("");
      setDateField("");
    }
  }, [clearFilter]);

  const handleDateSelect = (date) => {
    setStartDate(date.startDate);
    console.log("Tesitnt the ui")
    setEndDate(date.endDate);
    if (lastFilterColumn === dateField) {
      setIsFilterActive((prev) => prev);
    } else {
      setLastFilterColumn(dateField);
      setIsFilterActive((prev) => prev + 1);
    }
    onFilterChange(
      column.userProvidedColDef.field,
      "",
      "",
      isFilterActive,
      lastFilterColumn,
      convertTOddmmyy(date.startDate),
      convertTOddmmyy(date.endDate)
    );
  };



  useEffect(() => {
    if (column && columnState) {
      const resizedColumn = columnState.find(
        (col) => col.colId === column.getColId()
      );
      if (resizedColumn) {
        setColumnWidth(resizedColumn.width);
      }
    }
  }, [columnState]);

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSort = (order) => {
    onSort(column, order);
    handleSortClose();
  };

  const handleFilterClick = (event) => {
    if (
      column.userProvidedColDef.field === "Date-Timestamp" ||
      column.userProvidedColDef.field === "Created On" ||
      column.userProvidedColDef.field === "Last Modified On" ||
      column.userProvidedColDef.field === "Modified On" ||
      column.userProvidedColDef.field === "Last Login" ||
      column.userProvidedColDef.field === "Action Date-Timestamp"
    ) {
      setDateModalOpen(true);
      setDateField(column.userProvidedColDef.field);
    } else {
      const currentFilter = event.currentTarget;
      setFilterAnchorEl(currentFilter);
    }
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleChange = (event) => {
    if (column.userProvidedColDef.field === "Task Type" || column.userProvidedColDef.field === "Type of Concern" || column.userProvidedColDef.field === "Status" || column.userProvidedColDef.field === "Role" || column.userProvidedColDef.field === "Request Type") {
      setFilterOperator("&&");
      setFilterValue(event.target.value);
    } else {
      setFilterOperator(event.target.value);
    }
  };

  const handleFilterChange = (field) => {
    if (filterValue || (startDate && endDate)) {
      setFilterColor("red");
      if (lastFilterColumn === field) {
        setIsFilterActive((prev) => prev);
      } else {
        setLastFilterColumn(field);
        setIsFilterActive((prev) => prev + 1);
      }
    } else {
      setFilterColor("default");
      setIsFilterActive(0);
    }
    let requestIdOperator;
    if (column.userProvidedColDef.field === "Task ID" || column.userProvidedColDef.field === "Ticket ID") {
      requestIdOperator = "&&";
    } else {
      requestIdOperator = filterOperator;
    }
    onFilterChange(field, requestIdOperator, filterValue, isFilterActive, lastFilterColumn);
    handleFilterClose();
  };


  return (
    <>
      <div
        className={`flex items-center w-full justify-between`}
        style={{ minWidth: "10px" }}
      >
        {column.userProvidedColDef.field === "checkbox" ? (
          <CustomHeaderCheckbox api={api} data={data} />
        ) : (
          <Tooltip
            title={
              column.userProvidedColDef.field === "Download File"
                ? "Download File"
                : column.userProvidedColDef.headerName
            }
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
            >
              {column.userProvidedColDef.headerName}
            </span>
          </Tooltip>
        )}
        <div className="flex items-center gap-1">
          {column.colDef.filterable && (
            <Tooltip title="Filter">
              <IconButton
                aria-label="filter"
                className="cursor-pointer"
                onClick={(e) => handleFilterClick(e)}
                sx={{
                  padding: "8px", // Adjust padding to reduce button size
                  "& .MuiSvgIcon-root": {
                    fontSize: "14px", // Adjust icon size
                  },
                  color: clearFilter ? "default" : filterColor,
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Sort Menu */}
      <Menu
        id="sort-menu"
        anchorEl={sortAnchorEl}
        keepMounted
        open={Boolean(sortAnchorEl)}
        onClose={handleSortClose}
      >
        <MenuItem onClick={() => handleSort("asc")}>Sort Ascending</MenuItem>
        <MenuItem onClick={() => handleSort("desc")}>Sort Descending</MenuItem>
      </Menu>
      {/* Filter Menu */}
      <Menu
        id="filter-menu"
        anchorEl={filterAnchorEl}
        keepMounted
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <div className="px-2">
          <div className="flex items-center justify-between">
            <p className="font-bold">{column.userProvidedColDef.headerName}</p>
            <div>
              <Tooltip title="Sort Ascending">
                <IconButton
                  aria-label="arrowup"
                  onClick={() => onSort(column, "asc")}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sort Descending">
                <IconButton
                  aria-label="arrowdown"
                  onClick={() => onSort(column, "desc")}
                >
                  <ArrowDownwardIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <hr />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFilterChange(column.userProvidedColDef.field);
            }}
            className={`flex ${column.userProvidedColDef.field === "Task ID"
              ? "items-end"
              : "items-center"
              }  gap-5`}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              {!(column.userProvidedColDef.field === "Task ID" || column.userProvidedColDef.field === "Ticket ID") && (
                <InputLabel id="demo-simple-select-standard-label">
                  Operator
                </InputLabel>
              )}
              {column.userProvidedColDef.field === "Task ID" || column.userProvidedColDef.field === "Ticket ID" ? (
                <p>Contains</p>
              ) : (
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={filterOperator}
                  onChange={handleChange}
                  label="Operator"
                >
                  {column.userProvidedColDef.type === "number"
                    ? operatorOptionsForNumber &&
                    operatorOptionsForNumber.map((operatorOption) => (
                      <MenuItem
                        key={operatorOption.value}
                        value={operatorOption.value}
                      >
                        {operatorOption.label}
                      </MenuItem>
                    ))
                    : column.userProvidedColDef.field === "Task Type"
                      ? operatorOptionsForTaskType.map((operatorOption) => {
                        return (
                          <MenuItem
                            key={operatorOption.value}
                            sx={{ fontSize: "14px" }}
                            value={operatorOption.value}
                          >
                            {operatorOption.label}
                          </MenuItem>
                        );
                      })
                      :
                      column.userProvidedColDef.field === "Type of Concern"
                        ? operatorOptionsForConcern.map((operatorOption) => {
                          return (
                            <MenuItem
                              key={operatorOption.value}
                              sx={{ fontSize: "14px" }}
                              value={operatorOption.value}
                            >
                              {operatorOption.label}
                            </MenuItem>
                          );
                        })
                        :
                        column.userProvidedColDef.field === "Status"
                          ? statusOption.map((operatorOption) => {
                            return (
                              <MenuItem
                                key={operatorOption.value}
                                sx={{ fontSize: "14px" }}
                                value={operatorOption.value}
                              >
                                {operatorOption.label}
                              </MenuItem>
                            );
                          })
                          :
                          column.userProvidedColDef.field === "Role"
                            ? roleOption.map((operatorOption) => {
                              return (
                                <MenuItem
                                  key={operatorOption.value}
                                  sx={{ fontSize: "14px" }}
                                  value={operatorOption.value}
                                >
                                  {operatorOption.label}
                                </MenuItem>
                              );
                            })
                            :
                            column.userProvidedColDef.field === "Request Type"
                              ? requestTypeRole.map((operatorOption) => {
                                return (
                                  <MenuItem
                                    key={operatorOption.value}
                                    sx={{ fontSize: "14px" }}
                                    value={operatorOption.value}
                                  >
                                    {operatorOption.label}
                                  </MenuItem>
                                );
                              })
                              :
                              operatorOptionsForString.map((operatorOption, i) => {
                                if (column.userProvidedColDef.field === "Task ID" || column.userProvidedColDef.field === "Ticket ID") {
                                  if (i === 0) {
                                    return <p>Contains</p>;
                                  }
                                } else {
                                  return (
                                    <MenuItem
                                      key={operatorOption.value}
                                      value={operatorOption.value}
                                    >
                                      {operatorOption.label}
                                    </MenuItem>
                                  );
                                }
                              })}
                </Select>
              )}
            </FormControl>
            {!(column.userProvidedColDef.field === "Task Type" || column.userProvidedColDef.field === "Type of Concern" || column.userProvidedColDef.field === "Status" || column.userProvidedColDef.field === "Role" || column.userProvidedColDef.field === "Request Type") && (
              <TextField
                id="standard-basic"
                label="Filter Value"
                variant="standard"
                value={filterValue}
                type={column.userProvidedColDef.type === "number" ? "number" : "text"}
                onChange={(e) => {
                  const inputValue = e.target.value
                  setFilterValue(
                    column.userProvidedColDef.field === "Client Code"
                      ? inputValue.toUpperCase()
                      : inputValue
                  )
                }
                }
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
            )}
            <Button
              type="submit"
              className="mt-5 font-semibold"
              variant="text"
              disabled={
                (filterValue && filterOperator) ||
                  ((column.userProvidedColDef.field === "Task ID" || column.userProvidedColDef.field === "Ticket ID") && filterValue)
                  ? false
                  : true
              }
            >
              Apply
            </Button>
          </form>
        </div>
      </Menu>
      <DatePickerModal
        dateModalOpen={dateModalOpen}
        setDateModalOpen={setDateModalOpen}
        handleDateSelect={handleDateSelect}
        setFilterColor={setFilterColor}
        filter={true}
      />
    </>
  );
};

export default CustomDatagridHeader;
