import { memo, useMemo, useState, useCallback } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
} from "recharts";
import { Clock } from "lucide-react";
import Card from "../../ui/Card/Card";
import { type ChartDataPoint } from "../../../types";

interface PriceChartCardProps {
  data?: ChartDataPoint[];
  currentPrice?: number;
  title?: string;
  subtitle?: string;
  interval?: string;
}

const defaultData: ChartDataPoint[] = [
  { time: "09:00", value: 120, price: 120 },
  { time: "10:00", value: 124, price: 124 },
  { time: "11:00", value: 121, price: 121 },
  { time: "12:00", value: 129, price: 129 },
  { time: "13:00", value: 133, price: 133 },
  { time: "14:00", value: 131, price: 131 },
  { time: "15:00", value: 137, price: 137 },
  { time: "16:00", value: 142, price: 142 },
];

const PriceChartCard = memo<PriceChartCardProps>(
  ({
    data = defaultData,
    currentPrice = 142.0,
    title = "Price Chart",
    subtitle = "Today",
    interval = "1m interval",
  }) => {
    const [brush, setBrush] = useState<{ start?: string; end?: string }>({});

    const handleMouseDown = useCallback((e: any) => {
      if (e) setBrush({ start: e.activeLabel as string });
    }, []);

    const handleMouseMove = useCallback(
      (e: any) => {
        if (brush.start && e) {
          setBrush((b) => ({ ...b, end: e.activeLabel as string }));
        }
      },
      [brush.start]
    );

    const handleMouseUp = useCallback(() => {
      setBrush({});
    }, []);

    const chartConfig = useMemo(
      () => ({
        gradient: {
          id: "lineGradient",
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
        },
        stops: [
          { offset: "0%", stopColor: "#34d399" },
          { offset: "100%", stopColor: "#60a5fa" },
        ],
      }),
      []
    );

    return (
      <Card className="h-full flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-xs text-white/60">
              {subtitle}{" "}
              <span className="ml-1 inline-flex items-center gap-1 text-white/50">
                <Clock size={12} /> {interval}
              </span>
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm">
            ${currentPrice.toFixed(2)}
          </div>
        </div>

        <div className="w-full flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
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
                    />
                  ))}
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#ffffff10" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#ffffff10" }}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  background: "#0b0b1f",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "#cbd5e1" }}
                itemStyle={{ color: "#93c5fd" }}
              />
              {brush.start && brush.end && (
                <ReferenceArea
                  x1={brush.start}
                  x2={brush.end}
                  strokeOpacity={0.15}
                  fill="#60a5fa"
                  fillOpacity={0.08}
                />
              )}
              <Line
                type="monotone"
                dataKey="price"
                stroke={`url(#${chartConfig.gradient.id})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }
);

PriceChartCard.displayName = "PriceChartCard";

export default PriceChartCard;
