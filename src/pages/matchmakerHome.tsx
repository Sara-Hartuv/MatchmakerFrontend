import { useState, useEffect } from "react";
import MatchmakerSidebar from "../sections/matchmaker/matchmakerSidebar";
import CandidatesList from "../sections/matchmaker/candidatesList";
import MatchesList from "../sections/matchmaker/matchesList";
// import ProfileForm from "../sections/matchmaker/profileForm";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../types/user.types";

const MatchmakerHome = () => {
  const [activeTab, setActiveTab] = useState("candidates");
  const [matchmakerId, setMatchmakerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMatchmaker = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) return;
      const decodedMatchmaker: UserType | null = jwtDecode<UserType>(token);
      console.log("Decoded Matchmaker:", decodedMatchmaker);
      if (!decodedMatchmaker) return;
      console.log("Matchmaker ID:", decodedMatchmaker.id);
      setMatchmakerId(decodedMatchmaker["id"]);
    };

    fetchMatchmaker();
  }, []);

  return (
    <div className="flex">
      {/* תפריט צדדי */}
      <MatchmakerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* תוכן משתנה לפי הטאב */}
      <div className="p-4 w-full">
        {activeTab === "candidates" && <CandidatesList />}
        {activeTab === "matches" && matchmakerId && (
          <MatchesList matchmakerId={matchmakerId} />
        )}
        {/* {activeTab === "profile" && matchmakerId && <ProfileForm matchmakerId={matchmakerId} />} */}
      </div>
    </div>
  );
};

export default MatchmakerHome;
