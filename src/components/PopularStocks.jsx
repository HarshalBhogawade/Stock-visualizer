import React from 'react';

const PopularStocks = ({ onSelectStock, currentStock, loading }) => {
  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'GOOGL', name: 'Alphabet' },
    { symbol: 'AMZN', name: 'Amazon' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'META', name: 'Meta' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'NFLX', name: 'Netflix' },
    { symbol: 'ORCL', name: 'Oracle' },
    { symbol: 'ADBE', name: 'Adobe' },
    { symbol: 'CRM', name: 'Salesforce' },
    { symbol: 'INTC', name: 'Intel' },
    { symbol: 'AMD', name: 'Advanced Micro Devices' },
    { symbol: 'PYPL', name: 'PayPal' },
    { symbol: 'DIS', name: 'Walt Disney' },
    { symbol: 'UBER', name: 'Uber Technologies' },
    { symbol: 'BABA', name: 'Alibaba Group' },
    { symbol: 'V', name: 'Visa' },
    { symbol: 'MA', name: 'Mastercard' },
    { symbol: 'JPM', name: 'JPMorgan Chase' },
    { symbol: 'JNJ', name: 'Johnson & Johnson' },
    { symbol: 'PG', name: 'Procter & Gamble' },
    { symbol: 'UNH', name: 'UnitedHealth Group' },
    { symbol: 'HD', name: 'Home Depot' },
    { symbol: 'BAC', name: 'Bank of America' },
    { symbol: 'XOM', name: 'Exxon Mobil' },
    { symbol: 'CVX', name: 'Chevron' },
    { symbol: 'LLY', name: 'Eli Lilly' },
    { symbol: 'ABBV', name: 'AbbVie' },
    { symbol: 'KO', name: 'Coca-Cola' },
    { symbol: 'PEP', name: 'PepsiCo' },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific' },
    { symbol: 'COST', name: 'Costco Wholesale' },
    { symbol: 'AVGO', name: 'Broadcom' },
    { symbol: 'ACN', name: 'Accenture' },
    { symbol: 'CMCSA', name: 'Comcast' },
    { symbol: 'DHR', name: 'Danaher' },
    { symbol: 'VZ', name: 'Verizon' },
    { symbol: 'ABT', name: 'Abbott Laboratories' },
    { symbol: 'TXN', name: 'Texas Instruments' },
    { symbol: 'CRM', name: 'Salesforce' },
    { symbol: 'QCOM', name: 'Qualcomm' },
    { symbol: 'WMT', name: 'Walmart' },
    { symbol: 'MCD', name: 'McDonald\'s' },
    { symbol: 'IBM', name: 'IBM' },
    { symbol: 'CAT', name: 'Caterpillar' },
    { symbol: 'GS', name: 'Goldman Sachs' },
    { symbol: 'BA', name: 'Boeing' },
    { symbol: 'MMM', name: '3M Company' },
    { symbol: 'HON', name: 'Honeywell' },
    { symbol: 'UPS', name: 'United Parcel Service' },
    { symbol: 'LOW', name: 'Lowe\'s' },
    { symbol: 'SPGI', name: 'S&P Global' },
    { symbol: 'BLK', name: 'BlackRock' },
    { symbol: 'C', name: 'Citigroup' },
    { symbol: 'AXP', name: 'American Express' },
    { symbol: 'MDT', name: 'Medtronic' },
    { symbol: 'GILD', name: 'Gilead Sciences' },
    { symbol: 'AMGN', name: 'Amgen' },
    { symbol: 'CVS', name: 'CVS Health' },
    { symbol: 'SBUX', name: 'Starbucks' },
    { symbol: 'MO', name: 'Altria Group' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        Popular Stocks
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
        {popularStocks.length} popular stocks - Click to view charts
      </p>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {popularStocks.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            disabled={loading}
            className={`w-full text-left p-3 rounded-md border transition-colors ${
              currentStock === stock.symbol
                ? 'bg-blue-50 dark:bg-blue-800/30 border-blue-300 dark:border-blue-600'
                : 'bg-white dark:bg-slate-600 border-gray-200 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-sm text-gray-900 dark:text-white block">
                  {stock.symbol}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-300">
                  {stock.name}
                </span>
              </div>
              <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularStocks;