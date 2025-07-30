import moment from "moment";

// Get Pending Virtual Accounts
const getPendingVirtualAccount = async (axiosPrivate, setLoading) => {
    try {
        const resData = await axiosPrivate.post("/api/config/dashboard");
        console.log("VA Res", resData.data);
        const filteredData = resData.data.filter((data) => data !== null);
        const processedData = filteredData.map((data) => {
            return {
                "Task ID": data.fileId,
                "Date-Timestamp":
                    data.request_DATETIMESTAMP === null || data.request_DATETIMESTAMP === ""
                        ? ""
                        : moment(data.request_DATETIMESTAMP, "YYYY-MM-DDTHH:mm:ss").format(
                            "DD-MM-YYYY HH:mm:ss"
                        ),
                "Task Type": data.requestType ? data.requestType : "",
                "Client Code": data?.clientCode,
                "Customer Name": data?.customerName,
                Maker: data.maker ? data?.maker.split("@")[0] : "",
                Status: data?.status,
            };
        });

        return processedData;
    } catch (err) {
        setLoading(false);
        console.log("Error", err);
    }
};

export default getPendingVirtualAccount;