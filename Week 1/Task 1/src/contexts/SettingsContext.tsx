import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CardConfig {
  id: string;
  name: string;
  visible: boolean;
  colSpanClass: string;
}

export interface SettingsContextValue {
  // Card visibility settings
  cardConfigs: CardConfig[];
  toggleCardVisibility: (cardId: string) => void;
  updateCardConfigs: (configs: CardConfig[]) => void;

  // Layout settings
  navbarLayout: "sidebar" | "header";
  setNavbarLayout: (layout: "sidebar" | "header") => void;

  // Settings modal
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const defaultCardConfigs: CardConfig[] = [
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

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [cardConfigs, setCardConfigs] = useState<CardConfig[]>(() => {
    try {
      const stored = localStorage.getItem("dashboardCardConfigs");
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : defaultCardConfigs;
      }
    } catch (error) {
      console.error("Error loading card configs from localStorage:", error);
    }
    return defaultCardConfigs;
  });

  const [navbarLayout, setNavbarLayoutState] = useState<"sidebar" | "header">(
    () => {
      try {
        const stored = localStorage.getItem("navbarLayout");
        return (stored as "sidebar" | "header") || "header";
      } catch (error) {
        console.error("Error loading navbar layout from localStorage:", error);
        return "header";
      }
    }
  );

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("dashboardCardConfigs", JSON.stringify(cardConfigs));
    } catch (error) {
      console.error("Error saving card configs to localStorage:", error);
    }
  }, [cardConfigs]);

  useEffect(() => {
    try {
      localStorage.setItem("navbarLayout", navbarLayout);
    } catch (error) {
      console.error("Error saving navbar layout to localStorage:", error);
    }
  }, [navbarLayout]);

  const toggleCardVisibility = (cardId: string) => {
    setCardConfigs((prev) =>
      prev.map((config) =>
        config.id === cardId ? { ...config, visible: !config.visible } : config
      )
    );
  };

  const updateCardConfigs = (configs: CardConfig[]) => {
    setCardConfigs(configs);
  };

  const setNavbarLayout = (layout: "sidebar" | "header") => {
    setNavbarLayoutState(layout);
  };

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const value: SettingsContextValue = {
    cardConfigs,
    toggleCardVisibility,
    updateCardConfigs,
    navbarLayout,
    setNavbarLayout,
    isSettingsOpen,
    openSettings,
    closeSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
