import './CompanyPage.css'; // Import the CSS specific to this page
import '../../css/styles.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import for redirection
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import logo from '../assets/apple_logo.png';
//import './MarketFitPage.css'; // Import the CSS specific to this page

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();  // Use React Router for redirection
  const [valuation, setValuation] = useState<number | null>(null);
  const [revenueData, setRevenueData] = useState<{ year: number; revenue: number }[]>([]);
  const [latestRevenue, setLatestRevenue] = useState<number | null>(null);

  //  New: About section state
  const [companyDetails, setCompanyDetails] = useState<{
    Company_Name?: string;
    Industry?: string;
    City?: string;
    State?: string;
    Country?: string;
    Funding_Stage?: string;
    URL?: string;
  }>({});

  // Get the companyID from localStorage
  const companyID = localStorage.getItem('companyID');

  useEffect(() => {
    // Prevent infinite loop and redirect if companyID is missing
    if (!companyID) {
      console.error("No CompanyID found. Redirecting to login...");
      navigate('/login'); // Redirect to login page
      return;
    }

    // Function to fetch company data
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No authentication token found. Redirecting to login.");
          navigate("/login");
          return;
        }
    
        const response = await fetch(`http://localhost:5001/api/company`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) throw new Error("Failed to fetch company data.");
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
    
        setValuation(data.Given_Valuation);
        setCompanyDetails({
          Company_Name: data.Company_Name,
          Industry: data.Industry,
          City: data.City,
          State: data.State,
          Country: data.Country,
          Funding_Stage: data.Funding_Stage,
          URL: data.URL
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    
    const fetchRevenueData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No authentication token found. Redirecting to login.");
          navigate("/login");
          return;
        }
    
        const response = await fetch(`http://localhost:5001/api/revenue`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
    
        if (!response.ok) throw new Error("Failed to fetch revenue data.");
        
        const data = await response.json();
    
        const revenueArr: { year: number; revenue: number }[] = data.map((item: any) => ({
          year: item.Year,
          revenue: parseFloat(item.Revenue),
        }));
    
        revenueArr.sort((a, b) => a.year - b.year);
        setRevenueData(revenueArr);
        setLatestRevenue(revenueArr[revenueArr.length - 1]?.revenue || null);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchCompanyData();
    fetchRevenueData();

  }, [companyID, navigate]); // Ensures useEffect runs only when companyID changes
  

  // Chart Data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'This Month',
        data: [10000, 8000, 12000, 22000, 18000, 20000, 21000],
        borderColor: '#a4d3ed',
        backgroundColor: '#a4d3ed',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: '#84b3e3',
        pointBorderColor: '#84b3e3',
        pointRadius: 2,
      },
      {
        label: 'Last Month',
        data: [5000, 10000, 16000, 10000, 14000, 16000, 17000],
        borderColor: '#cbd5e1',
        borderDash: [5, 5],
        backgroundColor: '#cbd5e1',
        tension: 0.4,
        fill: false,
        pointRadius: 0
      }
    ]
  };
  

  // Chart Options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#6b7280', // soft grey
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' }, // soft grey
        grid: {
          color: 'rgba(0,0,0,0.05)' // very faint lines
        }
      },
      y: {
        ticks: {
          color: '#9ca3af',
          callback: function(value: number) {
            return value >= 1000 ? `${value / 1000}K` : value;
          }
          
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    },
  };
  
  

  return (
  <div className="company-dashboard">
    {/* Summary Cards */}
    <div className="company-header-section">
      {/* Logo on the left */}
      <img src={logo} alt="Company Logo" className="company-logo-image" />

      {/* Summary Cards */}
      <div className="company-summary-cards">
        <div className="summary-card valuation-card">
          <div className="card-title">Valuation</div>
          <div className="card-number">
            {valuation !== null ? `$${valuation.toLocaleString()}` : "Loading..."}
          </div>
        </div>
        <div className="summary-card company-revenue-card">
          <div className="card-title">Company Revenue</div>
          <div className="card-number">
            {latestRevenue !== null ? `$${latestRevenue.toLocaleString()}` : "Loading..."}
          </div>
        </div>
        <div className="summary-card valuation-card">
          <div className="card-title">Valuation</div>
          <div className="card-number">
            {valuation !== null ? `$${valuation.toLocaleString()}` : "Loading..."}
          </div>
        </div>
      </div>
    </div>

    {/* About + Graph Section */}
    <div className="company-graph-about-section">
      <div className="about-section">
        <h3>About</h3>
        {companyDetails.Company_Name && <p><strong>Name:</strong> {companyDetails.Company_Name}</p>}
        {companyDetails.Industry && <p><strong>Industry:</strong> {companyDetails.Industry}</p>}
        {(companyDetails.City || companyDetails.State || companyDetails.Country) && (
          <p>
            <strong>Location:</strong>{" "}
            {`${companyDetails.City ?? ''}${companyDetails.State ? `, ${companyDetails.State}` : ''}${companyDetails.Country ? `, ${companyDetails.Country}` : ''}`}
          </p>
        )}
        {companyDetails.Funding_Stage && (
          <p><strong>Funding Stage:</strong> {companyDetails.Funding_Stage}</p>
        )}
        {companyDetails.URL && (
          <p>
            <strong>Website:</strong>{" "}
            <a href={companyDetails.URL} target="_blank" rel="noopener noreferrer">
              {companyDetails.URL}
            </a>
          </p>
        )}
      </div>

      <div className="company-revenue-graph">
        <h3>Revenue Over Time</h3>
        <div className="graph-placeholder" style={{ width: '100%', height: '400px' }}>
          {revenueData.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p>Loading revenue chart...</p>
          )}
        </div>
      </div>
    </div>

    {/* Market Breakdown Section */}
    <div className="market-breakdown-container">
      <div className="market-breakdown">
        <div className="market-circle-container">
          <div className="market-circle tam">
            <span className="circle-label">$1.4B</span>
          </div>
          <div className="market-circle sam">
            <span className="circle-label">$50M</span>
          </div>
          <div className="market-circle som">
            <span className="circle-label">$5M</span>
          </div>
        </div>

        <div className="market-legend">
          <div className="legend-item">
            <span className="legend-color tam-color"></span> TAM
            <span className="legend-value">96.3%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color sam-color"></span> SAM
            <span className="legend-value">3.60%</span>
          </div>
          <div className="legend-item">
            <span className="legend-color som-color"></span> SOM
            <span className="legend-value">0.38%</span>
          </div>
        </div>
      </div>
    </div>


      {/* OPTIONAL: Right side content */}
      {/* <div className="some-right-section">
        Your graph/map/anything else
      </div> */}
    </div>
);

};

export default CompanyPage;
