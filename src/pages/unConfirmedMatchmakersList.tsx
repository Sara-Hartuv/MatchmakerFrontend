import React, { useEffect, useState } from "react";
import { getAllMatchmakers, getConfirmationMatchmakers, getUnConfirmationMatchmakers, confirmMatchmaker } from "../services/matchmaker.service";
import { getAllCandidates, getConfirmationCandidates, getUnConfirmationCandidates, confirmCandidate } from "../services/candidate.service";
import { getCities, getProfessions } from "../services/admin.service";
import "../styles/admin.css";

interface Matchmaker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface City {
  id: string;
  name: string;
}

interface Profession {
  id: string;
  name: string;
}

const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState("matchmakers");
  const [matchmakers, setMatchmakers] = useState<Matchmaker[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [approvedMatchmakers, setApprovedMatchmakers] = useState<Matchmaker[]>([]);
  const [approvedCandidates, setApprovedCandidates] = useState<Candidate[]>([]);
  const [pendingMatchmakers, setPendingMatchmakers] = useState<Matchmaker[]>([]);
  const [pendingCandidates, setPendingCandidates] = useState<Candidate[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "matchmakers") setMatchmakers(await getAllMatchmakers());
      if (activeTab === "candidates") setCandidates(await getAllCandidates());
      if (activeTab === "approvedMatchmakers") setApprovedMatchmakers(await getConfirmationMatchmakers());
      if (activeTab === "approvedCandidates") setApprovedCandidates(await getConfirmationCandidates());
      if (activeTab === "pendingMatchmakers") setPendingMatchmakers(await getUnConfirmationMatchmakers());
      if (activeTab === "pendingCandidates") setPendingCandidates(await getUnConfirmationCandidates());
      if (activeTab === "Cities") setCities(await getCities());
      if (activeTab === "Professions") setProfessions(await getProfessions());
    };
    fetchData();
  }, [activeTab]);

  const handleApprove = async (id: string | number, type: "candidate" | "matchmaker") => {
    const numericId = String(id);
    if (type === "candidate") {
      await confirmCandidate(numericId);
      setPendingCandidates(pendingCandidates.filter((c) => String(c.id) !== numericId));
    } else {
      await confirmMatchmaker(numericId);
      setPendingMatchmakers(pendingMatchmakers.filter((m) => String(m.id) !== numericId));
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <nav>
          {[{ label: "שדכנים", value: "matchmakers" }, { label: "מועמדים", value: "candidates" }, { label: "שדכנים מאושרים", value: "approvedMatchmakers" }, { label: "מועמדים מאושרים", value: "approvedCandidates" }, { label: "שדכנים ממתינים", value: "pendingMatchmakers" }, { label: "מועמדים ממתינים", value: "pendingCandidates" }, { label: "ערים", value: "Cities" }, { label: "מקצועות", value: "Professions" }].map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`sidebar-button ${activeTab === tab.value ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="content-wrapper">
        <div className="content-centered">
          {[matchmakers, candidates, approvedMatchmakers, approvedCandidates, pendingMatchmakers, pendingCandidates].map((list, idx) => (
            activeTab === ["matchmakers", "candidates", "approvedMatchmakers", "approvedCandidates", "pendingMatchmakers", "pendingCandidates"][idx] && (
              <div className="card centered" key={idx}>
                <h2>{activeTab}</h2>
                <ul>
                  {list.map((item: any) => (
                    <li key={item.id} className="card-item">
                      {item.firstName} {item.lastName} - {item.email}
                      {activeTab.includes("pending") && <button onClick={() => handleApprove(item.id, "candidate")}>✔ אשר</button>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
