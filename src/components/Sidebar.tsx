import React from 'react';
import '../../css/styles.css';  // Ensure your styles are linked

interface SidebarProps {
  onSectionClick: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionClick }) => {
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
            {/* Sub-menu for Company */}
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
    </nav>
  );
};

export default Sidebar;
