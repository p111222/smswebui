import React from "react";

const PageTitle = ({ titleText, titleIcon, demoPage }) => {
  return (
    <div className="">
      <div className="flex items-center gap-3">
        <>{titleIcon}</>
        <h1
          className={`text-2xl font-bold leading-7 ${
            demoPage ? "text-[rgb(37,139,46)]" : "text-[rgb(148,25,20)]"
          } sm:text-2xl sm:tracking-tight`}
        >
          {titleText}
        </h1>
      </div>
    </div>
  );
};

export default PageTitle;
