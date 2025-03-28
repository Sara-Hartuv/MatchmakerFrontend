import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

export const getCities = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getCities);
  return response.data;
};

export const getProfessions = async () => {
    const response = await axiosInstance.get(ENDPOINTS.getProfessions);
    return response.data;
  };

  export const getAllMatch = async () => {
    const response = await axiosInstance.get(ENDPOINTS.getMatchSuggestions);
    return response.data;
  };
 
  // שליפת כל העצות לפי ID
  export const getMatchById = async (id: number) => {
    const response = await axiosInstance.get(ENDPOINTS.getMatchById(id));
    return response.data;
  };