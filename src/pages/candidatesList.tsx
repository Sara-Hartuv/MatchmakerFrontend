import React, { useEffect, useState } from "react";
import { getUnConfirmationCandidates, confirmCandidate, removeCandidate } from "../services/getUnapprovedCandidates";
import "../styles/getCandidates.css";

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  gender: number;
  numId: string;
  age: number;
  city: string;
  description: string;
  profileImage: string;
  isConfirmed: boolean; // שדה חדש לציון אם המועמד מאושר או לא
}

const UnconfirmedCandidatesList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string>("");
  const [filterConfirmed, setFilterConfirmed] = useState<boolean>(false); // לניהול הסינון

  // שליפת כל המועמדים
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getUnConfirmationCandidates();
        setCandidates(data);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים. נסה שוב מאוחר יותר.");
      }
    };
    fetchCandidates();
  }, []);

  const handleConfirm = async (id: number) => {
    try {
      await confirmCandidate(id);
      // עדכון המועמדים לאחר אישור
      const updatedCandidates = candidates.map(candidate =>
        candidate.id === id ? { ...candidate, isConfirmed: true } : candidate
      );
      setCandidates(updatedCandidates);
    } catch (err) {
      setError("שגיאה באישור המועמד.");
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await removeCandidate(id);
      // הסרת המועמד
      const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
      setCandidates(updatedCandidates);
    } catch (err) {
      setError("שגיאה בהסרת המועמד.");
    }
  };

  const toggleFilter = () => {
    setFilterConfirmed(!filterConfirmed);
  };

  const filteredCandidates = candidates.filter(candidate =>
    filterConfirmed ? candidate.isConfirmed : !candidate.isConfirmed
  );

  return (
    <div className="candidates-container">
      <h2>רשימת מועמדים</h2>
      {error && <p className="error">{error}</p>}
      <div className="filter-buttons">
        <button onClick={toggleFilter}>
          {filterConfirmed ? "הצג מועמדים לא מאושרים" : "הצג מועמדים מאושרים"}
        </button>
      </div>
      <div className="cards-wrapper">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <img src={candidate.profileImage} alt={candidate.firstName} className="profile-image" />
            <h3>{candidate.firstName} {candidate.lastName}, {candidate.age}</h3>
            <p>עיר: {candidate.city}</p>
            <p>תיאור: {candidate.description}</p>
            {candidate.isConfirmed ? (
              <button onClick={() => handleRemove(candidate.id)} className="remove-button">
                הסרת מועמד
              </button>
            ) : (
              <button onClick={() => handleConfirm(candidate.id)} className="confirm-button">
                אישור מועמד
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnconfirmedCandidatesList;
