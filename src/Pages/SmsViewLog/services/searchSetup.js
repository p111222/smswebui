import moment from "moment";


const handleTaskType = (taskType) => {
  if (taskType === "NEW SETUP") {
    return "New Setup"
  } else if (taskType === "MODIFY SETUP") {
    return "Modify Setup"
  } else if (taskType === "CORPDEACTIVATION") {
    return "Corp Deactivation"
  } else if (taskType === "CORPACTIVATION") {
    return "Corp Activation"
  } else if (taskType === "VA FILE UPLOAD") {
    return "VA FILE UPLOAD"
  }else if (taskType === "RETURNFORCLARIFICATION") {
    return "Clarification"
  } else {
    return ""
  }
}


export const handleSearchClick = async (
//   axiosPrivate,
//   startDate,
//   endDate,
//   setFilteredRowList,
//   setRowData,
//   setMessage,
//   setShowToast,
//   setType,
//   setLoading,
//   currentPage,
//   setTotalRecords
) => {
//   if (startDate === null && endDate === null) {
//     setFilteredRowList([]);
//     setShowToast(true);
//     setMessage("Please Enter Client Code or Select Date Range");
//     setType("error");
//     return;
//   }
//   setLoading(true)
//   const searchSetupData = {
//     clientCode: clientCode ? clientCode.trim().toUpperCase() : "",
//     periodFrom: startDate
//       ? moment(startDate, "DD/MM/YYYY").format("DD-MM-YYYY")
//       : "",
//     periodTo: endDate ? moment(endDate, "DD/MM/YYYY").format("DD-MM-YYYY") : "",
//   };
//   try {
//     const response = await axiosPrivate.post(
//       `/api/config/getapprovalhistory?pageNo=${currentPage - 1}`,
//       searchSetupData
//     );

//     if (response.data.transactions.length === 0) {
//       setLoading(false)
//       setFilteredRowList([]);
//       setShowToast(true);
//       setMessage("No data found");
//       setType("info");
//       return;
//     }

//     setTotalRecords(response.data.resultCnt)

//     const processedData = response.data.transactions.map((data) => {
//       return {
//         "Task ID": data.requestId,
//         "Date-Timestamp":
//           data.createdOn === null || data.createdOn === ""
//             ? ""
//             : moment(data.createdOn, "YYYY-MM-DDTHH:mm:ss").format(
//               "DD-MM-YYYY HH:mm:ss"
//             ),
//         "Task Type": handleTaskType(data.requestType),
//         "Client Code": data.clientCode,
//         "Virtual Account": data.accountNumber,
//         "Customer Name": data.customerName,
//         Maker: data.maker ? data.maker.split("@")[0] : "",
//         Checker: data.checker ? data.checker.split("@")[0] : "",
//         Remark: data.remark,
//         Status: data.status,
//         "File ID": data.fileId,
//         "clarificationfield": data.clarificationfield,
//       };
//     });

//     setRowData(processedData);
//     setFilteredRowList(processedData);
//     setLoading(false)
//   } catch (error) {
//     setLoading(false)
//     console.log("Unable to fetch Data", error);
//     setShowToast(true);
//     setMessage("Something went wrong");
//     setType("error");
//   }
};

