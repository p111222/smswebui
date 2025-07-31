// import React, { useState, useContext } from "react";
// import styled from "styled-components";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import Preview from "./Preview";
// import { AuthStore } from "../../../Store/authStore";
// import { AppStore } from "../../../Store/appStore";
// import BasicDetails from "./BasicDetails";
// import FileUpload from "./FileUpload";
// import Preview from "./Preview";

// const dynamicColor = (color) => `
//   background: ${color};

//   &::before {
//     background: ${color};
//   }

//   &::after {
//     border-left: 30px solid ${color};
//   }
// `;

// const Container = styled.div`
//   .title {
//     font-size: 17px;
//   }

//   ul {
//     list-style: none;
//     display: flex;
//     width: 80%;
//     background-color: rgb(244, 244, 245);
//   }

//   li {
//     flex: 1;
//     height: 50px;
//     margin-right: 5px;
//     display: inline-flex;
//     position: relative;

//     &.current {
//       ${dynamicColor("rgb(148,25,20)")}
//       color: white;
//     }

//     &.completed {
//       ${dynamicColor("#187a0d")}
//       color: white;
//     }

//     &.skipped {
//       ${dynamicColor("red")}
//       color: white;
//     }
//   }

//   li::before {
//     content: "";
//     display: inline-block;
//     width: 0;
//     height: 0;
//     border-top: 25px solid transparent;
//     border-left: 30px solid white;
//     border-bottom: 25px solid transparent;
//   }

//   li::after {
//     content: "";
//     display: inline-block;
//     background: transparent;
//     width: 0;
//     height: 0;
//     border-top: 25px solid transparent;
//     border-bottom: 25px solid transparent;
//     right: -29px;
//     position: absolute;
//     z-index: 1;
//   }

//   .content {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     padding: 5px 0px 5px 6px;
//   }

//   li:first-child {
//     &::before {
//       display: none;
//     }
//   }

//   li:last-child {
//     margin-right: 0px;

//     &::after {
//       display: none;
//     }
//   }

//   .status-name {
//     font-size: 1px;
//     line-height: 15px;
//     display: inline-block;
//     word-break: break-word;
//   }

//   mat-icon.status-done {
//     height: 18px;
//     width: 18px;
//     font-size: 21px;
//     color: white;
//   }

//   @media (max-width: 1366px) {
//     .status-name {
//       font-size: 11px;
//     }
//   }
// `;

// const StepperComponent = ({ currentStep, setCurrentStep }) => {
//   const { user } = useContext(AuthStore);
//   const { headerHeight, loading } = useContext(AppStore);
//   const stepperLabel = [
//     "SMS Opt-In/Out",
//     "File Upload",
//     "Preview",
//   ];

//   const stepToRender = () => {
//     if (currentStep == 0) {
//       return <BasicDetails />;
//     } else if (currentStep == 1) {
//       return <FileUpload />;
//     } else if (currentStep == 2) {
//       return <Preview />;
//     }
//   };

//   return (
//     <Container>
//       <div
//         style={{ top: `${headerHeight}px`, zIndex: loading ? "10" : "200" }}
//         className={`flex print:hidden cursor-default justify-center sticky items-center`}
//       >
//         <ul className="shadow-lg bg-white z-10">
//           {stepperLabel.map((label, index) => (
//             <li
//               key={index}
//               className={
//                 currentStep === index
//                   ? "current"
//                   : currentStep > index
//                     ? "completed"
//                     : ""
//               }
//             >
//               <div className="w-full flex items-center gap-2">
//                 <span className="ps-3">
//                   {currentStep > index ? <CheckCircleIcon /> : null}
//                   <span className="ps-1">{label}</span>
//                 </span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="mt-3">{stepToRender()}</div>
//     </Container>
//   );
// };

// export default StepperComponent;



// import React, { useContext } from "react";
// import styled from "styled-components";
// import { AppStore } from "../../../Store/appStore";
// import { AuthStore } from "../../../Store/authStore";
// import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
// import BasicDetails from "./BasicDetails";
// import FileUpload from "./FileUpload";
// import Preview from "./Preview";

// const VerticalStepperContainer = styled.div`
//   display: flex;
//   gap: 2rem;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const StepperSidebar = styled.div`
//   width: 250px;
//   background: #f8f9fa;
//   border-radius: 12px;
//   padding: 1.5rem;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//   height: fit-content;
//   position: sticky;
//   top: ${({ $headerHeight }) => `${$headerHeight + 20}px`};

//   @media (max-width: 768px) {
//     width: 100%;
//     position: static;
//   }
// `;

