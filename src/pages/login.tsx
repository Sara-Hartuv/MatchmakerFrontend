import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/auth/auth.slice";
import { setSession } from "../auth/auth.utils";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/login.css";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // איפוס הודעות שגיאה לפני ניסיון התחברות

    try {
      const params = new URLSearchParams();
      params.append("email", userData.email);
      params.append("password", userData.password);

      const response = await axios.post(
        "https://localhost:7242/api/Login/login",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const authUser = response.data;
      dispatch(setUser(authUser.user));
      setSession(authUser);
      alert("התחברת");
    } catch (error) {
      console.log("Error during login:", error);
      setError("אימייל או סיסמה שגויים, נסה שוב.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>ברוך הבא לשידוכים</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="אימייל"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-button">התחבר</button>
      </form>
    </div>
  );
}
