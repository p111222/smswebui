import React, { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomDatagridHeader from "./CustomDatagridHeader";
import Pagination from "./Pagination";
import { CheckboxCellRenderer, CheckboxSelectionComponent, DateStringCellEditor } from "ag-grid-community";

const DatagridComponent = ({
  data,
  setData,
  columnDefs,
  gridApi,
  setGridApi,
  handleSort,
  handleSelection,
  onFilterChange,
  RowMissingMsg,
  editable,
  csvData,
  setCsvData,
  rowSelection,
  isPagination,
  currentPage,
  setCurrentPage,
  totalRecords,
}) => {
  const gridRef = useRef(null);
  const [columnState, setColumnState] = useState();
  const paginationPageSizeSelector = [20];

  const handleColumnResized = (params) => {
    setColumnState(params.columnApi.getColumnState());
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    console.log("Params: ", params);
    params.api.sizeColumnsToFit();
  };

  const handleSelectionChanged = (event) => {
    const selectedNodes = event.columnApi.api.getSelectedRows();
    handleSelection(selectedNodes);
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    editable: editable,
    resizable: false,
  };

  const onCellValueChanged = (event) => {
    console.log("*****/*", event);

    if (event.data.actualRow !== undefined) {
      const { actualRow, ...updatedRow } = event.data;

      const updatedVaData = [...csvData];
      const updatedFilteredVaData = [...data];

      updatedVaData[event.data.actualRow] = updatedRow;
      updatedFilteredVaData[event.rowIndex] = event.data;

      setCsvData(updatedVaData);
      setData(updatedFilteredVaData);
    } else {
      const updatedVaData = [...csvData];
      updatedVaData[event.rowIndex] = event.data;
      setCsvData(updatedVaData);
    }
  };

  const gridOptions = {
    paginationPageSize: 20,
    suppressAutoSize: true,
    paginationPageSizeSelector: paginationPageSizeSelector,
    rowSelection: rowSelection,
    suppressRowClickSelection: true,
    multiSortKey: "ctrl",
    suppressMultiSort: false,
    onColumnResized: handleColumnResized,
    onSelectionChanged: handleSelectionChanged,
  };

  const CustomNoRowsOverlay = () => {
    console.log("Custome No rows overlay");

    return (
      <>
        {RowMissingMsg ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            {RowMissingMsg}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No data to show
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%" ,
        }}
        
      >
        <AgGridReact
          style={{ height: "100px", width: "100%" }}
          rowHeight={45}
          ref={gridRef}
          columnGap={0}
          onCellValueChanged={onCellValueChanged}
          rowData={data}
          columnDefs={columnDefs.map((column) => ({
            ...column,
            headerComponent: CustomDatagridHeader, // Assign CustomHeader as header component
            headerComponentParams: {
              onSort: handleSort,
              gridApi,
              columnState,
              onFilterChange,
              data:data
            }, // Pass any necessary props to CustomHeader
          }))}
          defaultColDef={defaultColDef}
          suppressMovableColumns={true}
          gridOptions={{
            ...gridOptions, 
            pagination: false,
            enableCellTextSelection:true,
            onTooltipShow:true
          }}
          onGridReady={onGridReady}
          noRowsOverlayComponent={CustomNoRowsOverlay}
        />
      </div>
      {isPagination && <Pagination totalRecords={totalRecords} recordsPerPage={20} currentPage={currentPage} setCurrentPage={setCurrentPage} filteredData={data} />}
    </div>
  );
};

export default DatagridComponent;
