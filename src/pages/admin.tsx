import React, { useEffect, useState } from "react";
import {
  getAllMatchmakers,
  getConfirmationMatchmakers,
  getUnConfirmationMatchmakers,
  confirmMatchmaker,
  // getMatchByIdFromMatchmaker,
} from "../services/matchmaker.service";
import {
  getAllCandidates,
  getConfirmationCandidates,
  getUnConfirmationCandidates,
  confirmCandidate,
  // getMatchByIdFromCandidate,
} from "../services/candidate.service";
import { getAllMatch } from "../services/admin.service";
import "../styles/admin.css";

// Types
interface Matchmaker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  experienceYear?: number;
  confirmation?: boolean;
}

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  sector?: string;
  subSector?: string;
  givesMoney?: boolean;
  askingMoney?: number;
  phone?: string;
  openness?: string;
  clothingStyle?: string;
  license?: boolean;
  height?: number;
  physique?: string;
  skinTone?: string;
  hairColor?: string;
  lastStudy?: string;
  studyName?: string;
  profession?: string;
  workplace?: string;
  description?: string;
  beard?: boolean;
  smoker?: boolean;
  confirmation?: boolean;
}

interface Match {
  id: string;
}

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState("allMatchmakers");
  const [data, setData] = useState<Matchmaker[] | Candidate[] | Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result: Matchmaker[] | Candidate[] | Match[] = [];
        if (activeTab === "allMatchmakers") result = await getAllMatchmakers();
        if (activeTab === "allCandidates") result = await getAllCandidates();
        if (activeTab === "unconfirmedMatchmakers") result = await getUnConfirmationMatchmakers();
        if (activeTab === "unconfirmedCandidates") result = await getUnConfirmationCandidates();
        if (activeTab === "confirmedMatchmakers") result = await getConfirmationMatchmakers();
        if (activeTab === "confirmedCandidates") result = await getConfirmationCandidates();
        if (activeTab === "matches") result = await getAllMatch();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleApprove = async (id: string, type: string) => {
    try {
      if (type === "candidates") {
        await confirmCandidate(id);
      } else if (type === "matchmakers") {
        await confirmMatchmaker(id);
      }
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const renderItemDetails = (item: any) => {
    const fieldsToExclude = [
      "id", "firstName", "lastName", "email", "confirmation",
      "sector", "subSector", "givesMoney", "askingMoney", "phone", 
      "openness", "clothingStyle", "license", "height", "physique", 
      "skinTone", "hairColor", "lastStudy", "studyName", "profession", 
      "workplace", "description", "beard", "smoker", "experienceYear"
    ];

    return Object.entries(item).map(([key, value]) => {
      if (fieldsToExclude.includes(key)) return null;
      return (
        <p key={key}><strong>{key}:</strong> {String(value)}</p>
      );
    });
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        {[
          { name: "כל השדכנים", value: "allMatchmakers" },
          { name: "כל המועמדים", value: "allCandidates" },
          { name: "מועמדים לא מאושרים", value: "unconfirmedCandidates" },
          { name: "שדכנים לא מאושרים", value: "unconfirmedMatchmakers" },
          { name: "מועמדים מאושרים", value: "confirmedCandidates" },
          { name: "שדכנים מאושרים", value: "confirmedMatchmakers" },
          { name: "הצעות", value: "matches" },
          { name: "דוחות", value: "reports", isUrl: true, url: "https://localhost:7242/" }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={activeTab === tab.value ? "active" : ""}
          >
            {tab.isUrl ? (
              <a href={tab.url} target="_blank" rel="noopener noreferrer">
                {tab.name}
              </a>
            ) : (
              tab.name
            )}
          </button>
        ))}
      </aside>

      <div className="content-wrapper">
        <h2>
          {activeTab === "allMatchmakers"
            ? "כל השדכנים"
            : activeTab === "allCandidates"
            ? "כל המועמדים"
            : activeTab === "unconfirmedMatchmakers"
            ? "שדכנים לא מאושרים"
            : activeTab === "unconfirmedCandidates"
            ? "מועמדים לא מאושרים"
            : activeTab === "confirmedMatchmakers"
            ? "שדכנים מאושרים"
            : activeTab === "confirmedCandidates"
            ? "מועמדים מאושרים"
            : activeTab === "matches"
            ? "הצעות"
            : ""}
        </h2>

        <div className="cards-container">
          {data.length > 0 ? (
            data.map((item) => (
              <div className="card" key={item.id}>
                <div className="card-details">
                  {activeTab === "unconfirmedMatchmakers" && "experienceYear" in item && (
                    <>
                      <h3>{item.firstName ? `${item.firstName} ${item.lastName}` : item.id}</h3>
                      <p><strong>Email:</strong> {item.email}</p>
                      <p><strong>Experience Year:</strong> {item.experienceYear}</p>
                    </>
                  )}

                  {activeTab === "unconfirmedCandidates" && "sector" in item && (
                    <>
                      <h3>{item.firstName ? `${item.firstName} ${item.lastName}` : item.id}</h3>
                      <p><strong>Email:</strong> {item.email}</p>
                      <p><strong>Sector:</strong> {item.sector}</p>
                      <p><strong>Sub-Sector:</strong> {item.subSector}</p>
                    </>
                  )}

                  {/* הצגת שדות משותפים */}
                  {renderItemDetails(item)}

                  {/* כפתור אישור בתחתית */}
                  { "confirmation" in item && item?.confirmation === false && (
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(item.id, activeTab === "unconfirmedCandidates" ? "candidates" : "matchmakers")}
                    >
                      ✔ אשר
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>אין נתונים להצגה</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;