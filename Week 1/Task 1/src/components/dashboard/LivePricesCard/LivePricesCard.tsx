import { memo } from "react";
import { MoreHorizontalIcon } from "lucide-react";
import Card from "../../ui/Card/Card";
import { type CryptoAsset } from "../../../types";
import btcIcon from "../../../assets/Bitcoin.svg";
import solIcon from "../../../assets/Solana.svg";
import ethIcon from "../../../assets/Ethereum.svg";
import adaIcon from "../../../assets/Cardano.svg";

interface LivePricesCardProps {
  assets?: CryptoAsset[];
  title?: string;
  subtitle?: string;
}

const defaultAssets: CryptoAsset[] = [
  {
    icon: btcIcon,
    symbol: "BTC",
    name: "Bitcoin",
    price: 64210.12,
    change: 1.24,
    changePercent: 1.24,
  },
  {
    icon: ethIcon,
    symbol: "ETH",
    name: "Ethereum",
    price: 3180.45,
    change: -0.58,
    changePercent: -0.58,
  },
  {
    icon: solIcon,
    symbol: "SOL",
    name: "Solana",
    price: 182.1,
    change: 2.9,
    changePercent: 2.9,
  },
  {
    icon: adaIcon,
    symbol: "ADA",
    name: "Cardano",
    price: 0.52,
    change: -1.1,
    changePercent: -1.1,
  },
];

const LivePricesCard = memo<LivePricesCardProps>(
  ({
    assets = defaultAssets,
    title = "Live Prices",
    subtitle = "Top assets",
  }) => {
    return (
      <Card className="h-full">
        <div className="flex items-center justify-between pb-[1rem]">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-xs text-white/60">{subtitle}</p>
          </div>
          <button
            className="rounded-full bg-[#212121] p-[0.25rem] cursor-pointer hover:bg-[#2a2a2a] transition-colors"
            aria-label="More options"
          >
            <MoreHorizontalIcon />
          </button>
        </div>
        <div className="overflow-hidden rounded-lg">
          {assets.map((asset) => (
            <div
              key={asset.symbol}
              className="flex gap-[0.8rem] items-center justify-left rounded-[1.5rem] py-[0.75rem] px-[0.5rem] bg-linear-to-r transition-all ease-in-out from:transparent via:transparent to-transparent hover:via-[#fbfbfb20]"
            >
              <div className="rounded-full h-full w-[2.4rem]">
                <img
                  src={asset.icon}
                  className="w-full h-full"
                  alt={asset.name}
                />
              </div>
              <div className="flex flex-col w-[60%]">
                <p className="font-medium text-lg">{asset.name}</p>
                <p className="font-normal text-xs text-white/60">
                  {asset.symbol}
                </p>
              </div>
              <div
                className={`font-medium text-sm ${
                  asset.change > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change > 0 ? "+" : ""}
                {asset.changePercent}%
              </div>
              <div className="font-medium text-lg">
                ${asset.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
);

LivePricesCard.displayName = "LivePricesCard";

export default LivePricesCard;
