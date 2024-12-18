import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to display success toast
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        style: {
            backgroundColor: "black",
            color: "#C8B199",
            borderRadius: "50px",
            padding: "10px 20px",
        },
    });
};

// Function to display error toast
export const showErrorToast = (message) => {
    toast.error(message, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        style: {
            backgroundColor: "red",
            color: "#fff",
            borderRadius: "50px",
            padding: "10px 20px",
        },
    });
};

const Toast = () => {
    return <ToastContainer />;
};

export default Toast;
