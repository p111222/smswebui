import generateRandomRequestId from "../../../utils/generateRandomRequestId";
import { onboardCustomer } from "../../Customer Onboarding/services/customerOnboardService";
import moment from "moment";

export const handleClarificationRaise = (existingClarifications, setExistingClarifications,makerEmail,user) => {

    const jsonData = [...existingClarifications, {
        clarificationMsg: clarificationMsg,
        timeStamp: moment(new Date()).format("DD-MM-YYYY HH:mm:ss"),
        msgType: makerEmail === user.userEmail ? "A" : "Q",
        createdBy: user.userEmail
    }]
    setExistingClarifications(jsonData)
    onboardCustomer(
        makeRequest,
        jsonData,
        params.clientCode,
        "CLARIFICATION",
        makerEmail,
        "RETURNFORCLARIFICATION",
        generateRandomRequestId(),
        setShowToast,
        setMessage,
        setType,
        setCurrentStep,
        setLoading,
        null,
        null,
        "RETURNFORCLARIFICATION"
    );
}