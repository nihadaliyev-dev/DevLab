import { memo } from "react";
import { NavLink } from "react-router";

const Navbar = memo(() => {
  const navItems = [
    { to: "/", label: "Dashboard", end: true },
    { to: "/users", label: "Market", end: false },
    { to: "/wallet", label: "Crypto wallet", end: false },
    { to: "/watchlist", label: "Watchlist", end: false },
    { to: "/community", label: "Community", end: false },
  ];

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item, index) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden transform hover:scale-105 ${
              isActive
                ? "text-[#fbfbfb] bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] shadow-[0_4px_20px_rgba(0,34,170,0.4)] border border-[#fbfbfb30] backdrop-blur-sm scale-105"
                : "text-[#fbfbfb9f] hover:text-[#fbfbfb] hover:bg-[#212121]/50 hover:shadow-[0_2px_10px_rgba(0,34,170,0.2)]"
            }`
          }
          style={{
            animationDelay: `${index * 0.1}s`,
            animation: "fadeInUp 0.6s ease-out forwards",
          }}
        >
          {({ isActive }) => (
            <>
              {/* Active indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full blur-sm opacity-50 animate-pulse-glow" />
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

              {/* Text content */}
              <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1">
                {item.label}
              </span>

              {/* Glow effect for active item */}
              {isActive && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full blur opacity-30 animate-pulse" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
});

export default Navbar;
