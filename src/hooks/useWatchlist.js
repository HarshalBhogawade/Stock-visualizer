import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(() => {
    // Get saved watchlist from localStorage
    const saved = localStorage.getItem('stockWatchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save watchlist to localStorage whenever it changes
    localStorage.setItem('stockWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (symbol) => {
    const upperSymbol = symbol.toUpperCase();
    // Check if stock is already in watchlist
    if (!watchlist.includes(upperSymbol)) {
      setWatchlist(prev => [...prev, upperSymbol]);
      return true;
    }
    return false;
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(prev => prev.filter(stock => stock !== symbol.toUpperCase()));
  };

  const isInWatchlist = (symbol) => {
    return watchlist.includes(symbol.toUpperCase());
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};