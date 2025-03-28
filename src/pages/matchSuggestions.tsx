import React, { useEffect, useState } from 'react';
import { getMatchSuggestions } from '../services/match.Service'; // שירות לשליפת הצעות שידוך

interface MatchSuggestion {
  candidateId: number;
  matchmakerId: number;
  matchDetails: string;
}

const MatchSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<MatchSuggestion[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMatchSuggestions = async () => {
      try {
        const data = await getMatchSuggestions(); // קריאה לשירות לשליפת הצעות
        setSuggestions(data);
      } catch (error) {
        setError('שגיאה בטעינת הצעות השידוך. נסה שוב מאוחר יותר.');
      }
    };

    fetchMatchSuggestions();
  }, []);

  const handleMakeMatch = async (candidateId: number, matchmakerId: number) => {
    try {
      // קריאה לשירות להציע שידוך
      // יש להוסיף פעולה בשירות שיתקשר לשרת ויבצע את פעולת השידוך
    } catch (error) {
      setError('שגיאה בהצעת השידוך.');
    }
  };

  return (
    <div>
      <h2>הצעות שידוך</h2>
      {error && <p>{error}</p>}
      {suggestions.length > 0 ? (
        <div>
          {suggestions.map((suggestion) => (
            <div key={`${suggestion.candidateId}-${suggestion.matchmakerId}`} className="match-suggestion-card">
              <p>מועמד: {suggestion.candidateId}, שדכן: {suggestion.matchmakerId}</p>
              <p>פרטי השידוך: {suggestion.matchDetails}</p>
              <button onClick={() => handleMakeMatch(suggestion.candidateId, suggestion.matchmakerId)}>
                הצע שידוך
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>לא נמצאו הצעות שידוך</p>
      )}
    </div>
  );
};

export default MatchSuggestions;
