import React, { useContext, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = ({ type, message, setShowToast, showToast }) => {

  console.log("toastify :" + showToast);


  useEffect(() => {
    if (showToast) {
      toast.dismiss()
      switch (type) {
        case "success":
          toast.success(message);
          break;
        case "info":
          toast.info(message);
          break;
        case "warning":
          toast.warning(message);
          break;
        case "error":
          toast.error(message);
          break;
        default:
          toast(message);
          break;
      }
      setShowToast(false);
    }
  }, [showToast, message, type, setShowToast]);

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
      limit={1}
    />
  );
};

export default Toastify;