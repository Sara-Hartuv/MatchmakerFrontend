import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/updateCandidate.css";
import { getCandidateById, updateCandidate } from "../services/candidate.service";
import { getUserIdFromToken } from "../auth/auth.utils";
import { getCities } from "../services/city.service";
import { getBrothers } from "../services/brothers.service";
import { addBrother } from "../services/brothers.service";
import { getInquiries } from "../services/Inquiries.service";
import { addInquiry } from "../services/Inquiries.service";
import { getProfessions } from "../services/profession.service";
import BrothersForm from "../components/brotherForm";
import { set } from "react-hook-form";
const UpdateCandidate: React.FC = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromToken();
  const [professions, setProfessions] = useState<{ id: number; name: string }[]>([]);

  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    numId: "",
    bornDate: "",
    phone: "",
    email: "",
    password: "",
    city: { id: 0, name: "" },
    adress: "",
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
    profession: { id: 0, name: "" },
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
    motherOccupation: "",
    nameFromHome: "",
    brothers: [] as { id: number; name: string; placeOfStudy: string; gender: number; married: boolean; nameIn_laws: string; addressIn_laws: string }[],
    descriptionFind: "",
    inquiries: [] as { id: number; name: string; phone: string; type: number }[],
    image: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]); // רשימת ערים
  
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        if (!userId) {
          throw new Error("לא ניתן לזהות משתמש");
        }
        const candidateData = await getCandidateById(Number(userId));
        setFormData(candidateData);
        console.log("Candidate Data:", candidateData);  
      } catch (err) {
        setError("שגיאה בטעינת הנתונים. נסה שוב מאוחר יותר.");
      } finally {
        setLoading(false);
      }
    };
    const fetchCities = async () => {
      try {
        const citiesData = await getCities(); // שליפת ערים מה-SQL
        console.log("Cities Data:", citiesData); // בדוק את הנתונים בקונסול
        setCities(citiesData);
      } catch (err) {
        console.error("שגיאה בטעינת רשימת הערים:", err);
      }
    };

    const fetchProfessions = async () => {
      try {
        const professionsData = await getProfessions();
        console.log("Professions Data:", professionsData); // בדוק את הנתונים בקונסול
        setProfessions(professionsData);
      } catch (err) {
        console.error("שגיאה בטעינת רשימת המקצועות:", err);
      }
    };
  
    const fetchBrothers = async () => {
      try {
        const userId = getUserIdFromToken(); // שליפת ה-id מהטוקן
        if (!userId) {
          throw new Error("לא ניתן לזהות משתמש");
        }
        const brothersData = await getBrothers(userId); // קריאה ל-API עם userId
        //setBrothers(brothersData);
        setFormData((prev) => ({ ...prev, brothers: brothersData || []}));
        console.log("רשימת האחים:", brothersData);
      } catch (error) {
        console.log("שגיאה בטעינת רשימת האחים:", error);
      }
    };
    
    const fetchInquiries = async () => {
      try {
        if(!userId) {
          throw new Error("לא ניתן לזהות משתמש");
        }
        const inquiries = await getInquiries(userId);
       // setInquiries(inquiries);
      setFormData((prev) => ({ ...prev, inquiries: inquiries || []}));  
        console.log("רשימת הבירורים:", inquiries);
      } catch (error) {
        console.log("שגיאה בטעינת רשימת הבירורים:", error);
      }
    };
    
    if (userId) {
      fetchCandidate();
    }
    fetchCities(); // קריאה לפונקציה fetchCities
    fetchBrothers();
    fetchInquiries();
  fetchProfessions();
  }, [userId]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name.startsWith("city.")) {
      // טיפול בשדות של city
      const cityField = name.split(".")[1];
      setFormData({
        ...formData,
        city: { ...formData.city, [cityField]: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
      });
    }
  };
  const handleCityChange = (cityId: number, cityName: string) => {
    setFormData({
      ...formData,
      city: { id: cityId, name: cityName },
    });
  };

  const handleProfessionChange = (professionId: number, professionName: string) => {
    setFormData({
      ...formData,
      profession: { id: professionId, name: professionName },
    });
  };

  const addNewBrother = () => {
    const newBrother = {
      id: 0, // מזהה ייווצר בשרת
      name: "",
      placeOfStudy: "",
      gender: 0,
      married: false,
      nameIn_laws: "",
      addressIn_laws: "",
    };
    setFormData((prev) => ({
      ...prev,
      brothers: [...prev.brothers, newBrother],
    }));
  };

  const addNewInquiry = () => {
    const newInquiry = {
      id: 0, // מזהה ייווצר בשרת
      name: "",
      phone: "",
      type: 0, // ברירת מחדל: מחותנים
    };
    setFormData((prev) => ({
      ...prev,
      inquiries: [...prev.inquiries, newInquiry],
    }));
  };

  const removeInquiry = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((_, i) => i !== index),
    }));
  };
  const handleSaveInquiries = async () => {
    try {
      // מערך לעדכון הבירורים שנשמרו
      const updatedInquiries: { id: number; name: string; phone: string; type: number }[] = [];
  
      // מעבר על כל הבירורים בטופס
      for (const inquiry of formData.inquiries) {
        const inquiryData = {
          id: inquiry.id , // מזהה ייחודי, אם קיים
          name: inquiry.name,
          phone: inquiry.phone,
          type: inquiry.type,
        };
  
        try {
          // שליחת הבירור לשרת
          const savedInquiry = await addInquiry(inquiryData);
          updatedInquiries.push(savedInquiry); // שמירת הבירור עם ה-id שנוצר בשרת
        } catch (error) {
          console.log(`שגיאה בשמירת הבירור: ${inquiry.name}`, error);
        }
      }
  
      // עדכון ה-state עם הבירורים שנשמרו
      setFormData((prev) => ({
        ...prev,
        inquiries: updatedInquiries,
      }));
  
      console.log("כל הבירורים נשמרו בהצלחה!");
    } catch (error) {
      console.log("שגיאה כללית בשמירת הבירורים:", error);
    }
  };
 
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // מניעת רענון הדף
    try {
      if (!userId) {
        throw new Error("לא ניתן לזהות משתמש");
      }
  
      // יצירת אובייקט FormData
      const formDataToSend = new FormData();
  
      // הוספת כל השדות מתוך formData לאובייקט FormData
      formDataToSend.append("id", formData.id.toString());
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("numId", formData.numId);
      formDataToSend.append("bornDate", formData.bornDate);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("city.Id", formData.city.id.toString());
      formDataToSend.append("city.Name", formData.city.name);
      formDataToSend.append("adress", formData.adress);
      formDataToSend.append("sector", formData.sector.toString());
      formDataToSend.append("subSector", formData.subSector.toString());
      formDataToSend.append("givesMoney", formData.givesMoney.toString());
      formDataToSend.append("askingMoney", formData.askingMoney.toString());
      formDataToSend.append("cellPhone", formData.cellPhone);
      formDataToSend.append("openness", formData.openness.toString());
      formDataToSend.append("clothingStyle", formData.clothingStyle.toString());
      formDataToSend.append("license", formData.license.toString());
      formDataToSend.append("height", formData.height.toString());
      formDataToSend.append("physique", formData.physique.toString());
      formDataToSend.append("skinTone", formData.skinTone.toString());
      formDataToSend.append("hairColor", formData.hairColor.toString());
      formDataToSend.append("lastStudy", formData.lastStudy.toString());
      formDataToSend.append("studyName", formData.studyName);
      formDataToSend.append("profession.Id", formData.profession.id.toString());
      formDataToSend.append("profession.Name", formData.profession.name);
      formDataToSend.append("workplace", formData.workplace);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("headCovering", formData.headCovering.toString());
      formDataToSend.append("hat", formData.hat.toString());
      formDataToSend.append("suit", formData.suit.toString());
      formDataToSend.append("beard", formData.beard.toString());
      formDataToSend.append("smoker", formData.smoker.toString());
      formDataToSend.append("familyStyle", formData.familyStyle.toString());
      formDataToSend.append("parentalStatus", formData.parentalStatus.toString());
      formDataToSend.append("familyOpenness", formData.familyOpenness.toString());
      formDataToSend.append("fatherName", formData.fatherName);
      formDataToSend.append("fatherOccupation", formData.fatherOccupation);
      formDataToSend.append("motherName", formData.motherName);
      formDataToSend.append("motherOccupation", formData.motherOccupation);
      formDataToSend.append("nameFromHome", formData.nameFromHome);
      formDataToSend.append("descriptionFind", formData.descriptionFind);
      formDataToSend.append("status", formData.status.toString());
  
      // הוספת מערכים (brothers ו-inquiries) כ-JSON
      formDataToSend.append("brothers", JSON.stringify(formData.brothers));
      formDataToSend.append("inquiries", JSON.stringify(formData.inquiries));
  
      // הוספת תמונה אם קיימת
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
  
      // שליחת הנתונים לשרת
     const res= await updateCandidate(userId, formDataToSend);
     if(res){
      console.log("Candidate updated successfully!");
      navigate("/home");} // ניתוב לדף הבית לאחר עדכון
    } catch (error) {
      console.log("שגיאה בעדכון המועמד:", error);
    }
  }
  const handleSaveBrothers = async () => {
    try {
      // מערך לעדכון האחים שנשמרו
      const updatedBrothers: { id: number; name: string; placeOfStudy: string; gender: number; married: boolean; nameIn_laws: string; addressIn_laws: string }[] = [];
  
      // מעבר על כל האחים בטופס
      for (const brother of formData.brothers) {
        const brotherData = {
          name: brother.name,
          placeOfStudy: brother.placeOfStudy,
          gender: brother.gender,
          married: brother.married,
          nameIn_laws: brother.nameIn_laws,
          addressIn_laws: brother.addressIn_laws,
        };
  
        try {
          // שליחת האח לשרת
          const savedBrother = await addBrother(brotherData);
          updatedBrothers.push({ ...savedBrother }); // שמירת האח עם ה-id שנוצר בשרת
        } catch (error) {
          console.log(`שגיאה בשמירת האח: ${brother.name}`, error);
        }
      }
  
      // עדכון ה-state עם האחים שנשמרו
      setFormData((prev) => ({
        ...prev,
        brothers: updatedBrothers,
      }));
  
      console.log("כל האחים נשמרו בהצלחה!");
    } catch (error) {
      console.log("שגיאה כללית בשמירת האחים:", error);
    }
  };

  if (loading) {
    return <div>טוען נתונים...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const getSectorName = (value: number): string => {
    switch (value) {
      case 0:
        return "ליטאי";
      case 1:
        return "חסידי";
      case 2:
        return "ספרדי";
      case 3:
        return "תימני";
      case 4:
        return "חב\"ד";
      case 5:
        return "חצי חצי";
      case 6:
        return "אחר";
      default:
        return "לא ידוע";
    }
  };
  const getGenderName = (value: number): string => {
    switch (value) {
      case 0:
        return "זכר";
      case 1:
        return "נקבה";
      default:
        return "לא ידוע";
    }
  };
  const getTypeInquireName = (value: number): string => {
    switch (value) {
      case 0:
        return "מחותנים";
      case 1:
        return "שכנים";
      case 2:
        return "חברים";
      case 3:
        return "רבנים/מורות";
      default:
        return "לא ידוע";
    }
  };
  const getSubSectorName = (value: number): string => {
    switch (value) {
      case 0:
        return "ישיבתי";
      case 1:
        return "בני תורה עץ";
      case 2:
        return "בעלי תשובה";
      case 3:
        return "ירושלמי";
      case 4:
        return "חרדי מודרני";
      case 5:
        return "חוצניקים";
      case 6:
        return "חזונאישניקים";
      case 7:
        return "זילברמן";
      case 8:
        return "רקע חסידי";
      case 9:
        return "אחר";
      default:
        return "לא ידוע";
    }
  };
  const getPhysiqueName = (value: number): string => {
    switch (value) {
      case 0:
        return "רזה מאד";
      case 1:
        return "רזה";
      case 2:
        return "ממוצע/ת";
      case 3:
        return "מלא/ה";
      default:
        return "לא ידוע";
    }
  };

  const getHairColorName = (value: number): string => {
    switch (value) {
      case 0:
        return "חום";
      case 1:
        return "שחור";
      case 2:
        return "שטני";
      case 3:
        return "בלונדי";
      case 4:
        return "ג'ינג'י";
      default:
        return "לא ידוע";
    }
  };
  const getSkinToneName = (value: number): string => {
    switch (value) {
      case 0:
        return "בהיר";
      case 1:
        return "נוטה לבהיר";
      case 2:
        return "שזוף";
      case 3:
        return "נוטה לכהה";
      case 4:
        return "כהה";
      default:
        return "לא ידוע";
    }
  };
  const getFamilyStyleName = (value: number): string => {
    switch (value) {
      case 0:
        return "מיוחסת";
      case 1:
        return "חשובה";
      case 2:
        return "קלאסית";
      case 3:
        return "עממית";
      default:
        return "לא ידוע";
    }
  };
  const getParentalStatusName = (value: number): string => {
    switch (value) {
      case 0:
        return "נשואים";
      case 1:
        return "גרושים";
      case 2:
        return "אב נפטר";
      case 3:
        return "אם נפטרה";
      case 4:
        return "אינם בחיים";
      default:
        return "לא ידוע";
    }
  };
  const getFamilyOpennessName = (value: number): string => {
    switch (value) {
      case 0:
        return "מודרנית";
      case 1:
        return "פתוחה";
      case 2:
        return "שמרנית";
      case 3:
        return "פרום";
      case 4:
        return "ישיבתית";
      case 5:
        return "בני תורה";
      case 6:
        return "חוצניקים";
      default:
        return "לא ידוע";
    }
  };
  const getOpennessName = (value: number): string => {
    switch (value) {
      case 0:
        return "שמור/ה מאד";
      case 1:
        return "שמרן/ית";
      case 2:
        return "שמור/ה";
      case 3:
        return "שמור/ה וראש פתוח";
      case 4:
        return "פתוח/ה";
      case 5:
        return "מודרני/ת";
      case 6:
        return "מודרני/ת מאד";
      default:
        return "לא ידוע";
    }
  };
  const getClothingStyleName = (value: number): string => {
    switch (value) {
      case 0:
        return "מודרני";
      case 1:
        return "עדכני";
      case 2:
        return "מכובד";
      case 3:
        return "קלאסי";
      case 4:
        return "פשוט";
      case 5:
        return "פשוט מאד";
      default:
        return "לא ידוע";
    }
  };
  const getStudyTypeName = (value: number): string => {
    switch (value) {
      case 0:
        return "ישיבה";
      case 1:
        return "סמינר";
      default:
        return "לא ידוע";
    }
  };
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
  
    // אם יום ההולדת עוד לא עבר השנה, נוריד שנה אחת מהגיל
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age;
  };

  return (
    <div className="update-candidate-container">
      <div className="update-candidate-card">
        <h2>עדכון פרטי מועמד</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <label>שם פרטי</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>שם משפחה</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>תעודת זהות</label>
          <input type="text" name="numId" value={formData.numId} onChange={handleChange} required />

          <label>תאריך לידה</label>
<input
  type="date"
  name="bornDate"
  value={formData.bornDate ? new Date(formData.bornDate).toISOString().split("T")[0] : ""}
  onChange={handleChange}
  required
/>


<div>
    <label>גיל</label>
    <input
      type="number"
      name="age"
      onChange={(e) => e.target.value = calculateAge(e.target.value).toString()}
      required
    />
  </div>

          <label>טלפון</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>אימייל</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>סיסמה</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>עיר</label>
          
<select 
  name="city.name" 
  value={formData.city?.id || ''} 
  onChange={(e) => {
    const selectedCity = cities.find(city => city.id === Number(e.target.value));
    handleCityChange(Number(e.target.value), selectedCity?.name || "");
  }}
>
  <option value="">בחר עיר</option>
  {cities.map((city) => (
    <option key={city.id} value={city.id}>{city.name}</option>
  ))}
</select>
          <label>כתובת</label>
          <input type="text" name="adress" value={formData.adress} onChange={handleChange} required />

         
          <label>מגזר</label>
<select
  name="sector"
  value={formData.sector}
  onChange={handleChange}
>
  <option value="">בחר מגזר</option>
  {[0, 1, 2, 3, 4, 5, 6].map((value) => (
    <option key={value} value={value}>
      {getSectorName(value)}
    </option>
  ))}
</select>
<label>תת מגזר</label>
<select
  name="subSector"
  value={formData.subSector}
  onChange={handleChange}
>
  <option value="">בחר תת מגזר</option>
  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
    <option key={value} value={value}>
      {getSubSectorName(value)}
    </option>
  ))}
