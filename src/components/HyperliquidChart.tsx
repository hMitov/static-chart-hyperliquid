import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries, type CandlestickData, type Time } from "lightweight-charts";

async function fetchCandles(): Promise<CandlestickData<Time>[]> {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

  const response = await fetch("https://api.hyperliquid.xyz/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "candleSnapshot",
      req: {
        coin: "BTC",
        interval: "1h",
        startTime: oneWeekAgo,
        endTime: now,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch candle data");
  }

  const rawData = await response.json();

  // Transform Hyperliquid format → lightweight-charts format
  return rawData.map((candle: { t: number; o: string; h: string; l: string; c: string }) => ({
    time: Math.floor(candle.t / 1000) as Time,
    open: parseFloat(candle.o),
    high: parseFloat(candle.h),
    low: parseFloat(candle.l),
    close: parseFloat(candle.c),
  }));
}

export default function HyperliquidChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const chart = createChart(container.current, {
      width: 800,
      height: 450,
      layout: {
        background: { color: "#0f0f0f" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1f1f1f" },
        horzLines: { color: "#1f1f1f" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Fetch real data from Hyperliquid
    fetchCandles()
      .then((candles) => {
        candleSeries.setData(candles);
        chart.timeScale().fitContent();
        console.log(`Loaded ${candles.length} candles from Hyperliquid`);
      })
      .catch((err) => {
        console.error("Failed to load candle data:", err);
      });

    return () => chart.remove();
  }, []);

  return (
    <div>
      <h3>Hyperliquid BTC-USD (1H) - Last 7 Days</h3>
      <div ref={container} />
    </div>
  );
}
