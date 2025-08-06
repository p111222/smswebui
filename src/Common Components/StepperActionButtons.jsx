// import React, { useContext, useEffect } from 'react'
// import { Button } from "@mui/material";
// import { AppStore } from '../../../Store/appStore';
// import { useLocation, useParams } from 'react-router-dom';

// const StepperActionButtons = ({ handleNextClick }) => {
//     const { currentStep, setCurrentStep } = useContext(AppStore)
//     const location = useLocation()
//     const params = useParams()

//     // useEffect(() => {
//     //     if(currentStep)
//     // }, [currentStep])

//     return (
//         <div className="flex justify-between mt-5 print:hidden">
//             {!location.pathname.includes("preview") ? <Button
//                 variant='contained'
//                 sx={{
//                     backgroundColor: "rgb(148,25,20)",
//                     color: "white",
//                     "&:hover": {
//                         backgroundColor: "rgb(148,25,20)",
//                     }

//                 }}
//                 disabled={currentStep === 0}
//                 onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
//             >
//                 Back
//             </Button> : <div></div>}
//             {!location.pathname.includes("preview") && <Button
//                 variant='contained'
//                 sx={{
//                     backgroundColor: "rgb(148,25,20)",
//                     color: "white",
//                     "&:hover": {
//                         backgroundColor: "rgb(148,25,20)",
//                     }
//                 }}
//                 onClick={handleNextClick}>
//                 {currentStep === 4 ? 'Send for Approval' : 'Next'}
//             </Button>}
//         </div>
//     )
// }

// export default StepperActionButtons



// import React, { useContext } from 'react';
// import { Button } from "@mui/material";
// import { AppStore } from '../../../Store/appStore';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// const ActionsContainer = styled.div`
//   .stepper-actions {
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background: white;
//     padding: 1rem 2rem;
//     display: flex;
//     justify-content: space-between;
//     box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
//     z-index: 100;
//     gap: 1rem;
//   }

//   .action-button {
//     min-width: 120px;
//     padding: 0.5rem 1.5rem;
//     border-radius: 8px;
//     font-weight: 500;
//     text-transform: none;
//   }

//   .spacer {
//     visibility: hidden;
//   }

//   @media (max-width: 768px) {
//     .stepper-actions {
//       padding: 1rem;
//     }
//   }

//   @media print {
//     .stepper-actions {
//       display: none;
//     }
//   }
// `;

// const StepperActionButtons = ({ handleNextClick }) => {
//     const { currentStep, setCurrentStep } = useContext(AppStore);
//     const location = useLocation();

//     return (
//         <ActionsContainer>
//             {!location.pathname.includes("preview") && (
//                 <div className="stepper-actions">
//                     <Button
//                         variant='contained'
//                         className="action-button"
//                         sx={{
//                             backgroundColor: "rgb(148,25,20)",
//                             color: "white",
//                             "&:hover": {
//                                 backgroundColor: "rgb(148,25,20)",
//                             },
//                             "&:disabled": {
//                                 backgroundColor: "#e0e0e0",
//                                 color: "#9e9e9e"
//                             }
//                         }}
//                         disabled={currentStep === 0}
//                         onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
//                     >
//                         Back
//                     </Button>
//                     <div className={currentStep === 0 ? "spacer" : ""}></div>
//                     <Button
//                         variant='contained'
//                         className="action-button"
//                         sx={{
//                             backgroundColor: "rgb(148,25,20)",
//                             color: "white",
//                             "&:hover": {
//                                 backgroundColor: "rgb(148,25,20)",
//                             }
//                         }}
//                         onClick={handleNextClick}
//                     >
//                         {currentStep === 4 ? 'Send for Approval' : 'Next'}
//                     </Button>
//                 </div>
//             )}
//         </ActionsContainer>
//     );
// };

// export default StepperActionButtons;


// import React, { useContext } from 'react';
// import { Button, Box } from "@mui/material";
// import { AppStore } from '../../../Store/appStore';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// const FloatingActions = styled.div`
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
//   display: flex;
//   gap: 1rem;
//   z-index: 100;

//   @media (max-width: 768px) {
//     bottom: 1rem;
//     right: 1rem;
//     flex-direction: column-reverse;
//   }
// `;

