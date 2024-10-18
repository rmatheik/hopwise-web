import React, { useState } from 'react';
import Sidebar from './components/Sidebar';  // Adjust this path based on your folder structure
import CompanyPage from './components/CompanyPage';  // Import the CompanyPage component
import '../css/styles.css';  // Your global styles if any

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');  // State to track the active section

  // Function to handle section clicks
  const handleSectionClick = (section: string) => {
    setActiveSection(section);  // Update the state with the clicked section
  };

  return (
    <div className="app-container">
      {/* Pass the section click handler to Sidebar */}
      <Sidebar onSectionClick={handleSectionClick} />
      
      <main className="main-content">
        {/* Conditionally render the CompanyPage when 'Company' is clicked */}
        {activeSection === 'Company' && <CompanyPage />}
        {/* Render other pages based on the active section */}
        {!activeSection && <h1>Welcome to the Dashboard</h1>}  {/* Default content */}
      </main>
    </div>
  );
};

export default App;