</select>
          <label>סכום כסף נותן</label>
          <input type="number" name="givesMoney" value={formData.givesMoney} onChange={handleChange} />

          <label>סכום כסף מבוקש</label>
          <input type="number" name="askingMoney" value={formData.askingMoney} onChange={handleChange} />

          <label>פתיחות</label>
<select
  name="openness"
  value={formData.openness}
  onChange={handleChange}
>
  <option value="">בחר פתיחות</option>
  {[0, 1, 2, 3, 4, 5, 6].map((value) => (
    <option key={value} value={value}>
      {getOpennessName(value)}
    </option>
  ))}
</select>
<label>סגנון לבוש</label>
<select
  name="clothingStyle"
  value={formData.clothingStyle}
  onChange={handleChange}
>
  <option value="">בחר סגנון לבוש</option>
  {[0, 1, 2, 3, 4, 5].map((value) => (
    <option key={value} value={value}>
      {getClothingStyleName(value)}
    </option>
  ))}
</select>
          <label>רישיון נהיגה</label>
          <input type="checkbox" name="license" checked={formData.license} onChange={handleChange} />

          <label>גובה</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} />

          <label>מקצוע</label>
<select
  name="profession"
  value={formData.profession?.id || ""}
  onChange={(e) => {
    const selectedProfession = professions.find(prof => prof.id === Number(e.target.value));
    handleProfessionChange(Number(e.target.value), selectedProfession?.name || "");
  }}
