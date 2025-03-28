import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";

// **שליפת הצעות השידוך**
export const getMatchSuggestions = async () => {
  const response = await axiosInstance.get(ENDPOINTS.getMatchSuggestions);
  return response.data;
};

// **הצעת שידוך**
export const proposeMatch = async (candidateId: number, matchId: number) => {
  const response = await axiosInstance.post(ENDPOINTS.proposeMatch, {
    candidateId,
    matchId,
  });
  return response.data;
};

export const GetMatchesByIdMatchmaker = async (matchmakerId: number) => {
  const response = await axiosInstance.get(ENDPOINTS.GetMatchesByIdMatchmaker(matchmakerId));
  return response.data;
};
export const GetAllMatchEngaged = async () => {
  const response = await axiosInstance.get(ENDPOINTS.GetAllMatchEngaged);
  return response.data;
};
