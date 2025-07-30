import EditIcon from "@mui/icons-material/Edit";
import IosShareIcon from "@mui/icons-material/IosShare";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import { getPreviewData } from "../../Customer Onboarding/services/previewMakerService";
import CustomCheckboxRenderer from "../../../Common Components/CustomCheckboxRenderer";
import ArticleIcon from "@mui/icons-material/Article";

export const getPendingTaskColumns = (axiosPrivate, setShowCustomerDetails,setSelectedClientDetail, navigate, user,setLoading,setTaskType,setMakerEmail) =>{
    return  [
      {
        colId: "0_1",
        field: "checkbox",
        width: 53,
        headerCheckboxSelection:false,
        cellRenderer:CustomCheckboxRenderer,
        checkboxSelection: false,
        suppressMenu: true,
      },
      {
        colId: "1_1",
        field: "Task ID",
        headerName: "Request ID",
        hide: false,
        flex: 2.5,
        filterable: true,
        cellRenderer: (params) => {
          const data = params.data["Task ID"];
          const fileID = params.data["File ID"];
          return (
            <p
              title={
                params.data["Task Type"] === "VA FILE UPLOAD" ||
                params.data["Task Type"] === "VIRTUAL ACCOUNT FILE UPLOAD"
                  ? fileID
                  : data
              }
              onClick={() => {
                if (
                  params.data["Task Type"] === "VA FILE UPLOAD" ||
                  params.data["Task Type"] === "VIRTUAL ACCOUNT FILE UPLOAD"
                ) {
                  setShowCustomerDetails(true);
                  setSelectedClientDetail(params.data);
                  return;
                }
                // getPreviewData(axiosPrivate,params.data["Client Code"], navigate, user.userType, setLoading,setTaskType,setMakerEmail)  
              }}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {params.data["Task Type"] === "VA FILE a" ||
              params.data["Task Type"] === "VIRTUAL ACCOUNT FILE UPLOAD"
                ? fileID
                : data}
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
          }else if (transactionType.toLowerCase() === "corp activation") {
            transactionTypeTextColor = "green";
            transactionTypeIcon = (
              <StarIcon style={{ fontSize: "1.3em", color: "green" }} />
            );
          }else if (transactionType.toLowerCase() === "corp deactivation") {
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
      {
        colId: "4_1",
        field: "Client Code",
        headerName: "Customer ID",
        hide: false,
        filterable: true,
        flex: 1.8,
        type: "string",
        cellRenderer: (params) => {
          const clientCode = params.data["Client Code"];
          return <p>{clientCode}</p>;
        },
      },
      {
        colId: "7_1",
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
        colId: "8_1",
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
        colId: "pendingTaskStatus",
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
    ];
}