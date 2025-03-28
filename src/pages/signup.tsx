import React, { useState } from "react";
import "../styles/login.css";
import { signUp } from "../services/auth.service";
import { setSession } from "../auth/auth.utils";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/auth/auth.slice";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("candidate"); // ברירת מחדל: מועמד
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = await signUp(email, password, userType);
      console.log("Token:", token);
      const decodedUser = jwtDecode<any>(token);

     console.log("Decoded User:", decodedUser);

      dispatch(setUser(token));
      setSession(token);

      if (token) {
        console.log("Sign up successful!");
        alert("נרשמת בהצלחה!");
        // Redirect to the login page or perform other actions
      }
    } catch (error: any) {
      setError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create an Account! 😊</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email 📧"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password 🔒"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password 🔒"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Checkbox לבחירת סוג המשתמש */}
          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="candidate"
                checked={userType === "candidate"}
                onChange={(e) => setUserType(e.target.value)}
              />
              מועמד
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="matchmaker"
                checked={userType === "matchmaker"}
                onChange={(e) => setUserType(e.target.value)}
              />
              שדכן
            </label>
          </div>

          <button type="submit">Sign Up 🚀</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="signup-link">
          Already have an account? <a href="/login">Login!</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;