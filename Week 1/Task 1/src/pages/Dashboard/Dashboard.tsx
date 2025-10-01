import { useState, useMemo, useCallback, Suspense, lazy } from "react";
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
  const defaultItems: DashboardItem[] = useMemo(
    () => [
      {
        id: "balance",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <BalanceOverviewCard />
          </Suspense>
        ),
      },
      {
        id: "priceChart",
        colSpanClass: "xl:col-span-2",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <PriceChartCard />
          </Suspense>
        ),
      },
      {
        id: "portfolioDistribution",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <PortfolioDistributionCard />
          </Suspense>
        ),
      },
      {
        id: "profitLoss",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <ProfitLossCard />
          </Suspense>
        ),
      },
      {
        id: "marketTrends",
        colSpanClass: "xl:col-span-2",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <MarketTrendsCard />
          </Suspense>
        ),
      },
      {
        id: "livePrices",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <LivePricesCard />
          </Suspense>
        ),
      },
      {
        id: "favorites",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <FavoritesCard />
          </Suspense>
        ),
      },
      {
        id: "recentTransactions",
        colSpanClass: "xl:col-span-2",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <RecentTransactionsCard />
          </Suspense>
        ),
      },
      {
        id: "newsFeed",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <NewsFeedCard />
          </Suspense>
        ),
      },
      {
        id: "securityStatus",
        colSpanClass: "xl:col-span-1",
        element: (
          <Suspense fallback={<CardSkeleton />}>
            <SecurityStatusCard />
          </Suspense>
        ),
      },
    ],
    []
  );

  const [items, setItems] = useState<DashboardItem[]>(() => {
    try {
      const stored = localStorage.getItem("dashItems");
      if (!stored) return defaultItems;
      const savedIds: unknown = JSON.parse(stored);
      if (!Array.isArray(savedIds)) return defaultItems;
      const idOrder = savedIds.filter(
        (v): v is string => typeof v === "string"
      );
      if (idOrder.length === 0) return defaultItems;

      const byId = new Map(defaultItems.map((it) => [it.id, it] as const));
      const ordered: DashboardItem[] = [];

      for (const id of idOrder) {
        const match = byId.get(id);
        if (match) ordered.push(match);
      }

      for (const it of defaultItems) {
        if (!idOrder.includes(it.id)) ordered.push(it);
      }

      return ordered.length ? ordered : defaultItems;
    } catch {
      return defaultItems;
    }
  });

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      const ids = newItems.map((i) => i.id);
      localStorage.setItem("dashItems", JSON.stringify(ids));
    },
    [items]
  );

  return (
    <ErrorBoundary>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 items-stretch auto-rows-fr">
            {items.map((item) => (
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
