# Hyperliquid BTC-USD Chart

A React app that displays BTC-USD candlestick data from [Hyperliquid](https://hyperliquid.xyz)'s public API using [lightweight-charts](https://tradingview.github.io/lightweight-charts/).

## Features

- Fetches last 7 days of 1-hour candles from Hyperliquid API
- Interactive candlestick chart with zoom and pan
- Green/red candles for up/down price movement

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Build for production |

## Project Structure

```
src/
├── main.tsx                    # React entry point
├── App.tsx                     # Main app component
└── components/
    └── HyperliquidChart.tsx    # Chart with API fetching
```

## API Reference

Uses Hyperliquid's [Info Endpoint](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint) to fetch candlestick data.

**Endpoint:** `POST https://api.hyperliquid.xyz/info`

**Parameters:**
- `coin` — Asset symbol (e.g., `"BTC"`)
- `interval` — Candle interval (`"1m"`, `"5m"`, `"15m"`, `"1h"`, `"4h"`, `"1d"`)
- `startTime` / `endTime` — Unix timestamps in milliseconds

## Tech Stack

- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) 5.9
- [Vite](https://vite.dev) 7
- [lightweight-charts](https://tradingview.github.io/lightweight-charts/) 5.1

## License

MIT
