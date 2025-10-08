import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { stockService } from './stockService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStockData = async () => {
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await stockService.getStockData(ticker);
      setStockData(data);
    } catch (err) {
      setError(err.message);
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStockData();
  };

  const chartData = stockData ? {
    labels: stockData.dates.map(date => {
      const d = new Date(date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    }),
    datasets: [
      {
        label: `${stockData.symbol} Closing Price`,
        data: stockData.prices,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: stockData ? `${stockData.symbol} - Last 30 Days` : 'Stock Price Chart'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FinSight: Stock Trend Dashboard</h1>
        <p className="text-gray-600">Enter a stock ticker to view the last 30 days of closing prices</p>
      </div>

      <div className="bg-white p-5 rounded-lg mb-5 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Enter stock ticker (e.g., AAPL, MSFT, GOOGL)"
              className="flex-1 p-3 border border-gray-300 rounded text-base focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="px-5 py-3 bg-blue-600 text-white border-none rounded cursor-pointer text-base hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Data'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-5 border border-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-10 text-gray-600">
          Fetching stock data...
        </div>
      )}

      {stockData && !loading && (
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="mb-5 p-3 bg-gray-50 rounded">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{stockData.symbol}</h3>
            <p className="text-gray-600 text-sm mb-0">Latest Price: ${stockData.latestPrice.toFixed(2)}</p>
            <p className="text-gray-600 text-sm mb-0">Data from last 30 trading days</p>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {!stockData && !loading && !error && (
        <div className="bg-white p-5 rounded-lg shadow-md">
          <p className="text-center text-gray-600 py-10">
            Enter a stock ticker above to view the price chart
          </p>
        </div>
      )}
    </div>
  );
}

export default App;