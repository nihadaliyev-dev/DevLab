import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const txs = [
  {
    id: "1",
    type: "buy",
    asset: "BTC",
    amount: 0.015,
    value: 963.2,
    time: "2h ago",
  },
  {
    id: "2",
    type: "sell",
    asset: "ETH",
    amount: 0.5,
    value: 1590.0,
    time: "5h ago",
  },
  {
    id: "3",
    type: "buy",
    asset: "SOL",
    amount: 3.2,
    value: 582.7,
    time: "1d ago",
  },
  {
    id: "4",
    type: "buy",
    asset: "ADA",
    amount: 300,
    value: 156.0,
    time: "2d ago",
  },
];

const RecentTransactionsCard = () => {
  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <p className="text-xs text-white/60">Last activity</p>
      </div>
      <ul className="divide-y divide-white/10">
        {txs.map((t) => (
          <li key={t.id} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  t.type === "buy"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-rose-500/15 text-rose-400"
                }`}
              >
                {t.type === "buy" ? (
                  <ArrowDownLeft size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </span>
              <div>
                <p className="text-sm font-medium capitalize">
                  {t.type} {t.asset}
                </p>
                <p className="text-xs text-white/60">{t.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">${t.value.toLocaleString()}</p>
              <p className="text-xs text-white/60">
                {t.amount} {t.asset}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactionsCard;
