import React, { useState } from "react";
import "../styles/ProposalsPage.css";

interface Candidate {
  id: number;
  name: string;
  age: number;
  education: string;
  city: string;
  hobbies: string;
  description: string;
}

interface Proposal {
  id: number;
  candidate: Candidate;
  match: Candidate;
}

const ProposalsPage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      candidate: {
        id: 1,
        name: "יוסי כהן",
        age: 28,
        education: "אוניברסיטת תל אביב",
        city: "תל אביב",
        hobbies: "קריאה, ספורט",
        description: "אוהב לטייל וללמוד דברים חדשים.",
      },
      match: {
        id: 2,
        name: "רונית לוי",
        age: 26,
        education: "אוניברסיטת חיפה",
        city: "חיפה",
        hobbies: "מוזיקה, בישול",
        description: "מחפשת שותף לחיים שאוהב הרפתקאות.",
      },
    },
    // ניתן להוסיף עוד הצעות כאן
  ]);

  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );

  const handleCardClick = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  const handleCloseDetails = () => {
    setSelectedProposal(null);
  };

  return (
    <div className="proposals-container">
      <h2>הצעות למשתמש</h2>
      <div className="proposals-grid">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="proposal-card"
            onClick={() => handleCardClick(proposal)}
          >
            <div className="candidate-info">
              <h3>{proposal.candidate.name}</h3>
              <p>גיל: {proposal.candidate.age}</p>
              <p>לימודים: {proposal.candidate.education}</p>
            </div>
            <div className="match-info">
              <h3>{proposal.match.name}</h3>
              <p>גיל: {proposal.match.age}</p>
              <p>לימודים: {proposal.match.education}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProposal && (
        <div className="proposal-details">
          <button className="close-button" onClick={handleCloseDetails}>
            סגור
          </button>
          <h3>פרטי מועמד</h3>
          <p>שם: {selectedProposal.candidate.name}</p>
          <p>גיל: {selectedProposal.candidate.age}</p>
          <p>עיר: {selectedProposal.candidate.city}</p>
          <p>תחביבים: {selectedProposal.candidate.hobbies}</p>
          <p>תיאור: {selectedProposal.candidate.description}</p>

          <h3>פרטי מועמדת</h3>
          <p>שם: {selectedProposal.match.name}</p>
          <p>גיל: {selectedProposal.match.age}</p>
          <p>עיר: {selectedProposal.match.city}</p>
          <p>תחביבים: {selectedProposal.match.hobbies}</p>
          <p>תיאור: {selectedProposal.match.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;