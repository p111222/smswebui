import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Card,
    CardContent,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
    IconButton,
    InputAdornment
} from "@mui/material";
import Input from "@mui/joy/Input";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import StepperActionButtons from "../../../Common Components/StepperActionButtons";
import { AppStore } from "../../../Store/appStore";
import { AuthStore } from "../../../Store/authStore";

import validateInputField from "../../../utils/validateInputField";
import { CONSTANTS } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';
// import Switch from '@mui/material/Switch';

const SmsOptInOut = () => {

    const {
        currentStep,
        setCurrentStep,
        setShowToast,
        setMessage,
        setType,
        setBannerCustID,
        setBannerCustName,
        setBannerPhoneNumber,
        setLoading,
        isFieldDisabled,
        setIsFieldDisabled,
    } = useContext(AppStore);
    const { user } = useContext(AuthStore);
    const custIdTimeoutRef = useRef()
    // const clientCodeTimeoutRef = useRef()
    const axiosPrivate = useAxiosPrivate();
    const [toastShown, setToastShown] = useState();
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [primaryEmail, setPrimaryEmail] = useState("");
    const [fieldErrors, setFieldErrors] = useState(null);

    // Scroll to error Ref
    const customerIdRef = useRef(null)
    const emailIDRef = useRef(null)
    const phoneNumberRef = useRef(null)
    const navigate = useNavigate();

    const STEPS = [
        "SMS Opt-In/Out",
        "File Upload",
        "Preview"
    ]

    const handleNextClick = async () => {

        const jsonData = {
            // custId: customerId,
            // custName: customerName,
            // primaryEmail: primaryEmail,
            // clientCode: clientCode,
            // masterAccNo: masterAccountNumber,
            // address1: address1,
            // address2: address2,
            // pinCode: "121",
            // subCodeFlg: {
            //     reqFlg: subCodeReqFlg ? "Y" : "N",
            //     length: subCodeLen,
            // },
            // remitterCode: {
            //     reqFlg: remitterCodeReqFlg ? "Y" : "N",
            //     length: remitterCodeLen,
            // },
            // validationReq: validationTypeReqFlg ? "Y" : "N",
            // dbValFlg: selectedValidationType.includes("DATABASE") ? "Y" : "N",
            // apiValFlg: selectedValidationType.includes("API") ? "Y" : "N",
            // subcode: tableRows,
        };


        // const err = formValidationService(jsonData, vaStructureSchema, setFieldErrors);
        // const subcodeReturnedErrors = validateSubCodeSection(tableRows, subCodeReqFlg, subCodeLen)
        // setSubCodeErrors(subcodeReturnedErrors)
        // if (remitterCodeReqFlg && (remitterCodeLen === "" || remitterCodeLen < 3)) {
        //     return
        // }
        // const scrollToError = (err, customerIdRef, emailIDRef, clientCodeRef, masterAccRef) => {
        //     console.log("scrolltoerror", err);
        //     if (!err || !customerIdRef.current) {
        //         return
        //     }
        //     if (err.custId) {
        //         customerIdRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     } else if (err.primaryEmail) {
        //         emailIDRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     } else if (err.clientCode) {
        //         clientCodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     } else if (err.masterAccNo) {
        //         masterAccRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        //     }
        // }

        // scrollToError(err, customerIdRef, emailIDRef, clientCodeRef, masterAccRef)

        setCurrentStep(prev => prev + 1)

    };


    return (

        <div className="print:break-before-page print:text-sm">
            <Card sx={{ boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)", borderRadius: "15px" }}>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p id="parameter" className="font-semibold text-lg bg-gray-200 text-black-800 px-3 py-[6px] rounded-full inline-block">
                                SMS Opt-In/Out
                            </p>
                        </div>
                    </div>

                    <div className="h-full mt-4">
                        <div className="w-full lg:w-2/3">
                            {/* Row 1: Phone Number and Customer ID */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                                <div className="mb-4">
                                    <label className="font-semibold text-sm text-neutral-500">
                                        Phone Number
                                        {!isFieldDisabled && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <Input
                                        autoComplete="off"
                                        ref={phoneNumberRef}
                                        variant="soft"
                                        placeholder="Enter 10-digit Phone Number"
                                        className="w-full mt-1"
                                        type="tel"
                                        value={phoneNumber}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const inputValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setPhoneNumber(inputValue);
                                            if (inputValue.length === 10) {
                                                setMessage("");
                                                setType("");
                                                setShowToast(false);
                                                setToastShown(false);
                                                if (fieldErrors?.custId) {
                                                    setFieldErrors(prev => ({ ...prev, custId: undefined }));
                                                }
                                            } else if (!toastShown && inputValue.length > 0) {
                                                setMessage("Please enter exactly 10 digits");
                                                setType("error");
                                                setShowToast(true);
                                                setToastShown(true);
                                            }
                                        }}
                                        sx={{ "& input::placeholder": { fontSize: "14px" }, backgroundColor: "#F1F4F8" }}
                                    />
                                    {fieldErrors?.custId && (
                                        <p className="text-red-500 text-sm mt-1">{fieldErrors.custId}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="font-semibold text-sm text-neutral-500">
                                        Customer ID
                                        {!isFieldDisabled && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <Input
                                        autoComplete="off"
                                        ref={customerIdRef}
                                        variant="soft"
                                        placeholder="Enter Customer ID"
                                        className="w-full mt-1"
                                        type="text"
                                        value={customerId}
                                        disabled={isFieldDisabled}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (validateInputField(inputValue, CONSTANTS.CUSTOMERID_PATTERN, 10)) {
                                                setCustomerId(inputValue);
                                                setMessage("");
                                                setType("");
                                                setShowToast(false);
                                                setToastShown(false);
                                            } else if (!toastShown) {
                                                setMessage("Invalid phone number");
                                                setType("info");
                                                setShowToast(true);
                                                setToastShown(true);
                                            }
                                        }}
                                        sx={{ "& input::placeholder": { fontSize: "14px" }, backgroundColor: "#F1F4F8" }}
                                    />
                                    {fieldErrors?.custId && (
                                        <p className="text-red-500 text-sm mt-1">{fieldErrors.custId}</p>
                                    )}
                                </div>
                            </div>

                            {/* Row 2: Customer Name and Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                                <div className="mb-4">
                                    <label className="font-semibold text-sm text-neutral-500">
                                        Customer Name
                                        {!isFieldDisabled && <span className="text-red-500 ml-1">*</span>}
                                    </label>
                                    <Input
                                        autoComplete="off"
                                        variant="soft"
                                        placeholder="Enter Customer Name"
                                        className="w-full mt-1"
                                        value={customerName}
                                        disabled={true}
                                        sx={{ "& input::placeholder": { fontSize: "14px" }, backgroundColor: "#F1F4F8" }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <label className="font-semibold text-sm text-neutral-500">
                                            Email ID
                                            {!isFieldDisabled && <span className="text-red-500 ml-1">*</span>}
                                        </label>
                                        {!isFieldDisabled && (
                                            <Tooltip title="Please enter corporate emails only" arrow>
                                                <InfoOutlinedIcon sx={{ color: "#64748B", fontSize: "16px", marginLeft: "4px", cursor: "pointer" }} />
                                            </Tooltip>
                                        )}
                                    </div>
                                    <Input
                                        autoComplete="off"
                                        ref={emailIDRef}
                                        variant="soft"
                                        placeholder="Email ID"
                                        className="w-full mt-1"
                                        disabled={isFieldDisabled}
                                        value={primaryEmail}
                                        onChange={(e) => {
                                            setPrimaryEmail(e.target.value);
                                            if (fieldErrors?.primaryEmail) {
                                                setFieldErrors(prev => ({ ...prev, primaryEmail: undefined }));
                                            }
                                        }}
                                        onBlur={() => {
                                            if (primaryEmail && !CONSTANTS.EMAIL_ID_PATTERN.test(primaryEmail)) {
                                                setFieldErrors(prev => ({
                                                    ...prev,
                                                    primaryEmail: "Please enter a valid email address"
                                                }));
                                            }
                                        }}
                                        sx={{ "& input::placeholder": { fontSize: "14px" }, backgroundColor: "#F1F4F8" }}
                                        endDecorator={
                                            (primaryEmail && !isFieldDisabled && !isCustApproved) && (
                                                <InputAdornment position="end">
                                                    {CONSTANTS.EMAIL_ID_PATTERN.test(primaryEmail) ?
                                                        <CheckCircleIcon sx={{ color: "green" }} /> :
                                                        <CancelIcon sx={{ color: "#ef4444" }} />
                                                    }
                                                </InputAdornment>
                                            )
                                        }
                                    />
                                    {fieldErrors?.primaryEmail && (
                                        <p className="text-red-500 text-sm mt-1">{fieldErrors.primaryEmail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Row 3: SMS Opt-In Switch (centered) */}
                            <div className="flex justify-center md:justify-start mt-2">
                                <div className="mb-4">
                                    <div className="flex flex-col items-center md:items-start">
                                        <label className="font-semibold text-sm text-neutral-500 mb-2">
                                            SMS Opt In
                                        </label>
                                        <FormControlLabel
                                            disabled={isFieldDisabled}
                                            control={<Switch defaultChecked color="primary" />}
                                            label={null}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {currentStep !== 4 && (
                <StepperActionButtons STEPS={STEPS} handleNextClick={handleNextClick} />
            )}
        </div>

    )
}

export default SmsOptInOut