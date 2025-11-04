import React from 'react';

const Watchlist = ({ watchlist, onSelectStock, onRemoveStock, currentStock }) => {
  if (watchlist.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Watchlist
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm text-center py-8">
          No stocks saved yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-700 p-5 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        Watchlist
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
        {watchlist.length} {watchlist.length === 1 ? 'stock' : 'stocks'}
      </p>
      
      <div className="space-y-2">
        {watchlist.map((stock) => (
          <div
            key={stock}
            className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
              currentStock === stock
                ? 'bg-blue-50 dark:bg-blue-800/30 border-blue-300 dark:border-blue-600'
                : 'bg-white dark:bg-slate-600 border-gray-200 dark:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-500'
            }`}
          >
            <button
              onClick={() => onSelectStock(stock)}
              className="flex-1 text-left font-medium text-sm text-gray-900 dark:text-white"
            >
              {stock}
            </button>
            
            <button
              onClick={() => onRemoveStock(stock)}
              className="ml-3 text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label={`Remove ${stock}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;