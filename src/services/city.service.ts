import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

export const addCity = async (name: string) => {
  const response = await axiosInstance.post(ENDPOINTS.addCity, { name }, {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded", // הגדרת סוג התוכן
      },
  });
  return response.data;
};

export const getCities = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.getCities); // קריאה ל-API לקבלת רשימת הערים
    return response.data; // החזרת רשימת הערים
  } catch (error) {
    console.error("שגיאה בשליפת רשימת הערים:", error);
    throw error; // זריקת השגיאה כדי לטפל בה במקום אחר
  }
};