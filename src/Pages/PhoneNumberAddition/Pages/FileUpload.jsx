import React from 'react'
import PageTitle from "../../../Common Components/PageTitle";
// import ListVaSection from "./components/ListVASection";
import { Card, CardContent } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileSection from "../Components/UploadFileSection";
import { useContext, useEffect } from "react";
import { AuthStore } from "../../../Store/authStore";
import StepperActionButtons from '../../../Common Components/StepperActionButtons';
import { AppStore } from '../../../Store/appStore';

const FileUpload = () => {
  const { user } = useContext(AuthStore)
  const { currentStep, setCurrentStep } = useContext(AppStore);

  const handleNextClick = () => {
    setCurrentStep(prev => prev + 1);
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const STEPS = [
    "Phone Number Addition",
    "File Upload",
    "Preview"
  ]

  return (
    <>
      <Card
        sx={{
          boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
        }}
      >
        <CardContent>

          <UploadFileSection />
        </CardContent>
      </Card>
      {
        currentStep !== 4 && (
          <StepperActionButtons handleNextClick={handleNextClick} STEPS={STEPS} />
        )
      }
    </>
  );

}

export default FileUpload