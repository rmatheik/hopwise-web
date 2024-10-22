import React from 'react';
import './CompanyPage.css';  // Import the CSS specific to this page

const CompanyPage: React.FC = () => {
  return (
    <div className="company-dashboard">
      {/* Company Overview Section */}
      <div className="company-summary-cards">
        <div className="summary-card valuation-card">
          <div className="card-title">Valuation</div>
          <div className="card-number">$157,000</div>
        </div>
        <div className="summary-card company-revenue-card">
          <div className="card-title">Company Revenue</div>
          <div className="card-number">$6,542</div>
        </div>
        <div className="summary-card valuation-card">
          <div className="card-title">Net Need</div>
          <div className="card-number">$73,405</div>
        </div>
      </div>

      {/* Revenue Graph Section */}
      <div className="company-revenue-graph">
        <h3>Current Revenue</h3>
        <div className="graph-placeholder">
          <p>Graph of Revenue Here</p>
        </div>
      </div>

      {/* Market Breakdown and Product Breakdown */}
      <div className="company-breakdowns">
        <div className="breakdown-card">
          <h3>Market Breakdown</h3>
          <div className="chart-placeholder">
            <p>Market Chart Here</p>
          </div>
        </div>
        <div className="breakdown-card">
          <h3>(Product) Price Breakdown</h3>
          <div className="chart-placeholder">
            <p>Price Chart Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
