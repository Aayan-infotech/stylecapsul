import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCookie } from "../utils/cookieUtils";
import { logoutUser } from "./loginSlice";
import { showErrorToast } from "../components/toastMessage/Toast";

const useSessionChecker = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hasLoggedOut = useRef(false); // prevent repeated redirects

    useEffect(() => {
        const interval = setInterval(() => {
            const cookieToken = getCookie("authToken");

            if (!cookieToken && !hasLoggedOut.current) {
                hasLoggedOut.current = true;
                dispatch(logoutUser());
                showErrorToast("Session expired, please login again.");
                window.location.href = "/login";
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [dispatch, navigate]);
};

export default useSessionChecker;
