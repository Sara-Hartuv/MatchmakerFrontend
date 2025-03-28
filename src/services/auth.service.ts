import { ENDPOINTS } from "../api/endpoints";
import axiosInstance from "../utils/axios";


export const signUp = async (email: string, password: string, userType: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("userType", userType);

  console.log(
    "📡 שולח בקשה ל:",
    axiosInstance.defaults.baseURL + ENDPOINTS.signup
  );
  console.log("📤 נתונים שנשלחים:", Object.fromEntries(formData.entries()));

  const response = await axiosInstance.post(ENDPOINTS.signup, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("📥 תשובה מהשרת:", response.data);
  return response.data; // מחזירים את הנתונים אחרי שהתשובה מתקבלת
};

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  console.log(
    "📡 שולח בקשה ל:",
    axiosInstance.defaults.baseURL + ENDPOINTS.login
  );
  console.log("📤 נתונים שנשלחים:", Object.fromEntries(formData.entries()));
  const response = await axiosInstance.post(ENDPOINTS.login, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("***********");
  console.log(response.data);
  return response.data; // מחזירים את הנתונים אחרי שהתשובה מתקבלת
};


