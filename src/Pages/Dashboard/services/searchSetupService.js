import axios from "axios";
import moment from "moment";

export const handleSearchClick = async (
  clientCode,
  startDate,
  endDate,
  setSearchRowData,
  axiosPrivate,
  setMessage,
  setType,
  setShowToast,
  setLoading,
  currentPage,
  setTotalRecords,
  setFilteredRowList
) => {
  if (clientCode === "" && startDate === null && endDate === null) {
    setMessage("Please Enter Client Code or Select Date Range");
    setShowToast(true);
    setSearchRowData([]);
    setFilteredRowList([])
    setType("error");
    return;
  }
  setLoading(true);

  const searchSetupData = {
    clientCode: clientCode ? clientCode.trim().toUpperCase() : "",
    periodFrom: startDate
      ? moment(startDate, "DD/MM/YYYY").format("DD-MM-YYYY")
      : "",
    periodTo: endDate
      ? moment(endDate, "DD/MM/YYYY").format("DD-MM-YYYY")
      : "",
  };

  try {
    const res = await axiosPrivate.post(
      `/api/config/searchconfig?pageNo=${currentPage - 1}`,
      searchSetupData
    );

    if (res.data.transactions.length === 0) {
      setLoading(false);
      setSearchRowData([]);
      setFilteredRowList([]);
      setMessage("No data found");
      setShowToast(true);
      setType("info");
      return;
    }

    setTotalRecords(res.data.resultCnt)

    const processedData = res.data.transactions.map((data) => ({
      "Client Code": data.clientCode,
      "Customer Name": data.customerName,
      "Customer ID": data.customerId,
      Maker: data.createdBy ? data.createdBy.split("@")[0] : "",
      Checker: data.checker ? data.checker.split("@")[0] : "",
      "Master Account Number": data.foracid,
      "Created On":
        data.createdTimestamp === null || data.createdTimestamp === ""
          ? ""
          : moment(data.createdTimestamp, "YYYY-MM-DD HH:mm:ss").format(
            "DD-MM-YYYY HH:mm:ss"
          ),
      "Last Modified On":
        (data.modifiedOn === null || data.modifiedOn === "")
          ? ""
          : moment(data.modifiedOn, "YYYY-MM-DD HH:mm:ss").format(
            "DD-MM-YYYY HH:mm:ss"
          ),
      Status: data.clientActiveFlg==="Y" ? "Active" : "Inactive",
    }));


    const sortedData = processedData.sort((a, b) => {
      if (a["Last Modified On"] === "" || b["Last Modified On"] === "") {
        return;
      }

      const parseDate = (dateStr) => {
        const [day, month, yearAndTime] = dateStr.split("-");
        const [year, time] = yearAndTime.split(" ");
        return new Date(`${year}-${month}-${day}T${time}`);
      };

      return (
        parseDate(b["Last Modified On"]) - parseDate(a["Last Modified On"])
      );
    });

    setSearchRowData(sortedData);
    setFilteredRowList(sortedData);
    setLoading(false);
  } catch (error) {
    console.error("Unable to fetch Data", error);
    setLoading(false);
    setSearchRowData([]);
    setFilteredRowList([]);
    setMessage("Something went wrong");
    setShowToast(true);
    setType("error");
  } finally {
    setLoading(false);
  }
};

export const handleStatusChange = (data, setLoading) => {
  setLoading(true);
  axios
    .post(
      "/api/customeronboard/Corp/insert",
      {
        clientActiveFlag: data["Status"] === "APPROVED" ? "N" : "Y",
        clientCode: data["Client Code"],
      }
    )
    .then((res) => {
      console.log(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
