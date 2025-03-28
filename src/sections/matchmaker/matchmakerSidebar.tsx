import { useEffect, useState } from "react";
import { jwtDecode } from "../../auth/auth.utils";
import { getCandidateById } from "../../services/candidate.service";
import { getMatchmakerById } from "../../services/matchmaker.service";
import { useAppSelector } from "../../redux/store";
import { UserType } from "../../types/user.types";
import "../../styles/matchmakerSidebar.css";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MatchmakerSidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  console.log("Active Tab:", activeTab);
  const token = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    if (!token) return;
    const decodedUser: UserType | null = jwtDecode<UserType>(token);
    if (!decodedUser) return;

    const fetchUser = async () => {
      try {
        let userData = null;
        if (decodedUser.role === "candidate") {
          userData = await getCandidateById(decodedUser.id);
        } else if (decodedUser.role === "matchmaker") {
          userData = await getMatchmakerById(decodedUser.id);
        }
        if (userData) {
          setUser({ firstName: userData.firstName, lastName: userData.lastName });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-6 shadow-lg rounded-lg">
      {/* תמונת פרופיל מעגלית */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : "?"}
        </div>
      </div>

      {/* תפריט ניווט */}
      <button
        className={`p-3 my-2 rounded-lg w-full text-left transition duration-300 hover:bg-purple-500 ${
          activeTab === "candidates" ? "bg-purple-600" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("candidates")}
      >
        מועמדים
      </button>
      <button
        className={`p-3 my-2 rounded-lg w-full text-left transition duration-300 hover:bg-purple-500 ${
          activeTab === "matches" ? "bg-purple-600" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("matches")}
      >
        שידוכים שיצרתי
      </button>
      <button
        className={`p-3 my-2 rounded-lg w-full text-left transition duration-300 hover:bg-purple-500 ${
          activeTab === "profile" ? "bg-purple-600" : "bg-transparent"
        }`}
        onClick={() => setActiveTab("profile")}
      >
        הפרופיל שלי
      </button>

      {/* כפתור יציאה */}
      <button className="mt-auto bg-red-600 p-3 rounded-lg w-full text-left transition duration-300 hover:bg-red-700">
        יציאה
      </button>
    </div>
  );
};

export default MatchmakerSidebar;