>
  <option value="">בחר מקצוע</option>
  {professions.map((profession) => (
    <option key={profession.id} value={profession.id}>
      {profession.name}
    </option>
  ))}
</select>
        
<label>מבנה גוף</label>
<select
  name="physique"
  value={formData.physique}
  onChange={handleChange}
>
  <option value="">בחר מבנה גוף</option>
  {[0, 1, 2, 3].map((value) => (
    <option key={value} value={value}>
      {getPhysiqueName(value)}
    </option>
  ))}
</select>
<label>צבע עור</label>
<select
  name="skinTone"
  value={formData.skinTone}
  onChange={handleChange}
>
  <option value="">בחר צבע עור</option>
  {[0, 1, 2, 3, 4].map((value) => (
    <option key={value} value={value}>
      {getSkinToneName(value)}
    </option>
  ))}
</select>

<label>צבע שיער</label>
<select
  name="hairColor"
  value={formData.hairColor}
  onChange={handleChange}
>
  <option value="">בחר צבע שיער</option>
  {[0, 1, 2, 3, 4].map((value) => (
    <option key={value} value={value}>
      {getHairColorName(value)}
    </option>
  ))}
</select>

<label>סגנון משפחתי</label>
<select
  name="familyStyle"
  value={formData.familyStyle}
  onChange={handleChange}
