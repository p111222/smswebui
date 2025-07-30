import IosShareIcon from "@mui/icons-material/IosShare";
import EditIcon from "@mui/icons-material/Edit";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArticleIcon from "@mui/icons-material/Article";
import CustomCheckboxRenderer from "../../../Common Components/CustomCheckboxRenderer";

export const getColumnData = (setShowCustomerDetails, setSelectedClientDetail) => {
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
      colId: "1_1",
      field: "Task ID",
      headerName: "Customer ID",
      hide: false,
      flex: 2,
      filterable: true,
      type:"number",
      cellRenderer: (params) => {
        const data = params.data["Task ID"];
        return (
          <p
            title={data}
            onClick={() => {
              setShowCustomerDetails(true);
              setSelectedClientDetail(params.data);
            }}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {data}
          </p>
        );
      },
    },
    {
      colId: "2_1",
      field: "Date-Timestamp",
      headerName: "Date-Timestamp",
      hide: false,
      flex: 3,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data["Date-Timestamp"];
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "3_1",
      field: "Task Type",
      headerName: "Request Type",
      flex: 3,
      cellRenderer: (params) => {
        const transactionType = params.data["Task Type"];
        var transactionTypeIcon;
        var transactionTypeTextColor;
        if (transactionType.toLowerCase() === "new setup") {
          transactionTypeTextColor = "purple";
          transactionTypeIcon = (
            <FiberNewIcon style={{ fontSize: "1.5em", color: "purple" }} />
          );
        } else if (transactionType.toLowerCase() === "modify setup") {
          transactionTypeTextColor = "orange";
          transactionTypeIcon = (
            <EditIcon style={{ fontSize: "1.5em", color: "orange" }} />
          );
        } else if (transactionType.toLowerCase() === "va file upload") {
          transactionTypeTextColor = "blue";
          transactionTypeIcon = (
            <IosShareIcon style={{ fontSize: "1.3em", color: "blue" }} />
          );
        } else if (transactionType.toLowerCase() === "corp activation") {
          transactionTypeTextColor = "green";
          transactionTypeIcon = (
            <StarIcon style={{ fontSize: "1.3em", color: "green" }} />
          );
        } else if (transactionType.toLowerCase() === "corp deactivation") {
          transactionTypeTextColor = "red";
          transactionTypeIcon = (
            <StarBorderIcon style={{ fontSize: "1.3em", color: "red" }} />
          );
        }else if (transactionType.toLowerCase() === "clarification") {
          transactionTypeTextColor = "#0288D1";
          transactionTypeIcon = (
            <ArticleIcon style={{ fontSize: "1.3em", color: "#0288D1" }} />
          );
        }
        return (
          <div className="flex items-center gap-2">
            <span>{transactionTypeIcon}</span>
            <span
              title={transactionType}
              style={{ color: transactionTypeTextColor }}
            >
              {transactionType}
            </span>
          </div>
        );
      },
      hide: false,
      filterable: true,
    },
    // {
    //   colId: "4_1",
    //   field: "Client Code",
    //   headerName: "Client Code",
    //   hide: false,
    //   filterable: true,
    //   flex: 1.8,
    //   type: "string",
    //   cellRenderer: (params) => {
    //     const data = params.data["Client Code"];
    //     return <span title={data}>{data}</span>;
    //   },
    // },
    {
      colId: "6_1",
      field: "Customer Name",
      headerName: "Customer Name",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data["Customer Name"];
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "7_1",
      field: "Maker",
      headerName: "Maker",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data.Maker;
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "8_1",
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
    {
      colId: "9_1",
      field: "Remark",
      headerName: "Remark",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data.Remark;
        return <span title={data}>{data}</span>;
      },
    },
    {
      colId: "10_1",
      field: "Status",
      headerName: "Status",
      hide: false,
      flex: 2,
      filterable: true,
      cellRenderer: (params) => {
        const data = params.data.Status;
        return <span title={data}>{data}</span>;
      },
    },
  ]
}