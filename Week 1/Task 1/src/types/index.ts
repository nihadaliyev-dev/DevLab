// Common types used across the application

export interface User {
  id: string;
  fullName: string;
  name: string;
  surname: string;
  status: "online" | "offline" | "away";
  avatar: string;
  email?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap?: number;
  volume24h?: number;
  icon?: string;
}

export interface PortfolioItem {
  asset: CryptoAsset;
  amount: number;
  value: number;
  allocation: number;
}

export interface Transaction {
  id: string;
  type: "buy" | "sell" | "transfer" | "receive";
  asset: string;
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
  status: "pending" | "completed" | "failed";
}

export interface ChartDataPoint {
  time?: string;
  value: number;
  price?: number;
  name?: string;
}

export interface DashboardItem {
  id: string;
  colSpanClass: string;
  element: React.ReactElement;
}

export interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component Props types
export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}
