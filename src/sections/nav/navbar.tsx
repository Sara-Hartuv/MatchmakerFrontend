import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/auth/auth.slice";
import "../../styles/navbar.css";
import logo from "../../images/לחיים - 2.png"; // ודא שהעלית את הלוגו לתיקיית assets

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="לוגו" />
      </div>
      <ul className="navbar-links">
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/engaged">מאורסים</Link></li>
        <li><Link to="/faq">שאלות ותשובות</Link></li>
        <li><Link to="/guide">מדריך למשתמש</Link></li>
        <li><Link to="/contact">צור קשר</Link></li>
        {isAuthenticated ? (
          <li><button className="logout-btn" onClick={() => dispatch(logout())}>התנתקות</button></li>
        ) : (
          <>
            <li><Link className="auth-link" to="/register">הרשמה</Link></li>
            <li><Link className="auth-link" to="/login">התחברות</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
