import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const data = [
  { name: "Mon", profit: 120 },
  { name: "Tue", profit: -40 },
  { name: "Wed", profit: 80 },
  { name: "Thu", profit: 150 },
  { name: "Fri", profit: -20 },
  { name: "Sat", profit: 60 },
  { name: "Sun", profit: 110 },
];

const ProfitLossCard = () => {
  const total = data.reduce((acc, d) => acc + d.profit, 0);
  const isGain = total >= 0;

  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Profit / Loss (7d)</h3>
          <p className="text-xs text-white/60">Daily net change</p>
        </div>
        <div
          className={`inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1 text-sm ${
            isGain
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-rose-500/15 text-rose-400"
          }`}
        >
          {isGain ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {isGain ? "+" : ""}${Math.abs(total).toFixed(0)}
        </div>
      </div>

      <div className="h-[90%] w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#ffffff10" }}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#ffffff10" }}
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
            <Bar dataKey="profit" radius={[6, 6, 0, 0]} fill="#fbfbfba0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitLossCard;
