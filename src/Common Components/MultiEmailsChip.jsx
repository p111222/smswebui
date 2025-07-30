import React, { useContext, useState } from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { AppStore } from "../Store/appStore";

const MultiEmailsChip = ({ emails, setEmails, emailCommFlg, isDisable }) => {
  const { setShowToast, setMessage, setType, isFieldDisabled } = useContext(AppStore);
  const handleEmailChange = (updatedEmails) => {
    if (updatedEmails.length <= 5) {
      setEmails(updatedEmails);
    } else {
      setEmails(updatedEmails.slice(0, 5));
      setMessage("You can only add up to 5 emails.");
      setShowToast(true);
      setType("info");
    }
  };
  return (
    <div className="relative">
      <ReactMultiEmail
        placeholder="Email ID"
        emails={emails}
        enable={!emailCommFlg}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          backgroundColor: "#F1F4F8",
        }}
        onChange={handleEmailChange}
        getLabel={(email, index, removeEmail) => {
          if (index === 5) {
            return;
          }
          return (
            <div
              className={`${isFieldDisabled || isDisable === "Y" ? "text-gray-500 border-slate-300" : "text-gray-800 border-slate-500"} border break-words bg-gray-200 flex flex-wrap items-center gap-2 py-2 px-3 rounded-2xl`}
            >
              {email}
              <span
                className={`${isFieldDisabled || isDisable === "Y" ? "cursor-default" : "cursor-pointer"}  flex items-center justify-center`}
                onClick={() => {
                  if (isFieldDisabled || isDisable === "Y") {
                    return
                  }
                  removeEmail(index)
                }
                }
              >
                ×
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MultiEmailsChip;
