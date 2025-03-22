import { PATHS } from "../routes/path";
import axios from "../utils/axios";

export const setSession = (token: string) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getSession = (): string | null => {
  const token = localStorage.getItem("token");
  return token || null;
};

export const removeSession = () => {
  localStorage.removeItem("token");
  axios.defaults.headers.common.Authorization = undefined;
  window.location.href = PATHS.login;
};

export function jwtDecode(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

export const getUserIdFromToken = (): string | null => {
  const session = getSession();
  console.log(session);
  if (!session ) return null;
  try {
    const decoded: any = jwtDecode(session);
    return (
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] || null
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
