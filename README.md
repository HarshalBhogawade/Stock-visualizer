# FinSight: Stock Trend Dashboard

A simple React application to visualize stock prices over the last 30 days.

## Features

- Enter any stock ticker (AAPL, MSFT, GOOGL, etc.)
- View closing prices for the last 30 trading days
- Interactive line chart with hover tooltips
- Clean, responsive interface with Tailwind CSS
- Error handling for invalid tickers and API issues

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HarshalBhogawade/Stock-visualizer.git
   cd Stock-visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Alpha Vantage API key.

4. **Build Tailwind CSS:**
   ```bash
   npm run tailwind:build
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

Get your free API key from: https://www.alphavantage.co/support/#api-key

4. **Run the application:**
   ```
   npm run dev
   ```

5. **Open your browser:**
   - Go to http://localhost:3000

## How to Use

1. Enter a stock ticker symbol (e.g., AAPL for Apple, MSFT for Microsoft)
2. Click "Get Data" button
3. View the price chart showing the last 30 days
4. Hover over data points to see exact values

## Common Stock Tickers

- AAPL (Apple)
- MSFT (Microsoft)
- GOOGL (Google)
- AMZN (Amazon)
- TSLA (Tesla)
- META (Meta/Facebook)
- NVDA (NVIDIA)
- NFLX (Netflix)

## Technical Details

- **Frontend**: React 18 with Vite
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **API**: Alpha Vantage (free tier)
- **Styling**: Tailwind CSS

## Development Scripts

- `npm run dev` - Start development server
- `npm run tailwind:build` - Build Tailwind CSS once
- `npm run tailwind:watch` - Watch and rebuild Tailwind CSS on changes
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages

## Deployment to GitHub Pages

1. **Build the project:**
   ```bash
   npm run predeploy
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

The app will be available at: `https://harshalbhogawade.github.io/Stock-visualizer/`

## API Limitations

The free Alpha Vantage API has some limitations:
- 5 API requests per minute
- 500 requests per day
- Demo data available without API key (limited symbols)

## Troubleshooting

**"API call limit reached"**: Wait a minute and try again, or get a paid API key.

**"Invalid stock ticker"**: Make sure you're using a valid stock symbol (usually 3-5 letters).

**"Failed to fetch data"**: Check your internet connection and API key.

**Chart not showing**: Make sure the stock ticker is valid and data was returned.

## File Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # React entry point
├── index.css        # Simple styling
└── index.html       # HTML template
```

## Build for Production

```
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.