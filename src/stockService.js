import axios from 'axios';

// Use environment variable for API key (falls back to 'demo' for development)
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY || 'demo';
const BASE_URL = 'https://www.alphavantage.co/query';

export const stockService = {
  async getStockData(symbol) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_DAILY',
          symbol: symbol.toUpperCase(),
          apikey: API_KEY,
          outputsize: 'compact'
        }
      });

      const data = response.data;

      // Check for API errors
      if (data['Error Message']) {
        throw new Error('Invalid stock ticker. Please check the symbol and try again.');
      }

      if (data['Note']) {
        throw new Error('API call limit reached. Please wait a minute and try again.');
      }

      const timeSeries = data['Time Series (Daily)'];
      if (!timeSeries) {
        throw new Error('No data found for this stock ticker.');
      }

      // Process the data
      const dates = Object.keys(timeSeries).slice(0, 30).reverse();
      const prices = dates.map(date => parseFloat(timeSeries[date]['4. close']));
      
      return {
        symbol: symbol.toUpperCase(),
        dates: dates,
        prices: prices,
        latestPrice: prices[prices.length - 1],
        metadata: data['Meta Data']
      };

    } catch (error) {
      if (error.message.includes('Invalid stock ticker') || 
          error.message.includes('API call limit') || 
          error.message.includes('No data found')) {
        throw error;
      }
      throw new Error('Failed to fetch stock data. Please check your internet connection.');
    }
  }
};