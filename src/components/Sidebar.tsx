import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../../css/styles.css';  // Ensure your styles are linked

// Define SidebarProps to accept onLogout
interface SidebarProps {
  onSectionClick: (section: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionClick, onLogout }) => {
  const navigate = useNavigate();

  // Handles navigation to the corresponding route
  const handleNavigation = (path: string) => {
    navigate(path);
    onSectionClick(path);
  };

  return (
    <nav className="sidebar">
      <div className="section">
        <h2 className="section-title">Dashboards</h2>
        <ul>
          <li className="menu-item" onClick={() => handleNavigation('/company')}>
            <span className="icon">🏢</span>
            <span>Company</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/market-fit')}>
            <span className="icon">📊</span>
            <span>Market Fit</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/pricing')}>
            <span className="icon">💲</span>
            <span>Pricing</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/forecasting')}>
            <span className="icon">📉</span>
            <span>Forecasting</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/valuation')}>
            <span className="icon">📚</span>
            <span>Valuation</span>
          </li>
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Pages</h2>
        <ul>
          <li className="menu-item">
            <span className="icon">📂</span>
            <span>Company</span>
            <ul className="sub-menu">
              <li onClick={() => handleNavigation('/overview')}>Overview</li>
              <li onClick={() => handleNavigation('/business-model')}>Business Model</li>
              <li onClick={() => handleNavigation('/valuation')}>Valuation</li>
              <li onClick={() => handleNavigation('/goal-schedule')}>Goal Schedule</li>
              <li onClick={() => handleNavigation('/drive')}>Drive</li>
            </ul>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/account')}>
            <span className="icon">👤</span>
            <span>Account</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/team')}>
            <span className="icon">👥</span>
            <span>Team</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/tools')}>
            <span className="icon">🛠</span>
            <span>Tools</span>
          </li>
          <li className="menu-item" onClick={() => handleNavigation('/contact')}>
            <span className="icon">💬</span>
            <span>Contact</span>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
