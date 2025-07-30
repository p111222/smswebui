import React, { useContext, useEffect } from 'react'
import { AppStore } from '../../Store/appStore';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { useParams } from 'react-router-dom';
import StepperComponent from './Components/StepperComponent';

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
    return (
       <div className="flex flex-col">
      <div className="flex-1">
        <StepperComponent currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </div>
    )
}

export default SmsRequest