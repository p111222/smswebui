const onFilterChange =
  (filteredRowList, setFilteredRowList, rowData) =>
    (field, filterOperator, filterValue, isActiveFilter, lastFilterColumn, startDate, endDate) => {
      const filterFrom = isActiveFilter === 1 && lastFilterColumn === field ? rowData : filteredRowList;
      console.log("isActiveFilter", isActiveFilter, filterFrom);
      let filteredData;
      if (
        field === "Date-Timestamp" ||
        field === "Created On" ||
        field === "Last Modified On" ||
        field === "Modified On" ||
        field === "Last Login" ||
        field === "Action Date-Timestamp"
      ) {
        const convertToDate = (dateStr) => {
          console.log("Date String", dateStr);
          const [day, month, yearTime] = dateStr.split("-");
          const [year] = yearTime.split(" ");
          return new Date(year, month - 1, day); // month is zero-based
        };

        const start = convertToDate(startDate);
        const end = convertToDate(endDate);
        filteredData = filterFrom.filter((item) => {
          if (item[field] === "") {
            return;
          }
          const itemDate = convertToDate(item[field]);
          return itemDate >= start && itemDate <= end;
        });

        console.log("Filtered Data:", filteredData);
        setFilteredRowList(filteredData);
        return;
      }

      switch (filterOperator) {
        case "=":
          filteredData = filterFrom.filter(
            (item) => item[field] && item[field] == filterValue.trim()
          );
          break;
        case ">":
          filteredData = filterFrom.filter(
            (item) => item[field] && item[field] > filterValue.trim()
          );
          break;
        case "<":
          filteredData = filterFrom.filter(
            (item) => item[field] && item[field] < filterValue.trim()
          );
          break;
        case "&&":
          if (field === "Task ID") {
            filteredData = filterFrom.filter(
              (item) =>
                (item["Task ID"] &&
                  item["Task ID"]
                    .toLowerCase()
                    .includes(filterValue.toLowerCase())) ||
                (item["File ID"] &&
                  item["File ID"].toLowerCase().includes(filterValue.toLowerCase()))
            );
          } else if (field === "Status" || field === "Request Type") {
            filteredData = filterFrom.filter(
              (item) =>
                item[field] &&
                item[field] === filterValue
            );
          } else {
            filteredData = filterFrom.filter(
              (item) =>
                item[field] &&
                item[field].toLowerCase().includes(filterValue.toLowerCase())
            );
          }
          break;
        case "!&":
          filteredData = filterFrom.filter(
            (item) =>
              item[field] &&
              !item[field].toLowerCase().includes(filterValue.toLowerCase())
          );
          break;
        case "^":
          filteredData = filterFrom.filter(
            (item) =>
              item[field] &&
              item[field].toLowerCase().startsWith(filterValue.toLowerCase())
          );
          break;
        case "$":
          filteredData = filterFrom.filter(
            (item) =>
              item[field] &&
              item[field].toLowerCase().endsWith(filterValue.toLowerCase())
          );
          break;
        default:
          filteredData = [];
      }

      console.log("filteredData", filteredData);


      setFilteredRowList(filteredData);
    };

export default onFilterChange;
