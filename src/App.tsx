import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CompanyPage from './components/CompanyPage';
import LoginPage from './components/LoginPage';
import '../css/styles.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setCheckingAuth(false);
  }, []);

  const handleLoginSuccess = (token: string, companyID: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('companyID', companyID);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('companyID');
    setIsAuthenticated(false);
  };

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Sidebar onSectionClick={() => {}} onLogout={handleLogout} />}
        <div className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/company" /> : <Navigate to="/login" />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/company" /> : <LoginPage onLogin={handleLoginSuccess} />} />
            <Route path="/company" element={isAuthenticated ? <CompanyPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
