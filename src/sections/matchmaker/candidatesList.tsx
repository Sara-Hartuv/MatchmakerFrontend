import { useEffect, useState } from "react";
import { getConfirmationCandidates } from "../../services/candidate.service";
import { CandidateType } from "../../types/candidate.types";

const CandidatesList = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);

  useEffect(() => {
    getConfirmationCandidates().then(setCandidates);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">רשימת מועמדים</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id} className="border p-2 mb-2">
            {candidate.firstName} {candidate.lastName} - {candidate.email} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
// לבדוק איך מחזירים את הנתונים הללו כמו מהשרת
