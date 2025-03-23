import { PATHS } from "../routes/path";
import axios from "../utils/axios";

export const setSession = (token: string | null) => {
  if (token && isValidToken(token)) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    removeSession(); // אם הטוקן לא תקף, מוחקים את הסשן
  }
};

export const setAuthorizationHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getSession = (): string | null => {
  return localStorage.getItem("token") || null;
};

export const removeSession = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common.Authorization;
  window.location.href = PATHS.login;
};

export function jwtDecode(token: string) {
  try {
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
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export const isValidToken = (token: string): boolean => {
  if (!token) return false;

  const decoded = jwtDecode(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const getUserIdFromToken = (): string | null => {
  const session = getSession();
  if (!session || !isValidToken(session)) return null;

  try {
    const decoded: any = jwtDecode(session);
    return (
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
