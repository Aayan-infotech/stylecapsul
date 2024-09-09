import { getCookie } from "./cookieUtils";

export const checkToken = () => {
  const token = getCookie('authToken');
  if (token) {
    return true
  } else {
    return false
  }
};
