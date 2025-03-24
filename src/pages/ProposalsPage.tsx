import React, { useEffect, useState } from "react";
import "../styles/ProposalsPage.css";
import { getUserIdFromToken, getSession } from "../auth/auth.utils";
import { getAllMyMatch } from "../services/candidate.service";

interface Candidate {
  id: number;
  name: string;
  age: number;
  city: string;
  sector: string;
  subSector: string;
  givesMoney: number;
  askingMoney: number;
  cellPhone: string;
  openness: string;
  clothingStyle: string;
  license: boolean;
  height: number;
  physique: string;
  skinTone: string;
  hairColor: string;
  lastStudy: string;
  studyName: string;
  profession: string;
  workplace: string;
  description: string;
  headCovering: string;
  hat: string;
  suit: string;
  beard: boolean;
  smoker: boolean;
  familyStyle: string;
  parentalStatus: string;
  familyOpenness: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  nameFromHome: string;
  brothers: string[];
  descriptionFind: string;
  inquiries: string[];
  image?: string;
  status: boolean;
}

const ProposalsPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  // שליפת המועמדים מהשרת
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const id= getUserIdFromToken();
        if (!id) {
          throw new Error("User ID not found in token");}
        const response = await getAllMyMatch(id)
        const data: string[] = response.data;
        const parsedCandidates = data.map((candidateString: string) =>
          parseCandidateFromString(candidateString)
        );
        setCandidates(parsedCandidates);

      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("שגיאה בטעינת המועמדים. נסה שוב מאוחר יותר.");
      }
    };

    fetchCandidates();
  }, []);

  const handleCardClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseDetails = () => {
    setSelectedCandidate(null);
  };


  const parseCandidateFromString = (candidateString: string): Candidate => {
    const candidate: Partial<Candidate> = {}; // אובייקט חלקי שנמלא בהמשך
  
    const lines = candidateString.split("\n"); // פיצול המחרוזת לשורות
    lines.forEach((line) => {
      const [key, value] = line.split(":").map((part) => part.trim()); // פיצול לפי נקודתיים
  
      switch (key) {
        case "גיל":
          candidate.age = parseInt(value);
          break;
        case "עיר":
          candidate.city = value;
          break;
        case "מגזר":
          candidate.sector = value;
          break;
        case "תת מגזר":
          candidate.subSector = value;
          break;
        case "פתיחות":
          candidate.openness = value;
          break;
        case "סגנון לבוש":
          candidate.clothingStyle = value;
          break;
        case "רישיון נהיגה":
          candidate.license = value === "כן";
          break;
        case "סוג טלפון":
          candidate.cellPhone = value;
          break;
        case "גובה":
          candidate.height = parseFloat(value.replace("סמ", "").trim());
          break;
        case "מבנה":
          candidate.physique = value;
          break;
        case "צבע עור":
          candidate.skinTone = value;
          break;
        case "צבע שיער":
          candidate.hairColor = value;
          break;
        case "סוג לימודים אחרון":
          candidate.lastStudy = value;
          break;
        case "שם מוסד לימודים":
          candidate.studyName = value;
          break;
        case "מקצוע":
          candidate.profession = value;
          break;
        case "מקום עבודה":
          candidate.workplace = value;
          break;
        case "כיסוי ראש":
          candidate.headCovering = value;
          break;
        case "כובע":
          candidate.hat = value;
          break;
        case "חליפה":
          candidate.suit = value;
          break;
        case "זקן":
          candidate.beard = value === "כן";
          break;
        case "מעשן":
          candidate.smoker = value === "כן";
          break;
        case "סגנון משפחתי":
          candidate.familyStyle = value;
          break;
        case "מצב הורים":
          candidate.parentalStatus = value;
          break;
        case "שם האב":
          candidate.fatherName = value;
          break;
        case "עיסוק האב":
          candidate.fatherOccupation = value;
          break;
        case "שם האם":
          candidate.motherName = value;
          break;
        case "עיסוק האם":
          candidate.motherOccupation = value;
          break;
        case "פתיחות משפחתית":
          candidate.familyOpenness = value;
          break;
        default:
          break;
      }
    });
  
    return candidate as Candidate; // המרה לאובייקט Candidate מלא
  };

  return (
    <div className="proposals-container">
      <h2>מועמדים</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="proposals-grid">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="proposal-card"
            onClick={() => handleCardClick(candidate)}
          >
            <h3>{candidate.name}</h3>
            <p>גיל: {candidate.age}</p>
            <p>מגזר: {candidate.sector}</p>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <div className="proposal-details">
          <button className="close-button" onClick={handleCloseDetails}>
            סגור
          </button>
          <h3>פרטי מועמד</h3>
          <p>שם: {selectedCandidate.name}</p>
          <p>גיל: {selectedCandidate.age}</p>
          <p>מגזר: {selectedCandidate.sector}</p>
          <p>תת מגזר: {selectedCandidate.subSector}</p>
          <p>גובה: {selectedCandidate.height} ס"מ</p>
          <p>סגנון לבוש: {selectedCandidate.clothingStyle}</p>
          <p>צבע עור: {selectedCandidate.skinTone}</p>
          <p>צבע שיער: {selectedCandidate.hairColor}</p>
          <p>מקום לימודים: {selectedCandidate.studyName}</p>
          <p>מקצוע: {selectedCandidate.profession}</p>
          <p>מקום עבודה: {selectedCandidate.workplace}</p>
          <p>תיאור: {selectedCandidate.description}</p>
          <p>מצב משפחתי: {selectedCandidate.familyStyle}</p>
          <p>מצב הורים: {selectedCandidate.parentalStatus}</p>
          <p>שם האב: {selectedCandidate.fatherName}</p>
          <p>עיסוק האב: {selectedCandidate.fatherOccupation}</p>
          <p>שם האם: {selectedCandidate.motherName}</p>
          <p>עיסוק האם: {selectedCandidate.motherOccupation}</p>
          <p>אחים: {selectedCandidate.brothers?.join(", ") || "לא צוינו אחים"}</p>
          <p>בירורים: {selectedCandidate.inquiries?.join(", ") || "לא צוינו בירורים"}</p>
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;