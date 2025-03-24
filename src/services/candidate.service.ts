import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

// **שליפת כל המועמדים**
export const getAllCandidates = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getAllCandidates);
  return response.data;
};

// **שליפת מועמד לפי ID**
export const getCandidateById = async (id: number) => {
  const response = await axiosInstance.get(ENDPOINTS.getCandidateById(id));
  return response.data;
};

// **שליפת כל המועמדים שטרם אושרו**
export const getUnConfirmationCandidates = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getUnConfirmationCandidates);
  return response.data;
};

// **אישור מועמד לפי ID**
export const confirmCandidate = async (id: number) => {
  const response = await axiosInstance.put(ENDPOINTS.confirmCandidate(id));
  return response.data;
};

// **עדכון מועמד לפי ID**
export const updateCandidate = async (id: number, formData: any) => {
  const response = await axiosInstance.put(ENDPOINTS.updateCandidate(id), formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// **מחיקת מועמד לפי ID**
export const deleteCandidate = async (id: number) => {
  const response = await axiosInstance.delete(ENDPOINTS.deleteCandidate(id));
  return response.data;
};
// **שליפת כל המועמדים שאושרו**
 export const getAllMyMatch = async (id: number) => {
  const response = await axiosInstance.get(ENDPOINTS.getProposalsForUser(id));
  return response;};// מחזיר את התשובה מהשרת
