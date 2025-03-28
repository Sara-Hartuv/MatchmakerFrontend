import { ENDPOINTS } from "../api/endpoints";
import axiosInstance from "../utils/axios";
import axios from "../utils/axios";

// export const getConfirmationCandidates = async () => {
//     try {
//         const response = await axiosInstance.get(ENDPOINTS.getConfirmationCandidates);
//         console.log("הנתונים נטענו בהצלחה",response.data);
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בקבלת הנתונים:", error);
//         throw error;
//     }
// };

// export const getCandidates = async () => {
//   const response = await axios.get("/matchmaker/candidates");
//   return response.data;
// };

// export const getMatches = async () => {
//   const response = await axios.get("/matchmaker/matches");
//   return response.data;
// };

// export const getMatchmaker = async () => {
//   const response = await axios.get("/matchmaker/profile");
//   return response.data;
// };

export const getMatchmakerById = async (id: number) => {
    const response = await axiosInstance.get(ENDPOINTS.getMatchmakerById(id));
    return response.data;
  };

  export const getAllMatchmakers = async () => {
    const response = await axiosInstance.get(ENDPOINTS.getAllMatchmakers);
    return response.data;
  };

  // שליפת שדכנים לא מאושרים
export const getUnConfirmationMatchmakers = async () => {
    const response = await axiosInstance.get(ENDPOINTS.getUnConfirmationMatchmakers);
    return response.data;
  };
  export const getConfirmationMatchmakers = async () => {
    const response = await axiosInstance.get(ENDPOINTS.getConfirmedMatchmakers);
    return response.data;
  };
  // אישור שדכן
  export const confirmMatchmaker = async (id: string) => {
    const response = await axiosInstance.put(ENDPOINTS.confirmMatchmaker(id));
    return response.data;
  };
   export const getMatchByIdFromMatchmaker = async (id: number) => {
    const response = await axiosInstance.put(ENDPOINTS.getMatchByIdMatchmaker(id));
    return response.data;
  };

  