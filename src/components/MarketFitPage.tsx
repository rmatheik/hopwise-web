import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './MarketFitPage.css';
import './CompanyPage';
import '../../css/styles.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MarketFitPage: React.FC = () => {
  const navigate = useNavigate();
  const [forecastData, setForecastData] = useState<{ year: number; revenue: number }[]>([]);

  useEffect(() => {
    const fetchForecastRevenue = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found. Redirecting to login.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/forecast_revenue', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch forecasted revenue data.');

        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          year: item.Year,
          revenue: parseFloat(item.Forecasted_Revenue),
        }));

        setForecastData(formattedData);
      } catch (error) {
        console.error('Error fetching forecasted revenue data:', error);
      }
    };

    fetchForecastRevenue();
  }, [navigate]);

  const chartData = {
    labels: forecastData.map((item) => item.year),
    datasets: [
      {
        label: 'Forecasted Revenue ($)',
        data: forecastData.map((item) => item.revenue),
        backgroundColor: '#E3F5FF',
        borderColor: 'rgb(178, 215, 236)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Forecasted Revenue Over Time' },
    },
    scales: {
      x: {
        title: { display: true, text: 'Year' },
        ticks: { color: '#000000' },
      },
      y: {
        title: { display: true, text: 'Revenue ($)' },
        ticks: { color: '#000000' },
      },
    },
  };

  const stackedChartData = {
    labels: ['2025', '2026', '2027', '2028', '2029'],
    datasets: [
      {
        label: 'SOM',
        data: [10, 8, 2, 10, 8],
        backgroundColor: 'rgba(178, 215, 236)',
        stack: 'stack1',
      },
      {
        label: 'SAM',
        data: [20, 45, 30, 15, 20],
        backgroundColor: '#d5f0f5',
        stack: 'stack1',
      },
      {
        label: 'TAM',
        data: [70, 47, 68, 75, 72],
        backgroundColor: '#a9c7e6',
        stack: 'stack1',
      },
    ],
  };

  const stackedChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#000' },
        grid: { display: false },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#000',
          callback: (value: any) => `${value}%`,
        },
        grid: { color: '#e5e7eb' },
        max: 100,
      },
    },
  };

  return (
    <div className="market-fit-dashboard">
      {/* Forecast Revenue + Summary Cards */}
      <div className="forecast-market-section">
        <div className="forecast-revenue-graph">
          <h3>Forecast Revenue</h3>
          <div style={{ width: '100%', height: '400px' }}>
            {forecastData.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <p>Loading forecast revenue data...</p>
            )}
          </div>
        </div>

        <div className="forecast-summary-cards">
          <div className="forecast-summary-card">
            <h4>2025 Forecast Revenue</h4>
            <p>$73,405</p>
            <span>+6.08%</span>
          </div>
          <div className="forecast-summary-card">
            <h4>2025 Industry Forecast</h4>
            <p>$6,542</p>
            <span>+15.03%</span>
          </div>
          <div className="forecast-summary-card">
            <h4>2025 Industry Forecast</h4>
            <p>$6,542</p>
            <span>+15.03%</span>
          </div>
        </div>
      </div>

      {/* Market Breakdown & Stacked Graph */}
      <div className="market-breakdown-section">
        <div className="market-breakdown">
          <h3>Market Breakdown</h3>
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
              <span className="legend-color tam-color"></span> TAM <span className="legend-value">96.3%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color sam-color"></span> SAM <span className="legend-value">3.60%</span>
            </div>
            <div className="legend-item">
              <span className="legend-color som-color"></span> SOM <span className="legend-value">0.38%</span>
            </div>
          </div>
        </div>

        <div className="forecast-stack-graph">
          <h3>Forecast Market Breakdown</h3>
          <div className="stacked-chart-container">
            <Bar data={stackedChartData} options={stackedChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketFitPage;