// const ActionButton = styled(Button)`
//   && {
//     min-width: 120px;
//     padding: 0.75rem 1.5rem;
//     border-radius: 50px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//     font-weight: 500;
//     text-transform: none;
//     transition: all 0.3s;

//     &:hover {
//       box-shadow: 0 6px 16px rgba(0,0,0,0.2);
//       transform: translateY(-2px);
//     }
//   }
// `;

// const StepperActionButtons = ({ handleNextClick }) => {
//   const { currentStep, setCurrentStep } = useContext(AppStore);
//   const location = useLocation();

//   if (location.pathname.includes("preview")) return null;

//   return (
//     <FloatingActions>
//       <ActionButton
//         variant="contained"
//         sx={{
//           backgroundColor: "white",
//           color: "rgb(148,25,20)",
//           border: "1px solid rgb(148,25,20)",
//           "&:hover": {
//             backgroundColor: "rgba(148,25,20,0.05)",
//           },
//           "&:disabled": {
//             opacity: 0.5
//           }
//         }}
//         disabled={currentStep === 0}
//         onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
//       >
//         Back
//       </ActionButton>
//       <ActionButton
//         variant="contained"
//         sx={{
//           backgroundColor: "rgb(148,25,20)",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "rgb(120,20,15)",
//           }
//         }}
//         onClick={handleNextClick}
//       >
//         {currentStep === 4 ? 'Submit' : 'Continue'}
//       </ActionButton>
//     </FloatingActions>
//   );
// };

// export default StepperActionButtons;


// import React, { useContext } from 'react';
// import { Button } from "@mui/material";
// import { AppStore } from '../../../Store/appStore';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// const ActionBar = styled.div`
//   position: fixed;
//   bottom: 0;
//   left: 280px;
//   right: 0;
//   height: 80px;
//   background: #ffffff;
//   border-top: 1px solid #e0e0e0;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 3rem;
//   z-index: 100;

//   @media (max-width: 992px) {
//     left: 220px;
//     padding: 0 2rem;
//   }

//   @media (max-width: 768px) {
//     left: 0;
//     justify-content: center;
//     gap: 1rem;
//   }
// `;

// const PrimaryButton = styled(Button)`
//   && {
//     min-width: 150px;
//     padding: 10px 24px;
//     border-radius: 6px;
//     font-weight: 500;
//     text-transform: none;
//     box-shadow: none;
    
//     &:hover {
//       box-shadow: 0 2px 6px rgba(0,0,0,0.2);
//     }
//   }
// `;

// const STEPS = [
//   "SMS Opt-In/Out",
//   "File Upload",
//   "Preview"
// ];

// const StepperActionButtons = ({ handleNextClick }) => {
//   const { currentStep, setCurrentStep } = useContext(AppStore);
//   const location = useLocation();

//   if (location.pathname.includes("preview")) return null;

//   return (
//     <ActionBar>
//       <PrimaryButton
//         variant="outlined"
//         sx={{
//           color: "rgb(148,25,20)",
//           borderColor: "rgb(148,25,20)",
//           "&:hover": {
//             borderColor: "rgb(120,20,15)",
//           },
//           "&:disabled": {
//             borderColor: "#e0e0e0",
//             color: "#9e9e9e"
//           }
//         }}
//         disabled={currentStep === 0}
//         onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
//       >
//         Back
//       </PrimaryButton>
      
//       <PrimaryButton
//         variant="contained"
//         sx={{
//           backgroundColor: "rgb(148,25,20)",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "rgb(120,20,15)",
//           }
//         }}
//         onClick={handleNextClick}
//       >
//         {currentStep === STEPS.length - 1 ? 'Submit Application' : 'Continue'}
//       </PrimaryButton>
//     </ActionBar>
//   );
// };

// export default StepperActionButtons;


// import React, { useContext } from 'react';
// import { Button, Box } from "@mui/material";
// import { AppStore } from '../../../Store/appStore';
// import { useLocation } from 'react-router-dom';
// import styled from 'styled-components';

// const FloatingActions = styled.div`
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
//   display: flex;
//   gap: 1rem;
//   z-index: 1000;
//   transition: all 0.3s ease;

