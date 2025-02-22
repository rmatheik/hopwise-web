import './CompanyPage.css'; // Import the CSS specific to this page
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import for redirection
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';



// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CompanyPage: React.FC = () => {
  const navigate = useNavigate();  // Use React Router for redirection
  const [valuation, setValuation] = useState<number | null>(null);
  const [revenueData, setRevenueData] = useState<{ year: number; revenue: number }[]>([]);
  const [latestRevenue, setLatestRevenue] = useState<number | null>(null);

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
    labels: revenueData.map(item => item.year),
    datasets: [
      {
        label: "Revenue ($)",
        data: revenueData.map(item => item.revenue),
        borderColor: "rgb(200, 230, 246)",
        backgroundColor: "rgb(200, 230, 246)",
        borderWidth: 2,
        fill: false,
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
        labels: {color: '#000000'}
      },
      title: { display: false}
    },
    scales: {
      x: {
        ticks: {color: '#000000'},
        grid: {color: 'rgba(0, 0, 0, 0.1)'},
      },
      y: {
        ticks: {color: '#000000'},
        grid: {color: 'rgba(0, 0, 0, 0.1)'},
      },
    },
  };
  

  return (
    <div className="company-dashboard">
      <div className="company-summary-cards">
        <div className="summary-card valuation-card">
          <div className="card-title">Valuation</div>
          <div className="card-number">
            {valuation !== null && valuation !== undefined 
              ? `$${valuation.toLocaleString()}` 
              : "Loading..."}
          </div>

        </div>
        <div className="summary-card company-revenue-card">
          <div className="card-title">Company Revenue</div>
          <div className="card-number">
            {latestRevenue !== null ? `$${latestRevenue.toLocaleString()}` : "Loading..."}
          </div>
        </div>
      </div>

      <div className="company-revenue-graph">
        <h3>Revenue Over Time</h3>
        <div className="graph-placeholder" style={{ width: '100%', height: '400px' }}>
          {revenueData.length > 0 ? <Line data={chartData} options={chartOptions} /> : <p>Loading revenue chart...</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
