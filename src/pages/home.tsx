import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      {/* כפתורי ההרשמה וההתחברות מתחת לניווט */}
      <div className="auth-buttons">
        <button className="auth-button" onClick={() => navigate("/register")}>
          הרשמה
        </button>
        <button className="auth-button" onClick={() => navigate("/login")}>
          התחברות
        </button>
      </div>

      <div className="login-container">
        <h2>ברוך הבא!</h2>
        <p>התחבר למערכת כדי למצוא את ההתאמה שלך</p>
      </div>
    </div>
  );
};

export default HomePage;
