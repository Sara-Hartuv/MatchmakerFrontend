import axiosInstance from "../utils/axios";
import { ENDPOINTS } from "../api/endpoints";
import { getUserIdFromToken } from "../auth/auth.utils";

export const getBrothers = async (id:number) => {
  try {
    const response = await axiosInstance.get(`${ENDPOINTS.getBrothers}/${id}`);
    console.log(response.data); // בדוק אם זה מערך
    return response.data;
  } catch (error) {
    console.log("שגיאה בשליפת רשימת האחים:", error);
    throw error;
  }
};
export const addBrother = async (brotherData: { name: string; placeOfStudy: string; gender: number; married: boolean; nameIn_laws: string; addressIn_laws: string }) => {
    try {
      const response = await axiosInstance.post(
        `${ENDPOINTS.addBrother}`,
        brotherData, // המרת הנתונים ל-JSON
            {
                headers: {
                  "Content-Type": "application/json",
                },
        }
      );
      console.log(response.data); // בדוק אם זה מערך
      return response.data;
    } catch (error) {
      console.log("שגיאה בהוספת אח:", error);
      throw error;
    }
  };