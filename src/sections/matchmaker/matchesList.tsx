import { useEffect, useState } from "react";
import { GetMatchesByIdMatchmaker } from "../../services/match.Service";
import { getCandidateById } from "../../services/candidate.service"; // לדוגמה
import { MatchType } from "../../types/match.types"; 
import { CandidateType } from "../../types/candidate.types";

type MatchesListProps = {
    matchmakerId: number;
};

const MatchesList: React.FC<MatchesListProps> = ({ matchmakerId }) => {
  console.log(matchmakerId);
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [candidates, setCandidates] = useState<{ [key: number]: CandidateType }>({}); // למפות את השמות לפי ID

  useEffect(() => {
    // קבלת רשימת השידוכים
    GetMatchesByIdMatchmaker(matchmakerId).then((data) => {
      setMatches(data);

      // קבלת השמות של המועמדים לפי ה-ID
      const candidateIds = new Set<number>();
      data.forEach((match: MatchType) => {
        candidateIds.add(match.idCandidateGirl);
        candidateIds.add(match.idCandidateGuy);
      });

      // קריאה ל-API כדי לקבל את השמות של המועמדים
      Promise.all(
        Array.from(candidateIds).map((id) =>
          getCandidateById(id).then((candidate) => ({
            id,
            firstName: candidate.firstName ,
            lastName: candidate.lastName,
            city : candidate.city,
            email : candidate.email
          }))
        )
      ).then((candidatesData) => {
        const candidateMap = candidatesData.reduce((map, candidate) => {
          map[candidate.id] = { id:candidate.id, firstName: candidate.firstName, lastName: candidate.lastName, city: candidate.city, email: candidate.email };
          return map;
        }, {} as { [key: number]: CandidateType });
        setCandidates(candidateMap);
      });
    });
  }, [matchmakerId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">השידוכים שלי</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id} className="border p-2 mb-2">
            <div>
              <strong>מועמדת:</strong> {candidates[match.idCandidateGirl]?.firstName} {candidates[match.idCandidateGirl]?.lastName}
            </div>
            <div>
              <strong>מועמד:</strong> {candidates[match.idCandidateGuy]?.firstName} {candidates[match.idCandidateGuy]?.lastName}
            </div>
            <div>
              <strong>תאריך השידוך:</strong> {new Date(match.dateMatch).toLocaleDateString()}
            </div>
            <div>
              <strong>סטטוס:</strong> {match.status ? "מאושר" : "ממתין"}
            </div>
            <div>
              <strong>מעורבות:</strong> {match.isEngaged ? "מעורב" : "לא מעורב"}
            </div>
            <div>
              <strong>אישור המועמד:</strong> {match.confirmationGuy ? "מאושר" : "ממתין"}
            </div>
            <div>
              <strong>אישור המועמדת:</strong> {match.confirmationGirl ? "מאושר" : "ממתין"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesList;
