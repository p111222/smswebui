import React, { useContext, useEffect } from 'react'
import { Button } from "@mui/material";
import { AppStore } from '../../../Store/appStore';
import { useLocation, useParams } from 'react-router-dom';

const StepperActionButtons = ({ handleNextClick }) => {
    const { currentStep, setCurrentStep } = useContext(AppStore)
    const location = useLocation()
    const params = useParams()

    // useEffect(() => {
    //     if(currentStep)
    // }, [currentStep])

    return (
        <div className="flex justify-between mt-5 print:hidden">
            {!location.pathname.includes("preview") ? <Button
                variant='contained'
                sx={{
                    backgroundColor: "rgb(148,25,20)",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "rgb(148,25,20)",
                    }

                }}
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            >
                Back
            </Button> : <div></div>}
            {!location.pathname.includes("preview") && <Button
                variant='contained'
                sx={{
                    backgroundColor: "rgb(148,25,20)",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "rgb(148,25,20)",
                    }
                }}
                onClick={handleNextClick}>
                {currentStep === 4 ? 'Send for Approval' : 'Next'}
            </Button>}
        </div>
    )
}

export default StepperActionButtons