//   @media (max-width: 768px) {
//     bottom: 1rem;
//     right: 1rem;
//     flex-direction: column-reverse;
//     align-items: flex-end;
//   }
// `;

// const FloatingButton = styled(Button)`
//   && {
//     min-width: 56px;
//     height: 56px;
//     border-radius: 50%;
//     padding: 0;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.2);
//     transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
//     &:hover {
//       box-shadow: 0 6px 16px rgba(0,0,0,0.3);
//       transform: translateY(-2px);
//     }

//     &.extended {
//       border-radius: 28px;
//       min-width: auto;
//       padding: 0 1.5rem;
//     }
//   }
// `;

// const STEPS = [
//   "SMS Opt-In/Out",
//   "File Upload",
//   "Preview"
// ];

// const StepperActionButtons = ({ handleNextClick }) => {
//   const { currentStep, setCurrentStep } = useContext(AppStore);
//   const location = useLocation();

//   if (location.pathname.includes("preview")) return null;

//   return (
//     <FloatingActions>
//       <FloatingButton
//         variant="contained"
//         className={currentStep === 0 ? "" : "extended"}
//         sx={{
//           backgroundColor: "white",
//           color: "rgb(148,25,20)",
//           border: "1px solid rgb(148,25,20)",
//           "&:hover": {
//             backgroundColor: "rgba(148,25,20,0.05)",
//           },
//           "&:disabled": {
//             opacity: 0.5,
//             boxShadow: 'none'
//           }
//         }}
//         disabled={currentStep === 0}
//         onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
//       >
//         {currentStep === 0 ? (
//           <span>←</span>  // Just an arrow for first step
//         ) : (
//           "Back"
//         )}
//       </FloatingButton>

//       <FloatingButton
//         variant="contained"
//         className="extended"
//         sx={{
//           backgroundColor: "rgb(148,25,20)",
//           color: "white",
//           "&:hover": {
//             backgroundColor: "rgb(120,20,15)",
//           }
//         }}
//         onClick={handleNextClick}
//       >
//         {currentStep === STEPS.length - 1 ? 'Submit' : 'Next'}
//       </FloatingButton>
//     </FloatingActions>
//   );
// };

// export default StepperActionButtons;

import React, { useContext } from 'react';
import { Button } from "@mui/material";
import { AppStore } from '../Store/appStore';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const FloatingActions = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`;

const FloatingButton = styled(Button)`
  && {
    min-width: 56px;
    height: 56px;
    border-radius: 50%;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    &:hover {
      box-shadow: 0 6px 16px rgba(0,0,0,0.3);
      transform: translateY(-2px);
    }

    &.extended {
      border-radius: 28px;
      min-width: auto;
      padding: 0 1.5rem;
    }
  }
`;


const StepperActionButtons = ({ STEPS, handleNextClick }) => {
  const { currentStep, setCurrentStep } = useContext(AppStore);
  const location = useLocation();

  console.log("Steps"+STEPS);
  

  if (location.pathname.includes("preview")) return null;

  return (
    <FloatingActions>
      <FloatingButton
        variant="contained"
        className={currentStep === 0 ? "" : "extended"}
        sx={{
          backgroundColor: "white",
          color: "rgb(100,15,10)", 
          border: "1px solid rgb(100,15,10)", 
          "&:hover": {
            backgroundColor: "rgba(148,25,20,0.05)",
          },
          "&:disabled": {
            opacity: 0.5,
            boxShadow: 'none'
          }
        }}
        disabled={currentStep === 0}
        onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
      >
        {currentStep === 0 ? (
          <ArrowBackIcon sx={{ color: "rgb(100,15,10)", fontSize: "1.5rem" }} /> // Darker arrow icon
        ) : (
          "Back"
        )}
      </FloatingButton>

      <FloatingButton
        variant="contained"
        className="extended"
        sx={{
          backgroundColor: "rgb(148,25,20)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgb(120,20,15)",
          }
        }}
        onClick={handleNextClick}
      >
        {currentStep === STEPS.length - 1 ? 'Submit' : 'Next'}
      </FloatingButton>
    </FloatingActions>
  );
};

export default StepperActionButtons;