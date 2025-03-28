import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/auth/auth.slice";
import "../../styles/navbar.css";
import logo from "../../images/לחיים - 2.png"; // ודא שהעלית את הלוגו לתיקיית assets
import { PATHS } from "../../routes/path";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // בדיקה אם יש token ב-localStorage
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="לוגו" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/Engaged">מאורסים</Link></li>
        <li><Link to="/FAQ">שאלות ותשובות</Link></li>
        <li><Link to="/guide">מדריך למשתמש</Link></li>
        <li><Link to="/contact">צור קשר</Link></li>
        
        {/* הצגת אפשרויות נוספות אם המשתמש מחובר */}
        {token && (
          <>
            <li><Link to={PATHS.proposals}>הצעות</Link></li>
            <li><Link to={PATHS.toAdmin}>Admin</Link></li>
            <li><Link to="/profile">הפרופיל שלי</Link></li>
          </>
        )}
        {/* {token && jwtDecode<any>(token) && jwtDecode<any>(token).role 
        (<>
            <li><Link to={PATHS.proposals}>הצעות</Link></li>
            <li><Link to="/profile">הפרופיל שלי</Link></li>
          </>
        )} */}


        {isAuthenticated ? (
          <li>
            <button className="logout-btn" onClick={() => {
              dispatch(logout());
              localStorage.removeItem("token"); // הסרת ה-token בעת התנתקות
            }}>
              התנתקות
            </button>
          </li>
        ) : (
          <>
            <li><Link className="auth-link" to="/singup">הרשמה</Link></li>
            <li><Link className="auth-link" to="/login">התחברות</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}