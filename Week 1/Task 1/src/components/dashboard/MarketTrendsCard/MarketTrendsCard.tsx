import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";

const chartData = [
  { name: "Jan", open: 180, high: 200, low: 170, close: 195, volume: 45 },
  { name: "Feb", open: 195, high: 210, low: 185, close: 205, volume: 52 },
  { name: "Mar", open: 205, high: 220, low: 190, close: 215, volume: 48 },
  { name: "Apr", open: 215, high: 230, low: 200, close: 225, volume: 55 },
  { name: "May", open: 225, high: 240, low: 210, close: 235, volume: 58 },
  { name: "Jun", open: 235, high: 250, low: 220, close: 245, volume: 62 },
  { name: "Jul", open: 245, high: 260, low: 230, close: 255, volume: 60 },
  { name: "Aug", open: 255, high: 270, low: 240, close: 265, volume: 65 },
  { name: "Sep", open: 265, high: 280, low: 250, close: 275, volume: 68 },
  { name: "Oct", open: 275, high: 290, low: 260, close: 285, volume: 70 },
  { name: "Nov", open: 285, high: 300, low: 270, close: 295, volume: 72 },
  { name: "Dec", open: 295, high: 310, low: 280, close: 305, volume: 75 },
];

const MarketTrendsCard = () => {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f0f23] to-[#1a1a2e] p-4 sm:p-6 text-white overflow-hidden flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              $254,596.04
            </h2>
            <span className="text-green-400 text-sm sm:text-lg font-medium">
              (+12.93%)
            </span>
          </div>

          {/* Crypto Name */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-sm"></div>
            <span className="text-white/80 text-sm sm:text-base">
              Ethereum - ETH
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex bg-white/5 rounded-lg p-1">
            <button className="px-2 sm:px-3 py-1 text-xs text-white/60 hover:text-white transition-colors">
              Market cap
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs bg-white text-gray-900 rounded-md">
              Price
            </button>
          </div>

          <div className="flex gap-1">
            {["1D", "2D", "7D", "1M"].map((period) => (
              <button
                key={period}
                className="px-2 py-1 text-xs text-white/60 hover:text-white transition-colors"
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <div className="flex-shrink-0 w-full lg:w-48">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-white/60 text-sm mb-1">Capital</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-300">
                2.25 T
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-white/60 text-sm mb-1">Avg volume</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-300">
                53.86 M
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
              <p className="text-white/60 text-sm mb-1">Volume</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-300">
                53.86 M
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <YAxis
                domain={[0, 320]}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#0b0b1f] border border-white/10 rounded-lg p-3 shadow-lg backdrop-blur-sm">
                        <p className="text-white text-sm mb-2">
                          15 {label} 2024
                        </p>
                        <div className="space-y-1">
                          <p className="text-blue-300 text-xs">• $20,047.00</p>
                          <p className="text-green-300 text-xs">• $20,190.00</p>
                          <p className="text-blue-300 text-xs">• $19,961.00</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="close"
                fill="url(#volumeGradient)"
                radius={[2, 2, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketTrendsCard;
