import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  SmartphoneNfc,
} from "lucide-react";

const items = [
  {
    id: "1",
    title: "2FA Enabled",
    desc: "Authenticator app active",
    ok: true,
    icon: SmartphoneNfc,
  },
  {
    id: "2",
    title: "Recovery Phrase",
    desc: "Backed up securely",
    ok: true,
    icon: KeyRound,
  },
  {
    id: "3",
    title: "Login Alerts",
    desc: "Email alerts disabled",
    ok: false,
    icon: ShieldAlert,
  },
];

const SecurityStatusCard = () => {
  const allGood = items.every((i) => i.ok);
  return (
    <div className="rounded-[3rem] h-full border border-white/10 bg-gradient-to-tl from-[#c88aff20] to-[#fbfbfb20] dark:bg-[#030314] dark:from-[#030314] dark:to-[#fbfbfb20] p-[2rem] text-white/90">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Security Status</h3>
          <p className="text-xs text-white/60">Account protection</p>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
            allGood
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-amber-500/15 text-amber-400"
          }`}
        >
          {allGood ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          {allGood ? "Secure" : "Action needed"}
        </span>
      </div>
      <ul className="space-y-3">
        {items.map((i) => {
          const Icon = i.icon;
          return (
            <li key={i.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    i.ok
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium">{i.title}</p>
                  <p className="text-xs text-white/60">{i.desc}</p>
                </div>
              </div>
              <button className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 hover:bg-white/10">
                {i.ok ? "Manage" : "Enable"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SecurityStatusCard;
