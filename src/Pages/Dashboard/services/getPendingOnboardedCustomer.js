import moment from "moment";

const handleTaskType = (taskType) =>{
  if(taskType==="NEWSETUP"){
    return "New Setup"
  }else if(taskType==="MODIFYSETUP"){
    return "Modify Setup"
  }else if(taskType==="CORPDEACTIVATION"){
    return "Corp Deactivation"
  }else if(taskType==="CORPACTIVATION"){
    return "Corp Activation"
  }else if(taskType==="RETURNFORCLARIFICATION"){
    return "Clarification"
  }else{
    return ""
  }
}

const getPendingOnboardedCustomer = async (axiosPrivate, setLoading) => {
  try {
    const resData = await axiosPrivate.post("/collectionhub/getallPending");
    const filteredData = resData.data.filter((data) => data !== null);
    const processedData = filteredData.map((data) => {
      return {
        "Task ID": data?.values?.REQUESTID,
        "Date-Timestamp":
          data?.values?.TIMESTAMP === null || data?.values?.TIMESTAMP === ""
            ? ""
            : moment(data?.values?.TIMESTAMP, "YYYY-MM-DDTHH:mm:ss").format(
              "DD-MM-YYYY HH:mm:ss"
            ),
        "Task Type": handleTaskType(data.values.TASKTYPE),
        "Client Code": data?.clientCode,
        "Customer Name": data?.custName,
        Maker: data?.values?.CREATED_BY.split("@")[0],
        Status: data?.values?.STATUS,
      };
    });
    return processedData;
  } catch (error) {
    setLoading(false);
    console.log("Unable to fetch VA file Data", error);
  }
};


export default getPendingOnboardedCustomer;