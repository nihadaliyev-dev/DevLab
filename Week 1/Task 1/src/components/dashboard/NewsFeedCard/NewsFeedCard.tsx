import { ExternalLink } from "lucide-react";

const news = [
  {
    id: "1",
    title: "Bitcoin breaks resistance amid broader crypto rally",
    source: "CoinDesk",
    time: "1h ago",
  },
  {
    id: "2",
    title: "Ethereum upgrade set to cut L2 costs further",
    source: "The Block",
    time: "3h ago",
  },
  {
    id: "3",
    title: "Solana ecosystem sees surge in DeFi activity",
    source: "Decrypt",
    time: "6h ago",
  },
];

const NewsFeedCard = () => {
  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="mb-2">
        <h3 className="text-xl font-semibold">News Feed</h3>
        <p className="text-xs text-white/60">Latest headlines</p>
      </div>
      <ul className="space-y-3">
        {news.map((n) => (
          <li key={n.id} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium leading-snug">{n.title}</p>
              <p className="text-xs text-white/60">
                {n.source} • {n.time}
              </p>
            </div>
            <button className="rounded-md border border-white/10 bg-white/5 p-1.5 text-white/70 hover:bg-white/10">
              <ExternalLink size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeedCard;
