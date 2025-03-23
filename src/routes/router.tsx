import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import HomePage from "../pages/home";
import City from "../pages/city";
import UpdateCandidate from "../pages/updateCandidate";
import ConfirmationCandidatesList from "../pages/confirmationCandidatesList";
import { PATHS } from "./path";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import CandidateGuard from "../auth/CandidateGuard";
import MainLayout from "../layouts/MainLayout"; // ✅ ייבוא ה-Layout
import ProposalsPage from "../pages/ProposalsPage"; // ✅ ייבוא העמוד החדש
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ עוטפים את כל הנתיבים ב-Layout
    children: [
      { path: PATHS.home, element: <HomePage /> },
      { path: PATHS.login, element: <Login /> },
      { path: PATHS.signup, element: <GuestGuard><SignUp /></GuestGuard> },
      { path: PATHS.city, element: <AuthGuard><City /></AuthGuard> },
      { path: PATHS.updateCandidate, element: <UpdateCandidate /> },
      { path: PATHS.getConfirmationCandidates, element: <ConfirmationCandidatesList /> },
      { path: PATHS.proposals, element: <AuthGuard><ProposalsPage /></AuthGuard> }, // ✅ הוספת עמוד ההצעות
      { path: "*", element: <Navigate to={PATHS.home} /> },
    ],
  },
]);
