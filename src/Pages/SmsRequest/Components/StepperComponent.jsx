import React, { useState, useContext } from "react";
import styled from "styled-components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import Preview from "./Preview";
import { AuthStore } from "../../../Store/authStore";
import { AppStore } from "../../../Store/appStore";
import BasicDetails from "./BasicDetails";
import FileUpload from "./FileUpload";
import Preview from "./Preview";

const dynamicColor = (color) => `
  background: ${color};

  &::before {
    background: ${color};
  }

  &::after {
    border-left: 30px solid ${color};
  }
`;

const Container = styled.div`
  .title {
    font-size: 17px;
  }

  ul {
    list-style: none;
    display: flex;
    width: 80%;
    background-color: rgb(244, 244, 245);
  }

  li {
    flex: 1;
    height: 50px;
    margin-right: 5px;
    display: inline-flex;
    position: relative;

    &.current {
      ${dynamicColor("rgb(148,25,20)")}
      color: white;
    }

    &.completed {
      ${dynamicColor("#187a0d")}
      color: white;
    }

    &.skipped {
      ${dynamicColor("red")}
      color: white;
    }
  }

  li::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-left: 30px solid white;
    border-bottom: 25px solid transparent;
  }

  li::after {
    content: "";
    display: inline-block;
    background: transparent;
    width: 0;
    height: 0;
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;
    right: -29px;
    position: absolute;
    z-index: 1;
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 0px 5px 6px;
  }

  li:first-child {
    &::before {
      display: none;
    }
  }

  li:last-child {
    margin-right: 0px;

    &::after {
      display: none;
    }
  }

  .status-name {
    font-size: 1px;
    line-height: 15px;
    display: inline-block;
    word-break: break-word;
  }

  mat-icon.status-done {
    height: 18px;
    width: 18px;
    font-size: 21px;
    color: white;
  }

  @media (max-width: 1366px) {
    .status-name {
      font-size: 11px;
    }
  }
`;

const StepperComponent = ({ currentStep, setCurrentStep }) => {
  const { user } = useContext(AuthStore);
  const { headerHeight, loading } = useContext(AppStore);
  const stepperLabel = [
    "SMS Opt-In/Out",
    "File Upload",
    "Preview",
  ];

  const stepToRender = () => {
    if (currentStep == 0) {
      return <BasicDetails />;
    } else if (currentStep == 1) {
      return <FileUpload />;
    } else if (currentStep == 2) {
      return <Preview />;
    }
  };

  return (
    <Container>
      <div
        style={{ top: `${headerHeight}px`, zIndex: loading ? "10" : "200" }}
        className={`flex print:hidden cursor-default justify-center sticky items-center`}
      >
        <ul className="shadow-lg bg-white z-10">
          {stepperLabel.map((label, index) => (
            <li
              key={index}
              className={
                currentStep === index
                  ? "current"
                  : currentStep > index
                    ? "completed"
                    : ""
              }
            >
              <div className="w-full flex items-center gap-2">
                <span className="ps-3">
                  {currentStep > index ? <CheckCircleIcon /> : null}
                  <span className="ps-1">{label}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3">{stepToRender()}</div>
    </Container>
  );
};

export default StepperComponent;
