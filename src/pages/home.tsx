import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page! 🏠</h1>
      <p>This is the main content of the home page.</p>
      <div className="button-container">
        <button onClick={handleLoginClick}>Login 🚀</button>
        <button onClick={handleSignUpClick}>Sign Up 🚀</button>
      </div>
    </div>
  );
};

export default HomePage;