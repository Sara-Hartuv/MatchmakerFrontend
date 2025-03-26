import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";


export const getInquiries = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINTS.getInquiries}/${userId}`);
      console.log(response.data); // בדוק אם זה מערך
      return response.data;
    } catch (error) {
      console.error("שגיאה בשליפת רשימת הבירורים:", error);
      throw error;
    }
  };
  export const addInquiry = async (inquiryData: { name: string; phone: string; type: number }) => {
    try {
      const response = await axiosInstance.post(`${ENDPOINTS.addInquiry}`, inquiryData);
      console.log(response.data); // בדוק אם זה מערך
      return response.data;
    } catch (error) {
      console.log("שגיאה בהוספת בירור:", error);
      throw error;
    }
  };