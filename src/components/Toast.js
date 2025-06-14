import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineClose } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const toastClassName = {
  success:
    "rounded-md flex mb-5 last:mb-8 !bg-green-700 dark:!text-black !text-white dark:!bg-green-100 !border !border-green-400 dark:!border-green-500",
  warning:
    "rounded-md flex mb-5 last:mb-8 !bg-yellow-700 dark:!text-black !text-white dark:!bg-yellow-100 !border !border-yellow-400 dark:!border-yellow-500",
};

const Toast = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <ToastContainer
      position="bottom-center"
      hideProgressBar
      autoClose={2000}
      bodyClassName="toast-body"
      closeButton={
        <MdOutlineClose className="text-gray-200 hover:text-gray-100 dark:text-gray-700 dark:hover:text-gray-600" />
      }
      className="px-4 sm:px-0 sm:w-auto sm:min-w-80 sm:max-w-md"
    />,
    document.body
  );
};

Toast.success = (msg) => {
  return toast.success(msg, {
    icon: <FaCheckCircle className="text-green-400 dark:text-green-500" />,
    className: toastClassName["success"],
  });
};

Toast.error = (msg) => {
  return toast.error(msg, {
    icon: <FaCheckCircle className="text-yellow-400 dark:text-yellow-500" />,
    className: toastClassName["warning"],
  });
};

export default Toast;
