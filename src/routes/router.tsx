import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from "../pages/login";
import SignUp from "../pages/signup";
import HomePage from "../pages/home";
import City from "../pages/city";
import { PATHS } from "./path";  // אם אתה משתמש ב-PATHS לצורך ניהול הנתיבים

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <HomePage />,
  },
  {
    path: PATHS.login,
    element: <Login />,
  },
  {
    path: PATHS.signup,
    element: <SignUp />,
  },
  {
    path: PATHS.city,
    element: <City />,
  },
  {
    path: "*",
    element: <Navigate to={PATHS.home} />,
  },

]);
