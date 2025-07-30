import React, { useContext } from "react";
import { AppStore } from "../Store/appStore.jsx";
import loader from "../assets/loader.gif"

const Loader = () => {
    const {loading} = useContext(AppStore)
  return (
    <div>
      <div
        className={`w-full h-screen fixed top-0  left-0 z-[10000] bg-black bg-opacity-40 ${
          loading ? "flex" : "hidden"
        }  items-center justify-center`}
      >
        <img className="w-28 h-28" src={loader} alt="loading..." />
      </div>
    </div>
  );
};

export default Loader;
