import { Outlet } from "react-router-dom";
import MatchmakerSidebar from "../sections/matchmaker/matchmakerSidebar"; // הייבוא של ה-Sidebar

export default function MatchmakerHomeLayout() {
  return (
    <div className="flex">
      {/* Sidebar שיתקבל רק בעמוד הבית של השדכנים */}
      <MatchmakerSidebar setActiveTab={() => {}} activeTab="candidates" />

      <div className="flex-1">
        <main className="p-6">
          {/* התוכן של הדפים השונים */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
