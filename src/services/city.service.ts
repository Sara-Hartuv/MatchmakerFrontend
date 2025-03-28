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