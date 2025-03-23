import React, { useEffect, useState } from "react";
import { getConfirmationCandidates } from "../services/matchmaker.service";
import "../styles/getCandidates.css";

interface Candidate {
    id: number;
    firstName: string;
    lastName: string;
    gender: number;
    age: number;
    city: string;
    adress: string;
    sector: number;
    subSector: number;
    givesMoney: number;
    askingMoney: number;
    cellPhone: number;
    openness: number;
    clothingStyle: number;
    license: boolean;
    height: number;
    physique: number;
    skinTone: number;
    haircolor: number;
    lastStudy: number;
    studyName: string;
    workPlace: string;
    description: string;
    headCovering: number;
    hat: number;
    suit: number;
    beard: boolean;
    smoker: boolean;
    familyStyle: number;
    parentalStatus: number;
    familyOpness: number;
    fatherName: string;
    fatherOccupation: string;
    motherName: string; 
    nameFromHome: string;
    motherOccupation: string;
    descriptionFind: string;
    imageUrl: string;
}

const ConfirmationCandidatesList: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getConfirmationCandidates();
                console.log("נתונים מהשרת:", data);
                setCandidates(data);
            } catch (err) {
                setError("שגיאה בטעינת הנתונים. נסה שוב מאוחר יותר.");
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div className="candidates-container">
            <h2>רשימת מועמדים מאושרים</h2>
            {error && <p className="error">{error}</p>}
            <div className="cards-wrapper">
                {candidates.map(candidate => (
                    <div key={candidate.id} className="candidate-card">
                        <img src={candidate.imageUrl} alt={candidate.firstName} className="profile-image" onError={(e) => console.error("בעיה בטעינת התמונה:", e)} />
                        <h3>{candidate.firstName}, {candidate.lastName}</h3>
                        <p> {candidate.gender}</p>
                        <p>גיל : {candidate.age}</p>
                        <p>עיר :{candidate.city}</p>
                        <p>כתובת :{candidate.adress}</p>
                        <p>מגזר :{candidate.sector}</p>
                        <p>תת מגזר :{candidate.subSector}</p>
                        <p>נותנים :{candidate.givesMoney}</p>
                        <p>דורשים :{candidate.askingMoney}</p>
                        <p>סוג פלאפון :{candidate.cellPhone}</p>
                        <p>פתיחות :{candidate.openness}</p>
                        <p>סגנון לבוש :{candidate.clothingStyle}</p>
                        <p>רשיון :{candidate.license}</p>
                        <p>גובה :{candidate.height}</p>
                        <p>מבנה גוף :{candidate.physique}</p>
                        <p>צבע עור :{candidate.skinTone}</p>
                        <p>צבע שיער :{candidate.haircolor}</p>
                        <p>מקום לימודים אחרון :{candidate.lastStudy}</p>
                        <p>שם מקום הלימודים :{candidate.studyName}</p>
                        <p>מקום עבודה :{candidate.workPlace}</p>
                        <p>תיאור :{candidate.description}</p>
                        <p>כיסוי ראש :{candidate.headCovering}</p>
                        <p>כובע :{candidate.hat}</p>
                        <p>חליפה :{candidate.suit}</p>
                        <p>זקן :{candidate.beard}</p>
                        <p>מעשן :{candidate.smoker}</p>
                        <p>סגנון משפחה :{candidate.familyStyle}</p>
                        <p>מצב הורים :{candidate.parentalStatus}</p>
                        <p>פתיחות משפחתית :{candidate.familyOpness}</p>
                        <p>שם האב :{candidate.fatherName}</p>
                        <p>עיסוק האב :{candidate.fatherOccupation}</p>
                        <p>שם האם :{candidate.motherName}</p>
                        <p>שם האמא מהבית :{candidate.nameFromHome}</p>
                        <p>עיסוק האם :{candidate.motherOccupation}</p>
                        <p>מה מחפש/ת? :{candidate.descriptionFind}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConfirmationCandidatesList;