// const StepItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 0.75rem 1rem;
//   margin-bottom: 0.5rem;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: all 0.2s;

//   ${({ $active }) => $active && `
//     background: rgba(148,25,20,0.1);
//     border-left: 3px solid rgb(148,25,20);
//   `}

//   ${({ $completed }) => $completed && `
//     background: rgba(24,122,13,0.1);
//   `}
// `;

// const StepIcon = styled.div`
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 1rem;
//   background: ${({ $active, $completed }) => 
//     $active ? 'rgb(148,25,20)' : $completed ? '#187a0d' : '#e0e0e0'};
//   color: white;
// `;

// const StepContent = styled.div`
//   flex: 1;
//   background: white;
//   border-radius: 12px;
//   padding: 2rem;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// `;

// const StepperComponent = () => {
//   const { currentStep, setCurrentStep, headerHeight, loading } = useContext(AppStore);
//   const { user } = useContext(AuthStore);

//   const steps = [
//     { label: "SMS Opt-In/Out", component: <BasicDetails /> },
//     { label: "File Upload", component: <FileUpload /> },
//     { label: "Preview", component: <Preview /> }
//   ];

//   return (
//     <VerticalStepperContainer>
//       <StepperSidebar $headerHeight={headerHeight}>
//         {steps.map((step, index) => (
//           <StepItem
//             key={index}
//             $active={currentStep === index}
//             $completed={currentStep > index}
//             onClick={() => setCurrentStep(index)}
//           >
//             <StepIcon $active={currentStep === index} $completed={currentStep > index}>
//               {currentStep > index ? <CheckCircle fontSize="small" /> : <FiberManualRecord fontSize="small" />}
//             </StepIcon>
//             <div>
//               <div style={{ fontWeight: 500 }}>Step {index + 1}</div>
//               <div style={{ fontSize: '0.875rem' }}>{step.label}</div>
//             </div>
//           </StepItem>
//         ))}
//       </StepperSidebar>

//       <StepContent>
//         {steps[currentStep].component}
//       </StepContent>
//     </VerticalStepperContainer>
//   );
// };

// export default StepperComponent;


import React, { useContext } from "react";
import styled from "styled-components";
import { AppStore } from "../../../Store/appStore";
import { AuthStore } from "../../../Store/authStore";
import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import BasicDetails from "./BasicDetails";
import FileUpload from "./FileUpload";
import Preview from "./Preview";

const FullPageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - ${({ $headerHeight }) => `${$headerHeight}px`});
  background: #f5f7fa;
`;

const StepperSidebar = styled.div`
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 2rem 1.5rem;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);

  @media (max-width: 992px) {
    width: 220px;
    padding: 1.5rem 1rem;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $active, $completed }) => 
    $active ? 'rgba(148,25,20,0.08)' : 
    $completed ? 'rgba(24,122,13,0.08)' : 'transparent'};

  &:hover {
    background: rgba(148,25,20,0.05);
  }
`;

const StepContentArea = styled.div`
  flex: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: -2px 0 8px rgba(0,0,0,0.05);

  @media (max-width: 1200px) {
    padding: 1.5rem 2rem;
  }
`;

const StepIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 1rem;
  background: ${({ $active, $completed }) => 
    $active ? 'rgb(148,25,20)' : 
    $completed ? '#187a0d' : '#e0e0e0'};
  color: white;
  flex-shrink: 0;
`;

const StepperComponent = () => {
  const { currentStep, setCurrentStep, headerHeight } = useContext(AppStore);
  const { user } = useContext(AuthStore);

  const steps = [
    { label: "SMS Opt-In/Out", component: <BasicDetails /> },
    { label: "File Upload", component: <FileUpload /> },
    { label: "Preview", component: <Preview /> }
  ];

  return (
    <FullPageContainer $headerHeight={headerHeight}>
      <StepperSidebar>
        
        <h3 className="font-bold" style={{ marginBottom: '2rem', color: '#333' }}>Application Steps</h3>
        {steps.map((step, index) => (
          <StepItem
            key={index}
            $active={currentStep === index}
            $completed={currentStep > index}
            onClick={() => setCurrentStep(index)}
          >
            <StepIcon $active={currentStep === index} $completed={currentStep > index}>
              {currentStep > index ? <CheckCircle fontSize="small" /> : <span>{index + 1}</span>}
            </StepIcon>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{step.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                {currentStep > index ? 'Completed' : currentStep === index ? 'Active' : 'Pending'}
              </div>
            </div>
          </StepItem>
        ))}
      </StepperSidebar>

      <StepContentArea>
        {steps[currentStep].component}
      </StepContentArea>
    </FullPageContainer>
  );
};

export default StepperComponent;