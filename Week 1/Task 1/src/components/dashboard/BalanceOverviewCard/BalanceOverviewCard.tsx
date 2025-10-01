import { memo, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  ChartAreaIcon,
  DollarSign,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ResizableCard from "../../ui/Card/ResizableCard";
import { type ChartDataPoint } from "../../../types";

interface BalanceOverviewCardProps {
  totalBalance?: number;
  changePct?: number;
  invested?: number;
  available?: number;
  profitLoss?: number;
  chartData?: ChartDataPoint[];
}

const defaultChartData: ChartDataPoint[] = [
  { name: "Mon", value: 1200 },
  { name: "Tue", value: 1260 },
  { name: "Wed", value: 1180 },
  { name: "Thu", value: 1340 },
  { name: "Fri", value: 1410 },
  { name: "Sat", value: 1490 },
  { name: "Sun", value: 1575 },
];

const BalanceOverviewCard = memo<BalanceOverviewCardProps>(
  ({
    totalBalance = 15750.24,
    changePct = 4.2,
    invested = 12400,
    available = 3350,
    profitLoss = 620,
    chartData = defaultChartData,
  }) => {
    const isUp = changePct >= 0;
    const chartConfig = useMemo(
      () => ({
        gradient: {
          id: "balanceGradient",
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
        },
        stops: [
          { offset: "5%", stopColor: "#60a5fa", stopOpacity: 0.35 },
          { offset: "95%", stopColor: "#60a5fa", stopOpacity: 0 },
        ],
      }),
      []
    );

    return (
      <ResizableCard>
        {({ tier }) => (
          <div className="h-full w-full">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-white/60">Total Balance</p>
                <h3
                  className={`mt-1 font-semibold tracking-tight ${
                    tier === "xs"
                      ? "text-xl"
                      : tier === "sm"
                      ? "text-2xl"
                      : tier === "md"
                      ? "text-3xl"
                      : "text-4xl"
                  }`}
                >
                  ${totalBalance.toLocaleString()}
                </h3>
                <div
                  className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                    isUp
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400"
                  }`}
                >
                  {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  <span>
                    {isUp ? "+" : ""}
                    {changePct}% today
                  </span>
                </div>
              </div>
              <div
                className={`${
                  tier === "xs"
                    ? "h-12 w-20"
                    : tier === "sm"
                    ? "h-16 w-28"
                    : tier === "md"
                    ? "h-20 w-36"
                    : "h-24 w-44"
                }`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id={chartConfig.gradient.id}
                        x1={chartConfig.gradient.x1}
                        y1={chartConfig.gradient.y1}
                        x2={chartConfig.gradient.x2}
                        y2={chartConfig.gradient.y2}
                      >
                        {chartConfig.stops.map((stop, index) => (
                          <stop
                            key={index}
                            offset={stop.offset}
                            stopColor={stop.stopColor}
                            stopOpacity={stop.stopOpacity}
                          />
                        ))}
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
                    <Tooltip
                      cursor={{
                        stroke: "#60a5fa",
                        strokeWidth: 1,
                        opacity: 0.2,
                      }}
                      contentStyle={{
                        background: "#0b0b1f",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                      }}
                      labelStyle={{ color: "#cbd5e1" }}
                      itemStyle={{ color: "#93c5fd" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      fill={`url(#${chartConfig.gradient.id})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className={`mt-4 grid gap-[0.5rem] ${
                tier === "xs"
                  ? "grid-cols-1"
                  : tier === "sm"
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              <div className="rounded-full border border-white/10 bg-white/5 shadow-[0_0_0.25rem_#fbfbfb30] hover:bg-white/4 ease-in-out transition-all px-[1rem] py-[0.5rem]">
                <div className="flex items-center gap-[0.25rem]">
                  <div className="rounded-full bg-[#212121] p-[0.25rem]">
                    <DollarSign className="w-[1.25rem] h-[1.25rem]" />
                  </div>
                  <p className="text-lg leading-6 font-medium">
                    ${invested.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs pl-[2.25rem] text-white/60">Invested</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 shadow-[0_0_0.25rem_#fbfbfb30] hover:bg-white/4 ease-in-out transition-all px-[1rem] py-[0.5rem]">
                <div className="flex items-center gap-[0.25rem]">
                  <div className="rounded-full bg-[#212121] p-[0.25rem]">
                    <CreditCard className="w-[1.25rem] h-[1.25rem]" />
                  </div>
                  <p className="text-lg leading-6 font-medium">
                    ${available.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs pl-[2.25rem] text-white/60">Available</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 shadow-[0_0_0.25rem_#fbfbfb30] hover:bg-white/4 ease-in-out transition-all px-[1rem] py-[0.5rem]">
                <div className="flex items-center gap-[0.25rem]">
                  <div className="rounded-full bg-[#212121] p-[0.25rem]">
                    <ChartAreaIcon className="w-[1.25rem] h-[1.25rem]" />
                  </div>
                  <p className="text-lg leading-6 font-medium text-emerald-400">
                    +${profitLoss.toLocaleString()}
                  </p>
                </div>
                <p className="text-xs pl-[2.25rem] text-white/60">P/L (30d)</p>
              </div>
            </div>
          </div>
        )}
      </ResizableCard>
    );
  }
);

BalanceOverviewCard.displayName = "BalanceOverviewCard";

export default BalanceOverviewCard;
