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

export function jwtDecode<T = any>(token: String): T | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null; // אם הטוקן לא תקין

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}




export const isValidToken = (token: string): boolean => {
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded && decoded.exp && decoded.exp > now;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};


export const getUserIdFromToken = (): number | null => {
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
