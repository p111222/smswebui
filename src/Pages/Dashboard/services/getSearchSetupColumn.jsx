import CustomCheckboxRenderer from "../../../Common Components/CustomCheckboxRenderer";
// import {
//   getConfigPreviewData,
//   getPreviewData,
// } from "../../Customer Onboarding/services/previewMakerService";

export const getSearchSetupColumn = (axiosPrivate, navigate, user,setLoading,setClientActiveFlg, setTaskType,setMakerEmail) => {
  return [
    {
      colId: "0_1",
      field: "checkbox",
      width: 52,
      headerCheckboxSelection:false,
      cellRenderer:CustomCheckboxRenderer,
      checkboxSelection: false,
      suppressMenu: true,
    },
    {
      colId: "3_1",
      field: "Client Code",
      headerName: "Customer ID",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data["Client Code"];
        return (
          <p
            title={data}
            onClick={() => {
              // getConfigPreviewData(axiosPrivate, data, navigate, user.userType,setLoading,setClientActiveFlg, setTaskType,setMakerEmail);
            }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {data}
          </p>
        );
      },
    },
    {
      colId: "4_1",
      field: "Customer Name",
      headerName: "Customer Name",
      filterable: true,
      flex: 2,
      hide: false,
      cellRenderer: (params) => {
        const data = params.data["Customer Name"];
        return <span title={data}>{data}</span>;
      },
    },
    // {
    //   colId: "7_1",
    //   field: "Customer ID",
    //   headerName: "Customer ID",
    //   hide: false,
    //   flex: 2,
    //   filterable: true,
    //   type:"number",
    //   cellRenderer: (params) => {
    //     const data = params.data["Customer ID"];
    //     return <span title={data}>{data}</span>;
    //   },
    // },
    {
      colId: "5_1",
      field: "Maker",
      headerName: "Maker",
      hide: false,
      filterable: true,
      flex: 2,
      cellRenderer: (params) => {
        const data = params.data.Maker;
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "6_1",
      field: "Checker",
      headerName: "Checker",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data.Checker;
        return <span title={data}>{data}</span>;
      },
    },
    // {
    //   colId: "9_1",
    //   field: "Master Account Number",
    //   headerName: "Master Account Number",
    //   hide: false,
    //   flex: 2,
    //   type:"number",
    //   filterable: true,
    //   cellRenderer: (params) => {
    //     const data = params.data["Master Account Number"];
    //     return <span title={data}>{data}</span>;
    //   },
    // },

    {
      colId: "12_1",
      field: "Created On",
      headerName: "Created On",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data["Created On"];
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "13_1",
      field: "Last Modified On",
      headerName: "Last Modified On",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data["Last Modified On"];
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "searchSetupStatus",
      field: "Status",
      headerName: "Status",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data.Status;
        return (
          <>
            <span title={data}>
              {data}
            </span>
          </>
        );
      },
    },
  ];
};
