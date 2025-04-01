import React from "react";
import "./Header.css"; 
import hopwizeLogo from "../assets/hopwize_logo.png";
import userLogo from "../assets/user_icon.png"; 

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('companyID');
    window.location.href = '/login';
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img src={userLogo} alt="User Logo" className="user-logo" />
      </div>

      <div className="header-content">
        <img src={hopwizeLogo} alt="Hopwize Logo" className="header-logo" />
      </div>

      <button className="logout-button header-logout" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
