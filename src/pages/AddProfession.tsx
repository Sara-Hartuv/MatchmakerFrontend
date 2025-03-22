import { ChangeEvent, FormEvent, useState } from "react";
import { addProfession } from "../services/profession.service"; // ייבוא השירות החדש
import { useNavigate } from "react-router-dom";
import "../styles/addProfession.css";

export default function AddProfession() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // איפוס הודעות שגיאה לפני ניסיון הוספה
    setSuccess(""); // איפוס הודעות הצלחה לפני ניסיון הוספה

    try {
      const response = await addProfession(formData.name, formData.description);
      setSuccess("המקצוע נוסף בהצלחה!");
      setFormData({ name: "", description: "" });
      navigate("/home");
    } catch (error) {
      console.log("Error adding profession:", error);
      setError("נכשל בהוספת המקצוע. נסה שוב.");
    }
  };

  return (
    <div className="add-profession-container">
      <form onSubmit={handleSubmit} className="add-profession-form">
        <h2>הוסף מקצוע חדש</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="input-group">
          <label htmlFor="name">שם המקצוע</label>
                    <input
            type="text"
            name="name"
            id="name"
            placeholder="שם המקצוע"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">תיאור</label>
                    <textarea
            name="description"
            id="description"
            placeholder="תיאור"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button className="add-profession-button">הוסף מקצוע</button>
      </form>
    </div>
  );
}
