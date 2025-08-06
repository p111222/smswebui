import React, { useContext, useEffect } from 'react'
import { AppStore } from '../../Store/appStore';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import StepperComponent from '../../Common Components/StepperComponent';
import SmsOptInOut from './Pages/SmsOptInOut';
import FileUpload from './Pages/FileUpload';
import Preview from './Pages/Preview';

const SmsRequest = () => {

  const { currentStep, setCurrentStep, setBannerPhoneNumber, setBannerCustName, setBannerCustID } = useContext(AppStore);
  const params = useParams()

  const makeRequest = useAxiosPrivate();

  useEffect(() => {
    return () => {
      localStorage.clear()
      setBannerPhoneNumber("")
      setBannerCustID("")
      setBannerCustName("")
      setCurrentStep(0)
    }
  }, [])

  const steps = [
    { label: "SMS Opt-In/Out", component: <SmsOptInOut /> },
    { label: "File Upload", component: <FileUpload /> },
    { label: "Preview", component: <Preview /> }
  ];

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <StepperComponent currentStep={currentStep} setCurrentStep={setCurrentStep} steps={steps}/>
      </div>
    </div>
  )
}

export default SmsRequest;