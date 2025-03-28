import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

// שליפת שדכנים לא מאושרים
export const getUnConfirmationMatchmakers = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getUnConfirmationMatchmakers);
  return response.data;
};

// אישור שדכן
export const confirmMatchmaker = async (id: string) => {
  const response = await axiosInstance.put(ENDPOINTS.confirmMatchmaker(id));
  return response.data;
};
