import React, { useState } from "react";
import { Home, BarChart3, Settings, Users, Menu, X } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";

const Sidebar: React.FC = () => {
  const { navbarLayout } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  if (navbarLayout !== "sidebar") return null;

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const labelVisibleOnMobile = isOpen;

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-controls="app-sidebar"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed top-1 left-1 z-50 inline-flex items-center justify-center rounded-lg p-2 md:hidden
          bg-white/80 text-gray-900 border border-gray-200 shadow-sm hover:shadow-md
          dark:bg-[#1a2332] dark:text-[#fbfbfb] dark:border-[#fbfbfb20]"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out backdrop-blur-md border-r
          bg-white/80 border-gray-200 text-gray-900 shadow-sm
          dark:bg-gradient-to-b dark:from-[#0E1520] dark:to-[#1a2332] dark:border-[#fbfbfb20]
          ${isOpen ? "w-64 shadow-2xl" : "w-12"} md:w-64`}
      >
        <div className="p-1">
          <div
            className={`flex items-center ${
              labelVisibleOnMobile ? "gap-3" : "gap-0"
            } mt-18`}
          ></div>

          <nav
            className="space-y-2"
            role="navigation"
            aria-label="Sidebar navigation"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                typeof window !== "undefined" &&
                window.location.pathname === item.href;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  title={item.name}
                  className={`flex items-center ${
                    labelVisibleOnMobile
                      ? "justify-start gap-3 px-4"
                      : "justify-center px-0"
                  } py-3 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0
                    ${
                      isActive
                        ? "bg-blue-600/10 text-blue-700 dark:bg-gradient-to-r dark:from-[#0022aa] dark:to-[#0044cc] dark:text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-[#fbfbfb80] dark:hover:text-[#fbfbfb] dark:hover:bg-[#fbfbfb10]"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span
                    className={`font-medium ${
                      labelVisibleOnMobile ? "inline" : "hidden"
                    } md:inline`}
                  >
                    {item.name}
                  </span>
                  {isActive && labelVisibleOnMobile && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-white" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