>
  <option value="">בחר סגנון משפחתי</option>
  {[0, 1, 2, 3].map((value) => (
    <option key={value} value={value}>
      {getFamilyStyleName(value)}
    </option>
  ))}
</select>
<label>מצב הורים</label>
<select
  name="parentalStatus"
  value={formData.parentalStatus}
  onChange={handleChange}
>
  <option value="">בחר מצב הורים</option>
  {[0, 1, 2, 3, 4].map((value) => (
    <option key={value} value={value}>
      {getParentalStatusName(value)}
    </option>
  ))}
</select>
<label>פתיחות משפחתית</label>
<select
  name="familyOpenness"
  value={formData.familyOpenness}
  onChange={handleChange}
>
  <option value="">בחר פתיחות משפחתית</option>
  {[0, 1, 2, 3, 4, 5, 6].map((value) => (
    <option key={value} value={value}>
      {getFamilyOpennessName(value)}
    </option>
  ))}
</select>
<label>סוג לימודים</label>
<select
  name="studyType"
  value={formData.lastStudy}
  onChange={handleChange}
>
  <option value="">בחר סוג לימודים</option>
  {[0, 1].map((value) => (
    <option key={value} value={value}>
      {getStudyTypeName(value)}
    </option>
  ))}
</select>
<label>שם האב</label>
  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />

  <label>עיסוק האב</label>
  <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />

  <label>שם האם</label>
  <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />

  <label>עיסוק האם</label>
  <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />

  <label>שם מהבית</label>
  <input type="text" name="nameFromHome" value={formData.nameFromHome} onChange={handleChange} />
 <label>תיאור למציאת שידוך</label>
  <textarea name="descriptionFind" value={formData.descriptionFind} onChange={handleChange} />


  
  <div>
  <h3>אחים</h3>
  {Array.isArray(formData.brothers) && formData.brothers.map((brother, index) => (
    <div key={index} className="brother-card">
      <label>שם</label>
      <input
        type="text"
        value={brother.name}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].name = e.target.value;
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      />

      <label>מקום לימודים</label>
      <input
        type="text"
        value={brother.placeOfStudy}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].placeOfStudy = e.target.value;
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      />

      <label>מגדר</label>
      <select
        value={brother.gender}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].gender = Number(e.target.value);
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      >
        <option value={0}>זכר</option>
        <option value={1}>נקבה</option>
      </select>

      <label>נשוי</label>
      <input
        type="checkbox"
        checked={brother.married}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].married = e.target.checked;
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      />

      <label>שם מחותנים</label>
      <input
        type="text"
        value={brother.nameIn_laws}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].nameIn_laws = e.target.value;
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      />

      <label>כתובת מחותנים</label>
      <input
        type="text"
        value={brother.addressIn_laws}
        onChange={(e) => {
          const updatedBrothers = [...formData.brothers];
          updatedBrothers[index].addressIn_laws = e.target.value;
          setFormData({ ...formData, brothers: updatedBrothers });
        }}
      />
    </div>
  ))}
  <button type="button" onClick={addNewBrother}>
    הוסף אח חדש
  </button>
  <button type="button" onClick={handleSaveBrothers}>
    שמור אחים
  </button>
