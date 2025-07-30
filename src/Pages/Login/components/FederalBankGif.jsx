import React from "react";
import federalbankGif from "../../../assets/serving_bharat_off_white_bg.gif"

const FederalBankGif = () => {
  return (
    <div className="absolute top-4 xl:bottom-16 left-[8%] w-[30vw] sm:[40vw] md:w-[50vw] ">
      <img
        className="w-full h-full bg-cover bg-center bg-no-repeat rounded-lg"
        src={federalbankGif}
        alt="federal bank gif"
      />
    </div>
  );
};

export default FederalBankGif;
