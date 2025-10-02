import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties, ReactElement } from "react";
import ErrorBoundary from "../../components/ui/ErrorBoundary/ErrorBoundary";
import { type DashboardItem } from "../../types";
import { useSettings } from "../../hooks/useSettings";

// Lazy load dashboard components for better performance
const BalanceOverviewCard = lazy(
  () =>
    import("../../components/dashboard/BalanceOverviewCard/BalanceOverviewCard")
);
const PriceChartCard = lazy(
  () => import("../../components/dashboard/PriceChartCard/PriceChartCard")
);
const PortfolioDistributionCard = lazy(
  () =>
    import(
      "../../components/dashboard/PortfolioDistributionCard/PortfolioDistributionCard"
    )
);
const ProfitLossCard = lazy(
  () => import("../../components/dashboard/ProfitLossCard/ProfitLossCard")
);
const MarketTrendsCard = lazy(
  () => import("../../components/dashboard/MarketTrendsCard/MarketTrendsCard")
);
const LivePricesCard = lazy(
  () => import("../../components/dashboard/LivePricesCard/LivePricesCard")
);
const FavoritesCard = lazy(
  () => import("../../components/dashboard/FavoritesCard/FavoritesCard")
);
const RecentTransactionsCard = lazy(
  () =>
    import(
      "../../components/dashboard/RecentTransactionsCard/RecentTransactionsCard"
    )
);
const NewsFeedCard = lazy(
  () => import("../../components/dashboard/NewsFeedCard/NewsFeedCard")
);
const SecurityStatusCard = lazy(
  () =>
    import("../../components/dashboard/SecurityStatusCard/SecurityStatusCard")
);

// Loading component for Suspense
const CardSkeleton = () => (
  <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] animate-pulse">
    <div className="h-4 bg-white/20 rounded mb-4"></div>
    <div className="h-8 bg-white/20 rounded mb-2"></div>
    <div className="h-3 bg-white/20 rounded w-2/3"></div>
  </div>
);

function SortableCard({
  id,
  colSpanClass,
  children,
}: {
  id: string;
  colSpanClass: string;
  children: ReactElement;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const indexOfScaleX = CSS.Transform.toString(transform)?.indexOf("scaleX");
  const style = {
    transform: CSS.Transform.toString(transform)?.slice(0, indexOfScaleX),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.9 : 1,
    cursor: isDragging ? "grabbing" : undefined,
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${colSpanClass} w-full !h-full`}
    >
      <div className="relative h-full">
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label="Drag card"
          className="absolute left-1/2 top-[0.5rem] -translate-x-1/2 inline-flex items-center justify-center rounded-md p-1 text-white/60 hover:text-white transition-all duration-250 cursor-grab"
          style={{ touchAction: "none" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <circle cx="6" cy="6" r="1" />
            <circle cx="10" cy="6" r="1" />
            <circle cx="14" cy="6" r="1" />
            <circle cx="6" cy="10" r="1" />
            <circle cx="10" cy="10" r="1" />
            <circle cx="14" cy="10" r="1" />
          </svg>
        </button>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}

const Dashboard = () => {
  const { cardConfigs } = useSettings();

  const cardComponents = useMemo(
    () => ({
      balance: (
        <Suspense fallback={<CardSkeleton />}>
          <BalanceOverviewCard />
        </Suspense>
      ),
      priceChart: (
        <Suspense fallback={<CardSkeleton />}>
          <PriceChartCard />
        </Suspense>
      ),
      portfolioDistribution: (
        <Suspense fallback={<CardSkeleton />}>
          <PortfolioDistributionCard />
        </Suspense>
      ),
      profitLoss: (
        <Suspense fallback={<CardSkeleton />}>
          <ProfitLossCard />
        </Suspense>
      ),
      marketTrends: (
        <Suspense fallback={<CardSkeleton />}>
          <MarketTrendsCard />
        </Suspense>
      ),
      livePrices: (
        <Suspense fallback={<CardSkeleton />}>
          <LivePricesCard />
        </Suspense>
      ),
      favorites: (
        <Suspense fallback={<CardSkeleton />}>
          <FavoritesCard />
        </Suspense>
      ),
      recentTransactions: (
        <Suspense fallback={<CardSkeleton />}>
          <RecentTransactionsCard />
        </Suspense>
      ),
      newsFeed: (
        <Suspense fallback={<CardSkeleton />}>
          <NewsFeedCard />
        </Suspense>
      ),
      securityStatus: (
        <Suspense fallback={<CardSkeleton />}>
          <SecurityStatusCard />
        </Suspense>
      ),
    }),
    []
  );

  const visibleItems: DashboardItem[] = useMemo(() => {
    return cardConfigs
      .filter((config: any) => config.visible)
      .map((config: any) => ({
        id: config.id,
        colSpanClass: config.colSpanClass,
        element: cardComponents[config.id as keyof typeof cardComponents] || (
          <div>Card not found</div>
        ),
      }));
  }, [cardConfigs, cardComponents]);

  const [itemOrder, setItemOrder] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("dashItems");
      if (!stored) return visibleItems.map((item) => item.id);
      const savedIds: unknown = JSON.parse(stored);
      if (!Array.isArray(savedIds)) return visibleItems.map((item) => item.id);
      return savedIds.filter((v): v is string => typeof v === "string");
    } catch {
      return visibleItems.map((item) => item.id);
    }
  });

  // Update item order when visible items change
  React.useEffect(() => {
    const visibleIds = visibleItems.map((item) => item.id);
    setItemOrder((prev) => {
      const newOrder = [...prev];
      // Remove items that are no longer visible
      const filtered = newOrder.filter((id) => visibleIds.includes(id));
      // Add new visible items that weren't in the order
      const newItems = visibleIds.filter((id) => !filtered.includes(id));
      return [...filtered, ...newItems];
    });
  }, [visibleItems]);

  const orderedItems = useMemo(() => {
    const itemMap = new Map(visibleItems.map((item) => [item.id, item]));
    return itemOrder
      .map((id) => itemMap.get(id))
      .filter((item): item is DashboardItem => item !== undefined);
  }, [visibleItems, itemOrder]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = itemOrder.findIndex((id) => id === active.id);
      const newIndex = itemOrder.findIndex((id) => id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const newOrder = arrayMove(itemOrder, oldIndex, newIndex);
      setItemOrder(newOrder);
      localStorage.setItem("dashItems", JSON.stringify(newOrder));
    },
    [itemOrder]
  );

  return (
    <ErrorBoundary>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedItems.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 items-stretch auto-rows-fr">
            {orderedItems.map((item) => (
              <SortableCard
                key={item.id}
                id={item.id}
                colSpanClass={item.colSpanClass}
              >
                {item.element}
              </SortableCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </ErrorBoundary>
  );
};

export default Dashboard;
