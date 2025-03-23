import { ENDPOINTS } from "../api/endpoints";
import axiosInstance from "../utils/axios";

export const getConfirmationCandidates = async () => {
    try {
        const response = await axiosInstance.get(ENDPOINTS.getConfirmationCandidates);
        console.log("הנתונים נטענו בהצלחה",response.data);
        return response.data;
    } catch (error) {
        console.error("שגיאה בקבלת הנתונים:", error);
        throw error;
    }
};
