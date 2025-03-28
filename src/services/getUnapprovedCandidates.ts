import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

// שליפת כל המועמדים הלא מאושרים
export const getUnConfirmationCandidates = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getUnConfirmationCandidates);
  return response.data;
};

// אישור מועמד לפי ID
export const confirmCandidate = async (id: number) => {
  const response = await axiosInstance.put(ENDPOINTS.updateCandidate(id));
  return response.data;
};

// הסרת מועמד לפי ID
export const removeCandidate = async (id: number) => {
  const response = await axiosInstance.delete(ENDPOINTS.removeCandidate(id));
  return response.data;
};
