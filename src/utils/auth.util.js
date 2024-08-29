import { getCookie } from "./cookieUtils";

export const checkToken = () => {
    const token = getCookie('authToken');
    return token !== undefined && token !== '';
  };
  