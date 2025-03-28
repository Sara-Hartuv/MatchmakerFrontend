import axiosInstance from "../utils/axios";

import { getCandidateById } from "./candidate.service";
import { getMatchmakerById } from "./matchmaker.service";

export const fetchUserData = async (id: number, role: string) => {
  try {
    if (role === "candidate") {
      return await getCandidateById(id);
    } else if (role === "matchmaker") {
      return await getMatchmakerById(id);
    }
    throw new Error("Invalid role");
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

