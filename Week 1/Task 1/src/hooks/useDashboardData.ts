import { useState, useEffect, useCallback } from "react";
import {
  type CryptoAsset,
  type ChartDataPoint,
  type Transaction,
} from "../types";

interface DashboardData {
  assets: CryptoAsset[];
  chartData: ChartDataPoint[];
  transactions: Transaction[];
  totalBalance: number;
  changePercent: number;
  loading: boolean;
  error: string | null;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>({
    assets: [],
    chartData: [],
    transactions: [],
    totalBalance: 0,
    changePercent: 0,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API calls with realistic delays
      const [assetsResponse, chartResponse, transactionsResponse] =
        await Promise.all([
          // Simulate assets API call
          new Promise<CryptoAsset[]>((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  symbol: "BTC",
                  name: "Bitcoin",
                  price: 64210.12,
                  change: 1.24,
                  changePercent: 1.24,
                },
                {
                  symbol: "ETH",
                  name: "Ethereum",
                  price: 3180.45,
                  change: -0.58,
                  changePercent: -0.58,
                },
                {
                  symbol: "SOL",
                  name: "Solana",
                  price: 182.1,
                  change: 2.9,
                  changePercent: 2.9,
                },
                {
                  symbol: "ADA",
                  name: "Cardano",
                  price: 0.52,
                  change: -1.1,
                  changePercent: -1.1,
                },
              ]);
            }, 500);
          }),

          // Simulate chart data API call
          new Promise<ChartDataPoint[]>((resolve) => {
            setTimeout(() => {
              resolve([
                { time: "09:00", value: 120, price: 120 },
                { time: "10:00", value: 124, price: 124 },
                { time: "11:00", value: 121, price: 121 },
                { time: "12:00", value: 129, price: 129 },
                { time: "13:00", value: 133, price: 133 },
                { time: "14:00", value: 131, price: 131 },
                { time: "15:00", value: 137, price: 137 },
                { time: "16:00", value: 142, price: 142 },
              ]);
            }, 300);
          }),

          // Simulate transactions API call
          new Promise<Transaction[]>((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  id: "1",
                  type: "buy",
                  asset: "BTC",
                  amount: 0.1,
                  price: 64000,
                  total: 6400,
                  timestamp: new Date(),
                  status: "completed",
                },
                {
                  id: "2",
                  type: "sell",
                  asset: "ETH",
                  amount: 2.5,
                  price: 3200,
                  total: 8000,
                  timestamp: new Date(Date.now() - 3600000),
                  status: "completed",
                },
              ]);
            }, 400);
          }),
        ]);

      const totalBalance = 15750.24;
      const changePercent = 4.2;

      setData({
        assets: assetsResponse,
        chartData: chartResponse,
        transactions: transactionsResponse,
        totalBalance,
        changePercent,
        loading: false,
        error: null,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch data",
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    refreshData,
  };
};
