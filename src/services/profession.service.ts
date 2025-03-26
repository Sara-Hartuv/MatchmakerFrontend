import axiosInstance from "../utils/axios";

export const addProfession = async (name: string, description: string) => {
  const response = await axiosInstance.post("/Profession", { name, description }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export const getProfessions = async () => {
  try {
    const response = await axiosInstance.get("/Profession");
    return response.data; // מחזיר את רשימת המקצועות
  } catch (error) {
    console.log("שגיאה בשליפת רשימת המקצועות:", error);
    throw error;
  }
};