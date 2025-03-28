import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import HomePage from "../pages/home";
import City from "../pages/city";
import Admin from "../pages/admin";
import UpdateCandidate from "../pages/updateCandidate";
import ConfirmationCandidatesList from "../pages/confirmationCandidatesList";
import { PATHS } from "./path";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import CandidateGuard from "../auth/CandidateGuard";
import MainLayout from "../layouts/MainLayout";
import UnconfirmedMatchmakersList from "../pages/unConfirmedMatchmakersList";
import UnconfirmedCandidatesList from "../pages/candidatesList";
import MatchSuggestions from "../pages/matchSuggestions";
import ProposalsPage from "../pages/ProposalsPage";
import MatchmakerHome from "../pages/matchmakerHome";
import MatchmakerHomeLayout from "../layouts/matchmakerHomeLayout"; // ✅ הייבוא של ה-layout החדש
import FAQ from "../pages/faq";
import Engaged from "../pages/engaged";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ עוטפים את כל הנתיבים ב-Layout הכללי
    children: [
      { path: PATHS.home, element: <HomePage /> },
      { path: PATHS.login, element: <Login /> },
      {
        path: PATHS.signup,
        element: (
          <GuestGuard>
            <SignUp />
          </GuestGuard>
        ),
      },
      {
        path: PATHS.city,
        element: (
          <AuthGuard>
            <City />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.engaged,
        element: (
          <AuthGuard>
            <Engaged />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.faq,
        element: (
          <AuthGuard>
            <FAQ />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.toAdmin,
        element: (
          <AuthGuard>
            <Admin />
          </AuthGuard>
        ),
      },
      { path: PATHS.updateCandidate, element: <UpdateCandidate /> },
      {
        path: PATHS.getConfirmationCandidates,
        element: <ConfirmationCandidatesList />,
      },
      { path: PATHS.proposals, element: <AuthGuard><ProposalsPage /></AuthGuard> }, // ✅ הוספת עמוד ההצעות
      { path: "*", element: <Navigate to={PATHS.home} /> },
      {
        path: PATHS.updateCandidate,
        element: (
          <CandidateGuard>
            <UpdateCandidate />
          </CandidateGuard>
        ),
      },
      {
        path: PATHS.unconfirmedMatchmakers,
        element: (
          <AuthGuard>
            <UnconfirmedMatchmakersList />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.unconfirmedCandidates,
        element: (
          <AuthGuard>
            <UnconfirmedCandidatesList />
          </AuthGuard>
        ),
      },
      {
        path: PATHS.matchSuggestions,
        element: <MatchSuggestions />,
      },
    ],
  },
  {
    path: PATHS.matchmakerHome, // נתיב לדף הבית של השדכן
    element: <MatchmakerHomeLayout />, // ה-layout החדש עם ה-sidebar
    children: [
      { path: "", element: <MatchmakerHome /> }, // העמוד הראשי של השדכן
    ],
  },
]);
