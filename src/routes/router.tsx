import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from "../pages/login";
import SignUp from "../pages/signup";
import HomePage from "../pages/home";
import City from "../pages/city";
import UpdateCandidate from "../pages/updateCandidate"; 
import { PATHS } from "./path";  // אם אתה משתמש ב-PATHS לצורך ניהול הנתיבים
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import CandidateGuard from "../auth/CandidateGuard";
import  ConfirmationCandidatesList from "../pages/confirmationCandidatesList";
export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element:  <HomePage />,
  },
  {
    path: PATHS.login,
    element: <Login />,
    // element: <GuestGuard><Login /></GuestGuard>,
  },
  {
    path: PATHS.signup,
    element: <GuestGuard><SignUp /></GuestGuard>,
  },
  {
    path: PATHS.city,
    element: <AuthGuard><City /></AuthGuard>,
  },
  {
    path: "*",
    element: <Navigate to={PATHS.home} />,
  },
  {
    path: PATHS.updateCandidate, 
    element: (
      <CandidateGuard>
        <UpdateCandidate />
      </CandidateGuard>
    ),
  },
  {
    path: PATHS.getConfirmationCandidates,
    element: <ConfirmationCandidatesList />,
  },
]);
