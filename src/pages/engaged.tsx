import React, { useEffect, useState } from "react";
import { getCandidateById } from "../services/candidate.service";
import { GetAllMatchEngaged } from "../services/match.Service";
import { EngagedType } from "../types/engaged.types";
import { CandidateType } from "../types/candidate.types";
import "../styles/engaged.css"; 

const EngagedPage = () => {
  const [engagedList, setEngagedList] = useState<EngagedType[]>([]);
  const [candidates, setCandidates] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchEngagedList();
  }, []);

  const fetchEngagedList = async () => {
    try {
      const data = await GetAllMatchEngaged();
      setEngagedList(data);
      await fetchCandidateNames(data);
    } catch (error) {
      console.error("Error fetching engaged list:", error);
    }
  };

  const fetchCandidateNames = async (engagedList: EngagedType[]) => {
    const candidateIds = new Set<number>(
      engagedList.flatMap(({ IdCandidateGirl, IdCandidateGuy }) => [IdCandidateGirl, IdCandidateGuy])
    );

    const namesMap: Record<number, string> = {};
    await Promise.all(
      Array.from(candidateIds).map(async (id) => {
        try {
          const candidate: CandidateType = await getCandidateById(id);
          namesMap[id] = candidate.firstName+" "+candidate.lastName;
        } catch (error) {
          console.error("Error fetching candidate name:", error);
          namesMap[id] = "לא נמצא";
        }
      })
    );

    setCandidates(namesMap);
  };

  return (
    <div className="engaged-container">
      <h1 className="engaged-title">התארסתם?</h1>
      <div className="engaged-tabs">
        <button className="tab active">כל המאורסים</button>
        <button className="tab">מהשטח</button>
      </div>
      <div className="cards-container">
        {engagedList.map((engaged) => (
          <div key={engaged.Id} className="engaged-card">
            <div className="card-content">
              <h3 className="engaged-names">
                <span className="girl-name">{candidates[engaged.IdCandidateGirl] || "טוען..."}</span>
                & 
                <span className="guy-name">{candidates[engaged.IdCandidateGuy] || "טוען..."}</span>
              </h3>
              <p className="engaged-location">אור לכ"ג אדר התשפ"ה</p>
              <p className="engaged-status">מאורסים</p>
              <button className="engaged-highlight">מהשבוע האחרון</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagedPage;
