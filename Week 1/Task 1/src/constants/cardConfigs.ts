export interface CardConfig {
  id: string;
  name: string;
  visible: boolean;
  colSpanClass: string;
}

export const defaultCardConfigs: CardConfig[] = [
  {
    id: "balance",
    name: "Balance Overview",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "priceChart",
    name: "Price Chart",
    visible: true,
    colSpanClass: "xl:col-span-2",
  },
  {
    id: "portfolioDistribution",
    name: "Portfolio Distribution",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "profitLoss",
    name: "Profit & Loss",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "marketTrends",
    name: "Market Trends",
    visible: true,
    colSpanClass: "xl:col-span-2",
  },
  {
    id: "livePrices",
    name: "Live Prices",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "favorites",
    name: "Favorites",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "recentTransactions",
    name: "Recent Transactions",
    visible: true,
    colSpanClass: "xl:col-span-2",
  },
  {
    id: "newsFeed",
    name: "News Feed",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
  {
    id: "securityStatus",
    name: "Security Status",
    visible: true,
    colSpanClass: "xl:col-span-1",
  },
];
