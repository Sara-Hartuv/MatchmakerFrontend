import axiosInstance from "../utils/axios";

export const addProfession = async (name: string, description: string) => {
  const response = await axiosInstance.post("/Profession", { name, description }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};