</div>
<div>
  <h3>בירורים</h3>
  
  {formData.inquiries.map((inquiry, index) => (
    <div key={index} className="inquiry-card">
      <label>שם</label>
      <input
        type="text"
        value={inquiry.name}
        onChange={(e) => {
          const updatedInquiries = [...formData.inquiries];
          updatedInquiries[index].name = e.target.value;
          setFormData({ ...formData, inquiries: updatedInquiries });
        }}
      />

      <label>טלפון</label>
      <input
        type="text"
        value={inquiry.phone}
        onChange={(e) => {
          const updatedInquiries = [...formData.inquiries];
          updatedInquiries[index].phone = e.target.value;
          setFormData({ ...formData, inquiries: updatedInquiries });
        }}
      />

      <label>סוג</label>
      <select
        value={inquiry.type}
        onChange={(e) => {
          const updatedInquiries = [...formData.inquiries];
          updatedInquiries[index].type = Number(e.target.value);
          setFormData({ ...formData, inquiries: updatedInquiries });
        }}
      >
        <option value={0}>מחותנים</option>
        <option value={1}>שכנים</option>
        <option value={2}>חברים</option>
        <option value={3}>רבנים/מורות</option>
      </select>

      <button type="button" onClick={() => removeInquiry(index)}>
        מחק
      </button>
    </div>
  ))}

  <button type="button" onClick={addNewInquiry}>
    הוסף בירור חדש
  </button>
  <button type="button" onClick={handleSaveInquiries}>
    שמור בירורים
  </button>
</div>
  <label>תמונה</label>
  <input type="file" name="image" onChange={handleChange} />

          <label>תיאור</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />

          <label>סטטוס</label>
          <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />

          <button type="submit" onClick={handleSubmit}>עדכן</button>
          
   </form>
  </div>
</div>
  );
};


export default UpdateCandidate;