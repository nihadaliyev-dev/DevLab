import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 12 },
  { name: "ADA", value: 8 },
  { name: "Others", value: 5 },
];

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a78bfa"];

const PortfolioDistributionCard = () => {
  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="">
        <h3 className="text-xl font-semibold">Portfolio Distribution</h3>
        <p className="text-xs text-white/60">Allocation by asset</p>
      </div>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0b0b1f",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#cbd5e1" }}
              itemStyle={{ color: "#93c5fd" }}
            />
            <Legend wrapperStyle={{ color: "#cbd5e1" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioDistributionCard;
