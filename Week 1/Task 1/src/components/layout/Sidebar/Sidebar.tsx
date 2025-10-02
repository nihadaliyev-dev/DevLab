import React from "react";
import { Home, BarChart3, Settings, Users, TrendingUp } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";

const Sidebar: React.FC = () => {
  const { navbarLayout } = useSettings();

  if (navbarLayout !== "sidebar") return null;

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full md:w-64 w-[3rem]  bg-gradient-to-b from-[#0E1520] to-[#1a2332] border-r border-[#fbfbfb20] backdrop-blur-md z-40">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0022aa] to-[#0044cc] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#fbfbfb] md:block hidden">
            CryptoDash
          </span>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#0022aa] to-[#0044cc] text-white shadow-lg"
                    : "text-[#fbfbfb80] hover:text-[#fbfbfb] hover:bg-[#fbfbfb10]"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
