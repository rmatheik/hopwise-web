import './ForecastingPage.css';
import '../../css/styles.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ForecastingPage: React.FC = () => {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState<{ Company_Name?: string }>({});

  const companyID = localStorage.getItem('companyID');

  useEffect(() => {
    if (!companyID) {
      console.error("No CompanyID found. Redirecting to login...");
      navigate('/login');
      return;
    }

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
        setCompanyDetails({ Company_Name: data.Company_Name });
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompanyData();
  }, [companyID, navigate]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Financial #1',
        data: [10000, 8000, 12000, 22000, 18000, 20000, 21000],
        borderColor: '#84b3e7',
        backgroundColor: '#bfdbfe',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Financial #2',
        data: [5000, 10000, 16000, 10000, 14000, 16000, 17000],
        borderColor: '#d1d5db',
        borderDash: [5, 5],
        backgroundColor: '#e5e7eb',
        tension: 0.4,
        fill: false,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#6b7280',
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
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      y: {
        ticks: {
          color: '#9ca3af',
          callback: (value: number) => (value >= 1000 ? `${value / 1000}K` : value),
        },
        grid: { color: 'rgba(0,0,0,0.05)' }
      }
    }
  };

  return (
    <div className="forecasting-dashboard">
        <div className="forecasting-dashboard">
        {/* Financial Graph Section */}
        <div className="financial-graph-section">
            <h3>Financial Graph</h3>
            <div className="financial-graph-container">
            <Line data={chartData} options={chartOptions} />
            </div>
        </div>

        {/* Tabs */}
        <div className="forecast-tabs">
            <button className="forecast-tab active">Revenue</button>
            <button className="forecast-tab">Expenses</button>
            <button className="forecast-tab">Assets</button>
            <button className="forecast-tab">Liabilities</button>
            <button className="forecast-tab">Equity</button>
        </div>

        {/* Revenue Table */}
        <h3 className="forecast-table-title">Revenue</h3>
        <table className="forecast-table">
            <thead>
            <tr>
                <th></th>
                <th>2023</th>
                <th>2024</th>
                <th>2025</th>
                <th>2026</th>
                <th>2027</th>
                <th>2028</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Revenue</td>
                <td>ACT</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
            </tr>
            <tr>
                <td>$500,000</td>
                <td>$512,000</td>
                <td>$600,000</td>
                <td>$625,000</td>
                <td>$700,000</td>
                <td>$756,000</td>
                <td>$800,000</td>
            </tr>
            </tbody>
        </table>

        {/* COGS Table */}
        <h3 className="forecast-table-title">COGS</h3>
        <table className="forecast-table">
            <thead>
            <tr>
                <th></th>
                <th>2023</th>
                <th>2024</th>
                <th>2025</th>
                <th>2026</th>
                <th>2027</th>
                <th>2028</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>COGS</td>
                <td>ACT</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
                <td>FCST</td>
            </tr>
            <tr>
                <td>$412,000</td>
                <td>$512,000</td>
                <td>$600,000</td>
                <td>$615,000</td>
                <td>$630,000</td>
                <td>$645,000</td>
                <td>$660,000</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default ForecastingPage;
