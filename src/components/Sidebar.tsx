import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../../css/styles.css';  // Ensure your styles are linked

// Define SidebarProps to accept onLogout
interface SidebarProps {
  onSectionClick: (section: string) => void;
  onLogout: () => void; // Add this line
}
interface SidebarProps {
  onSectionClick: (section: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionClick, onLogout }) => {
  return (
    <nav className="sidebar">
      <div className="section">
        <h2 className="section-title">Dashboards</h2>
        <ul>
          <li className="menu-item" onClick={() => onSectionClick('Company')}>
            <span className="icon">🏢</span>
            <span>Company</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Market Fit')}>
            <span className="icon">📊</span>
            <span>Market Fit</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Pricing')}>
            <span className="icon">💲</span>
            <span>Pricing</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Forecasting')}>
            <span className="icon">📉</span>
            <span>Forecasting</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Valuation')}>
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
              <li onClick={() => onSectionClick('Overview')}>Overview</li>
              <li onClick={() => onSectionClick('Business Model')}>Business Model</li>
              <li onClick={() => onSectionClick('Valuation')}>Valuation</li>
              <li onClick={() => onSectionClick('Goal Schedule')}>Goal Schedule</li>
              <li onClick={() => onSectionClick('Drive')}>Drive</li>
            </ul>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Account')}>
            <span className="icon">👤</span>
            <span>Account</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Team')}>
            <span className="icon">👥</span>
            <span>Team</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Tools')}>
            <span className="icon">🛠</span>
            <span>Tools</span>
          </li>
          <li className="menu-item" onClick={() => onSectionClick('Contact')}>
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
