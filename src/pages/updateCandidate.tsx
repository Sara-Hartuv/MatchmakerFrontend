import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/updateCandidate.css";
import { getCandidateById, updateCandidate } from "../services/candidate.service"; 
import { getUserIdFromToken } from "../auth/auth.utils";

const UpdateCandidate: React.FC = () => {
  const navigate = useNavigate();

  const userId = getUserIdFromToken();
  console.log(userId);

  // מצב (state) של הנתונים
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    sector: "",
    subSector: "",
    givesMoney: 0,
    askingMoney: 0,
    cellPhone: "",
    openness: "",
    clothingStyle: "",
    license: false,
    height: 0,
    physique: "",
    skinTone: "",
    hairColor: "",
    lastStudy: "",
    studyName: "",
    workplace: "",
    description: "",
    headCovering: "",
    hat: "",
    suit: "",
    beard: false,
    smoker: false,
    familyStyle: "",
    parentalStatus: "",
    familyOpenness: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    nameFromHome: "",
    motherOccupation: "",
    brothers: [],
    descriptionFind: "",
    inquiries: [],
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // שליפת הנתונים מהשרת בעת טעינת העמוד
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        if (!userId) {
          throw new Error("לא ניתן לזהות משתמש");
        }
        const candidateData = await getCandidateById(Number(userId) ); // קריאה לשרת עם ה-ID מהטוקן
        setFormData(candidateData);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים. נסה שוב מאוחר יותר.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCandidate();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    setFormData({
      ...formData,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value
    });
  };
  
  

  // שליחת הטופס לעדכון הנתונים
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!userId) {
        throw new Error("לא ניתן לזהות משתמש");
      }
      await updateCandidate(Number(userId), formData); // שליחת עדכון לשרת עם ה-ID מהטוקן
      console.log("Candidate updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  // אם הנתונים עדיין נטענים
  if (loading) {
    return <div>טוען נתונים...</div>;
  }

  // אם הייתה שגיאה בטעינה
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="update-candidate-container">
      <div className="update-candidate-card">
        <h2>עדכון פרטי מועמד</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <label>אימייל</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>סיסמה</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>מגזר</label>
          <select name="sector" value={formData.sector} onChange={handleChange} required>
            <option value="">בחר מגזר</option>
            <option value="ליטאי">ליטאי</option>
            <option value="חסידי">חסידי</option>
            <option value="ספרדי">ספרדי</option>
            <option value="תימני">תימני</option>
            <option value="חבד">חבד</option>
            <option value="חצי_חצי">חצי חצי</option>
            <option value="אחר">אחר</option>
          </select>



          <label>גובה</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} />

          <label>סגנון לבוש</label>
          <input type="text" name="clothingStyle" value={formData.clothingStyle} onChange={handleChange} />

          <label>מעשן?</label>
          <input type="checkbox" name="smoker" checked={formData.smoker} onChange={handleChange} />

          <button type="submit">עדכן</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCandidate;
