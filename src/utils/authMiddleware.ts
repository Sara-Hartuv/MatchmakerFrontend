import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from "../auth/auth.utils"

export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
     // רשימת נתיבים שלא צריכים טוקן
     const publicRoutes = ["/Login/login", "/Login/signup"];

     // אם הנתיב נמצא ברשימה, לא לבדוק טוקן
     if (publicRoutes.some(route => request.url?.includes(route))) {
         return request;
     }
    const authUser = getSession()
    if (!authUser || !isValidToken(authUser)) {
        removeSession();
        Promise.reject('Unauthorized')
    }
    return request
}

export const authResponseMiddleware = (response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession();
        Promise.reject('Unauthorized')
    }
    return response
}