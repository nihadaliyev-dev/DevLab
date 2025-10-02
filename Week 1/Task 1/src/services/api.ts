import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import {
  type ApiResponse,
  type CryptoAsset,
  type ChartDataPoint,
  type Transaction,
} from "../types";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic API methods
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      return new Error(error.response.data?.message || "Server error occurred");
    } else if (error.request) {
      // Request was made but no response received
      return new Error("Network error - please check your connection");
    } else {
      // Something else happened
      return new Error(error.message || "An unexpected error occurred");
    }
  }

  // Specific API methods for crypto dashboard
  async getCryptoAssets(): Promise<CryptoAsset[]> {
    const response = await this.get<CryptoAsset[]>("/assets");
    return response.data;
  }

  async getChartData(
    symbol: string,
    timeframe: string = "1h"
  ): Promise<ChartDataPoint[]> {
    const response = await this.get<ChartDataPoint[]>(
      `/charts/${symbol}?timeframe=${timeframe}`
    );
    return response.data;
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await this.get<Transaction[]>("/transactions");
    return response.data;
  }

  async getPortfolioData(): Promise<{
    totalBalance: number;
    changePercent: number;
    invested: number;
    available: number;
    profitLoss: number;
  }> {
    const response = await this.get<{
      totalBalance: number;
      changePercent: number;
      invested: number;
      available: number;
      profitLoss: number;
    }>("/portfolio");
    return response.data;
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
