import { Area, AreaChart, ResponsiveContainer } from "recharts";

const favorites = [
  {
    symbol: "BTC",
    price: 64210,
    data: [
      { x: 0, y: 60 },
      { x: 1, y: 64 },
      { x: 2, y: 62 },
      { x: 3, y: 66 },
      { x: 4, y: 68 },
    ],
  },
  {
    symbol: "ETH",
    price: 3180,
    data: [
      { x: 0, y: 30 },
      { x: 1, y: 31.5 },
      { x: 2, y: 29.8 },
      { x: 3, y: 32.1 },
      { x: 4, y: 31.9 },
    ],
  },
  {
    symbol: "SOL",
    price: 182.1,
    data: [
      { x: 0, y: 15 },
      { x: 1, y: 16.3 },
      { x: 2, y: 14.7 },
      { x: 3, y: 17.2 },
      { x: 4, y: 18.1 },
    ],
  },
];

const FavoritesCard = () => {
  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="mb-2">
        <h3 className="text-xl font-semibold">Favorites</h3>
        <p className="text-xs text-white/60">Quick view</p>
      </div>
      <ul className="space-y-3">
        {favorites.map((f) => (
          <li
            key={f.symbol}
            className="flex items-center justify-between gap-3"
          >
            <div className="min-w-16 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-center text-sm font-medium">
              {f.symbol}
            </div>
            <div className="h-8 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={f.data}>
                  <defs>
                    <linearGradient
                      id={`grad-${f.symbol}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#60a5fa"
                        stopOpacity={0.35}
                      />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="y"
                    type="monotone"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    fill={`url(#grad-${f.symbol})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right text-sm">
              ${f.price.toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesCard;
