import React from "react";
import "./PricingPage.css";
import iphone from "../assets/iphone.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const profitChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Profit",
      data: [2000, 1600, 1800, 2500, 2200, 2400],
      fill: true,
      borderColor: "#a9c7e6",
      backgroundColor: "#cce6ff",
      pointBackgroundColor: "#111",
      pointBorderColor: "#fff",
      pointRadius: 6,
      pointHoverRadius: 8,
      tension: 0.3,
    },
  ],
};

const profitChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { color: "#000" },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#000" },
    },
  },
};

const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page">
      <div className="top-section">
        {/* Current Price */}
        <div className="price-card current-price">
          <p className="label">Current Price</p>
          <p className="price">$27.99</p>
          <p className="status lost">Lost Profit</p>
        </div>

        {/* Product Image */}
        <div className="product-image">
          <img src={iphone} alt="Product" />
        </div>

        {/* hopwize Prices */}
        <div className="price-card hopwize-prices">
          <p className="label">hopwize Prices</p>
          <div className="price-breakdown">
            <div>
              <p className="sub-label">Variable Cost Price</p>
              <p className="price">$14.95</p>
            </div>
            <div>
              <p className="sub-label">Total Cost Price</p>
              <p className="price">$24.95</p>
            </div>
            <div>
              <p className="sub-label">Value Add Price</p>
              <p className="price">$32.95</p>
            </div>
          </div>
          <p className="status gain">Most Profit</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="graph-section">
        <div className="tabs">
          <span className="tab active">Profit Scenarios</span>
          <span className="tab">Prices</span>
          <span className="tab">Operating Status</span>
        </div>
        <div className="graph-placeholder">
          <Line data={profitChartData} options={profitChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
