import React, { useEffect, useState } from "react";

const WarningPopup = () => {
  const [countDown, setCountDown] = useState(30)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black z-[100000] bg-opacity-50">
      <div className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center gap-3">
      <div className=" p-5 rounded-xl bg-[rgb(0,78,150)] text-white">
        <p className="text-xl text-center">
          You will be logged out in {countDown} seconds due to inactivity.
        </p>
    </div>
    {/* <div className="w-[10vw] h-[10vw] bg-white rounded-full flex items-center justify-center p-1">
      <div className=" w-full h-full bg-[rgb(0,78,150)] rounded-full flex items-center justify-center">
        <p className="text-white text-3xl">{countDown}</p>
      </div>
    </div> */}
      </div>
    </div>
  );
};

export default WarningPopup;
