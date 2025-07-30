import React from "react";
import InfoIcon from '@mui/icons-material/Info';

const Toast = ({ message, arrow }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="px-2 py-1 flex items-center gap-2 bg-white w-fit border border-gray-400 rounded-[4px] relative z-[50]"
    >
      {arrow === true && (
        <div className="z-[10] absolute top-[-50%] translate-y-[50%] left-4 bg-white border-gray-400 w-[15px] h-[15px] border border-r-0 border-b-0 rotate-45"></div>
      )}
      <InfoIcon sx={{ color: "#FF8C00", zIndex: 11 }} />
      <p className="text-[12.5px]">{message}</p>
    </div>
  );
};

export default Toast;
