import React from "react";
import FederalBankLogo from "../../../assets/FedBankLogo.png";

const Logo = () => {
  return (
    <div className="flex items-center justify-between mt-2 mb-4">
      <img src={FederalBankLogo} className="w-32" alt="Logo" />
      <div className="flex items-center justify-center gap-2">
        <span className="text-[24px] font-brlnsr font-bold text-[rgb(0,78,150)]">
          Collection
        </span>
        <span className="text-[24px] font-brlnsr font-bold text-[#FAA61A]">
          Hub
        </span>
      </div>
    </div>
  );
};

export default Logo;
