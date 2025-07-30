const handleSort = (filteredRowList, setFilteredRowList, gridApi) => (column, order) => {
    if (gridApi) {
      const field = column.userProvidedColDef.field;
      const sortedData = [...filteredRowList].sort((a, b) => {
        const valueA =
          typeof a[field] === "number"
            ? a[field]
            : String(a[field]).toLowerCase();
        const valueB =
          typeof b[field] === "number"
            ? b[field]
            : String(b[field]).toLowerCase();
  
        if (order === "asc") {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });
      setFilteredRowList(sortedData);
    }
  };

  export default handleSort;