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
import { useWatchlist } from './hooks/useWatchlist';
import ThemeToggle from './components/ThemeToggle';
import Watchlist from './components/Watchlist';
import PopularStocks from './components/PopularStocks';

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
  
  // Watchlist hook
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const fetchStockData = async (symbol = ticker) => {
    const stockSymbol = symbol || ticker;
    if (!stockSymbol.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    setLoading(true);
    setError('');
    setTicker(stockSymbol);
    
    try {
      const data = await stockService.getStockData(stockSymbol);
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

  const handleAddToWatchlist = () => {
    if (stockData) {
      const added = addToWatchlist(stockData.symbol);
      if (added) {
        setError('');
      }
    }
  };

  const handleSelectFromWatchlist = (symbol) => {
    fetchStockData(symbol);
  };

  const handleRemoveFromWatchlist = (symbol) => {
    removeFromWatchlist(symbol);
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
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151',
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: stockData ? `${stockData.symbol} - Last 30 Days` : 'Stock Price Chart',
        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        font: {
          size: 14
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
          font: {
            size: 11
          }
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
          font: {
            size: 10
          }
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
          font: {
            size: 11
          }
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280',
          font: {
            size: 10
          }
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              FinSight
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stock trend analysis dashboard
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Form */}
            <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter stock ticker (e.g., AAPL)"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Search'}
                  </button>
                </div>
              </form>
              
              {/* Popular Stocks */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Quick access:</p>
                <div className="flex flex-wrap gap-2">
                  {['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX'].map((stock) => (
                    <button
                      key={stock}
                      onClick={() => fetchStockData(stock)}
                      disabled={loading}
                      className="px-3 py-1 bg-white dark:bg-slate-600 hover:bg-gray-100 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200 text-xs font-medium rounded border border-gray-300 dark:border-slate-500 transition-colors disabled:opacity-50"
                    >
                      {stock}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-300 text-sm">
                Loading stock data...
              </div>
            )}

            {/* Stock Data Chart */}
            {stockData && !loading && (
              <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-lg">
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {stockData.symbol}
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white font-medium mt-1">
                      ${stockData.latestPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">
                      Last 30 days
                    </p>
                  </div>
                  <button
                    onClick={handleAddToWatchlist}
                    disabled={isInWatchlist(stockData.symbol)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isInWatchlist(stockData.symbol)
                        ? 'bg-gray-200 dark:bg-slate-600 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isInWatchlist(stockData.symbol) ? '✓ Saved' : '+ Watchlist'}
                  </button>
                </div>
                <div className="h-64 bg-white dark:bg-slate-200 p-3 rounded">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Empty State */}
            {!stockData && !loading && !error && (
              <div className="bg-gray-50 dark:bg-slate-700 p-12 rounded-lg text-center">
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Search or select a stock to view its price chart
                </p>
              </div>
            )}
          </div>

          {/* Watchlist - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            <Watchlist
              watchlist={watchlist}
              onSelectStock={handleSelectFromWatchlist}
              onRemoveStock={handleRemoveFromWatchlist}
              currentStock={stockData?.symbol}
            />
            
            <PopularStocks
              onSelectStock={handleSelectFromWatchlist}
              currentStock={stockData?.symbol}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;