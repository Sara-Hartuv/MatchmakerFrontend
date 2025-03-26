import React from "react";

interface Brother {
  id: number;
  name: string;
  placeOfStudy: string;
  gender: number;
  married: boolean;
  nameIn_laws: string;
  addressIn_laws: string;
}

interface BrothersFormProps {
  brothers: Brother[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;

}

const BrothersForm: React.FC<BrothersFormProps> = ({ brothers, setFormData }) => {
  // בדיקה אם brothers הוא מערך תקין
  if (!Array.isArray(brothers)) {
    return <p>לא נמצאו אחים</p>;
  }

  const handleBrotherChange = (index: number, field: keyof Brother, value: any) => {
    const updatedBrothers = [...brothers];
    updatedBrothers[index] = { ...updatedBrothers[index], [field]: value }; // יצירת עותק עמוק של האובייקט
    setFormData((prev: { brothers: Brother[] }) => ({ ...prev, brothers: updatedBrothers }));
  };
  return (
    <div>
      <h3>אחים</h3>
      {brothers.map((bro, index) => (
        <div key={index} className="brother-card">
          <label>שם</label>
          <input
            type="text"
            value={bro.name || ""}
            onChange={(e) => handleBrotherChange(index, "name", e.target.value)}
          />

          <label>מקום לימודים</label>
          <input
            type="text"
            value={bro.placeOfStudy || ""}
            onChange={(e) => handleBrotherChange(index, "placeOfStudy", e.target.value)}
          />

          <label>מגדר</label>
          <select
            value={bro.gender || 0}
            onChange={(e) => handleBrotherChange(index, "gender", Number(e.target.value))}
          >
            <option value={0}>זכר</option>
            <option value={1}>נקבה</option>
          </select>

          <label>נשוי</label>
          <input
            type="checkbox"
            checked={bro.married || false}
            onChange={(e) => handleBrotherChange(index, "married", e.target.checked)}
          />

          <label>שם מחותנים</label>
          <input
            type="text"
            value={bro.nameIn_laws || ""}
            onChange={(e) => handleBrotherChange(index, "nameIn_laws", e.target.value)}
          />

          <label>כתובת מחותנים</label>
          <input
            type="text"
            value={bro.addressIn_laws || ""}
            onChange={(e) => handleBrotherChange(index, "addressIn_laws", e.target.value)}
          />
        </div>
      ))}

 
    </div>
  );
};

export default BrothersForm;