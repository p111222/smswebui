// CurrentStepContext.js
import React, { createContext, useState } from "react";

export const AppStore = createContext();

export const AppStoreProvider = ({ children }) => {
  const [bannerCustID, setBannerCustID] = useState("");
  const [bannerCustName, setBannerCustName] = useState("");
  const [bannerPhoneNumber, setBannerPhoneNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [saveAndSubmitDialoque, setSaveAndSubmitDialoque] = useState(false);
  const [activeFilterColumn, setActiveFilterColumn] = useState([]);
  const [clearFilter, setClearFilter] = useState(false);
  const [showPassChangeMsg, setShowPassChangeMsg] = useState(false);
  const [updateCorp, setUpdateCorp] = useState(false);
  const [updateCorpTemp, setUpdateCorpTemp] = useState(false);
  const [onboardingCorp, setOnboardingCorp] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [callApi, setCallApi] = useState("");
  // Preview Maker
  const [clientActiveFlg, setClientActiveFlg] = useState("")
  const [taskType, setTaskType] = useState("")
  const [makerEmail, setMakerEmail] = useState("")
  const [showRemark, setShowRemark] = useState(false);
  const [button, setButton] = useState("");
  const [existingClarifications, setExistingClarifications] = useState([]);
  const [miniDrawerComponentOpen, setMiniDrawerComponentOpen] = useState(false);
  const [isFilterActive, setIsFilterActive] = useState(0);
  const [lastFilterColumn, setLastFilterColumn] = useState("");

  return (
    <AppStore.Provider
      value={{
        bannerCustID,
        setBannerCustID,
        bannerCustName,
        setBannerCustName,
        bannerPhoneNumber,
        setBannerPhoneNumber,
        filterValue,
        setFilterValue,
        headerHeight,
        setHeaderHeight,
        saveAndSubmitDialoque,
        setSaveAndSubmitDialoque,
        activeFilterColumn,
        setActiveFilterColumn,
        clearFilter,
        setClearFilter,
        showPassChangeMsg,
        setShowPassChangeMsg,
        updateCorp,
        setUpdateCorp,
        updateCorpTemp,
        setUpdateCorpTemp,
        onboardingCorp,
        setOnboardingCorp,
        currentStep,
        setCurrentStep,
        loading,
        setLoading,
        isFieldDisabled,
        setIsFieldDisabled,
        showToast,
        setShowToast,
        message,
        setMessage,
        type,
        setType,
        clientActiveFlg, setClientActiveFlg,
        taskType, setTaskType,
        callApi, setCallApi,
        makerEmail, setMakerEmail,
        showRemark, setShowRemark,
        button, setButton,
        existingClarifications, setExistingClarifications,
        isFilterActive, setIsFilterActive, lastFilterColumn, setLastFilterColumn,
        miniDrawerComponentOpen, setMiniDrawerComponentOpen,
      }}
    >
      {children}
    </AppStore.Provider>
  );
};
