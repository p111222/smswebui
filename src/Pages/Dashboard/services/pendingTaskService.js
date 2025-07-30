
import getPendingVirtualAccount from "./getPendingVirtualAccount";
import getPendingOnboardedCustomer from "./getPendingOnboardedCustomer";
import generateRandomRequestId from "../../../utils/generateRandomRequestId";

// Pending Tasks
export const getPendingCustomers = async (
  setFilteredRowList,
  setRowData,
  axiosPrivate,
  setLoading,
  setShowData,
  setRemainingData
) => {
  setLoading(true)

  const pendingCustData = await getPendingOnboardedCustomer(axiosPrivate, setLoading)
  const pendingVaData = await getPendingVirtualAccount(axiosPrivate, setLoading)

  const combinedData = [...pendingCustData, ...pendingVaData]

  const sortedData = combinedData.sort((a, b) => {
    if (a["Date-Timestamp"] === "" || b["Date-Timestamp"] === "") {
      return;
    }
    const parseDate = (dateStr) => {
      const [day, month, yearAndTime] = dateStr.split("-");
      const [year, time] = yearAndTime.split(" ");
      return new Date(`${year}-${month}-${day}T${time}`);
    };

    return parseDate(b["Date-Timestamp"]) - parseDate(a["Date-Timestamp"]);
  });
  console.log("combinedData", sortedData)
  setShowData(sortedData.slice(
    0 * 20,
    1 * 20
  ))
  setRemainingData(sortedData.slice(
    0 * 20,
    1 * 20
  ))
  setFilteredRowList(sortedData);
  setRowData(sortedData);
  setLoading(false)
};

// HandleClose
export const handleClose = (
  setSelectedClientDetail,
  setShowCustomerDetails
) => {
  setShowCustomerDetails(false);
  setSelectedClientDetail();
};
export const handleDownloadButtonClick = async (
  fileID,
  axiosPrivate,
  setShowToast,
  setMessage,
  setType,
  setShowCustomerDetails,
  setLoading
) => {
  setLoading(true);
  try {
    const res = await axiosPrivate.post(
      `/collectionhub/downloadfile?fileId=${fileID}&from=PENDING`,
      { responseType: 'blob' } // Ensure the response is a blob
    );

    // Extract file name from Content-Disposition header
    const contentDisposition = res.headers['content-disposition'];
    let fileName = fileID; // Default file name without extension
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    // Determine the file extension based on the content type
    const contentType = res.headers["content-type"];
    console.log("txt", contentType);
    let fileExtension = "";
    if (contentType.includes("text/plain")) {
      console.log("txt");
      fileExtension = ".txt";
    } else if (contentType.includes("text/csv")) {
      console.log("txt csv");
      fileExtension = ".csv";
    } else if (contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      console.log("txt xlsx");
      fileExtension = ".xlsx";
    }

    // Append the correct file extension to the file name
    fileName += fileExtension;
    console.log("txt",fileName, fileExtension);
    

    const blob = new Blob([res.data], { type: contentType });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  } catch (err) {
    console.error("Error downloading the file:", err);
    setLoading(false);
    setMessage("Something went wrong");
    setType("error");
    setShowToast(true);
    setShowCustomerDetails(false);
  }
};


// HandleApproveReject
export const handleVaApproveReject = async (makeRequest, setShowToast, setMessage, setType, selectedClientDetail, setSelectedClientDetail, setShowCustomerDetails, setShowRemark, button, remark, checker, setLoading, setRemark, setRefresh) => {
  // Remark required check
  if (remark === "" && button === "reject") {
    setShowToast(true)
    setMessage("Remark required")
    setType("error")
    return
  }
  setLoading(true)


  // Payload
  const payload = {
    requestId: generateRandomRequestId(),
    fileId: selectedClientDetail["Task ID"],
    approvalStatus: button === "approve" ? "APPROVED" : "REJECTED",
    remarks: remark,
    checker: checker
  }

  // Api call
  await makeRequest.post("/VAChecker", payload)
    .then((res) => {
      console.log(button === "approve" ? "Approved successfully" : "Rejected successfully", res)
      setLoading(false)
      setShowToast(true)
      setMessage(button === "approve" ? "Approved successfully" : "Rejected successfully")
      setType("success")
      setRefresh(Math.random())
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      setShowToast(true)
      setMessage("Something went wrong")
      setType("error")
    })
    .finally(() => {
      setShowCustomerDetails(false)
      setSelectedClientDetail(null)
      setShowRemark(false)
      setRemark("")
      setLoading(false)
    })
}