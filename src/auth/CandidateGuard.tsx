import { ReactNode } from "react";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selectors";
import { Navigate } from "react-router-dom";
import { PATHS } from "../routes/path";
import { jwtDecode } from "jwt-decode";

type Props = {
    children: ReactNode;
};

export default function CandidateGuard({ children }: Props) {
    const storedUser = localStorage.getItem('user');
    const { isAuthenticated, isInitialized, user} = useAppSelector(selectAuth);
    
    if (!isInitialized) {
        return <div>Loading...</div>;
    }
    if (storedUser) {
        const decodedUser = jwtDecode(storedUser);
        console.log(decodedUser);
        console.log(isAuthenticated);
        // if (!isAuthenticated || decodedUser !== "candidate") {
        //     return <Navigate to={PATHS.home} />;
        //  }
    }
    console.log("User from Redux:", user);


//   if (!isAuthenticated || user?.role !== "candidate") {
//      return <Navigate to={PATHS.home} />;
//   }

    return <>{children}</>;
}
