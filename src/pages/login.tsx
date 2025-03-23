import { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../services/auth.service";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/auth/auth.slice";
import { setSession } from "../auth/auth.utils";
import { jwtDecode } from "jwt-decode";
import "../styles/login.css";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selectors";

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
      const token = await login(userData.email, userData.password);
      console.log("Token:", token);
   

      const decodedUser = jwtDecode<any>(token);

     console.log("Decoded User:", decodedUser);

      dispatch(setUser(token));
      setSession(token);

      alert("התחברת");
    } catch (error) {
      console.log("Error during login:", error);
      setError("אימייל או סיסמה שגויים, נסה שוב.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2></h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
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
          <input
            type="password"
            name="password"
            placeholder="סיסמה"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-button" >התחבר</button>
      </form>
    </div>
  );
}
