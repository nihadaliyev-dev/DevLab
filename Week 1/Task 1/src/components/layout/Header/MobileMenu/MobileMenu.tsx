import { memo, useEffect } from "react";
import { NavLink } from "react-router";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import ProfileAndNotifications from "../ProfileAndNotifications/ProfileAndNotifications";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = memo<MobileMenuProps>(({ isOpen, onClose }) => {
  // Keep the menu mounted always; control interactivity and visibility via CSS

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    let originalOverflow = "";
    let originalPosition = "";
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      originalOverflow = document.body.style.overflow;
      originalPosition = document.body.style.position;
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (isOpen) {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
      }
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ease-out [will-change:opacity] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        className={`fixed top-0 right-0 h-[100dvh] w-80 max-w-[85vw] bg-gradient-to-br from-[#0E1520] via-[#1a2332] to-[#0E1520] backdrop-blur-xl border-l border-[#fbfbfb20] shadow-[0_0_50px_rgba(0,34,170,0.3)] z-50 lg:hidden transform transition-transform duration-300 ease-out overscroll-contain [will-change:transform] [transform:translateZ(0)] [backface-visibility:hidden] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#fbfbfb20]">
            <h2 className="text-lg font-semibold text-[#fbfbfb]">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#212121]/50 hover:bg-[#212121] transition-colors"
              aria-label="Close menu"
            >
              <MdClose className="w-5 h-5 text-[#fbfbfb]" />
            </button>
          </div>

          <div className="p-4 border-b border-[#fbfbfb20]">
            <div className="mb-3">
              <label className="block text-sm font-medium text-[#fbfbfb] mb-2">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="h-4 w-4 text-[#fbfbfb]/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pl-10 pr-4 py-2 bg-[#212121]/50 border border-[#fbfbfb20] rounded-lg text-[#fbfbfb] placeholder-[#fbfbfb]/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {[
                { to: "/", label: "Dashboard", end: true },
                { to: "/users", label: "Market", end: false },
                { to: "/wallet", label: "Crypto wallet", end: false },
                { to: "/watchlist", label: "Watchlist", end: false },
                { to: "/community", label: "Community", end: false },
              ].map((item, index) => (
                <li
                  key={item.to}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => {
                      // Add a small delay for smooth transition
                      setTimeout(() => onClose(), 150);
                    }}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ease-out transform hover:scale-105 hover:translate-x-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] text-[#fbfbfb] shadow-[0_4px_20px_rgba(0,34,170,0.4)] border border-[#fbfbfb30] scale-105"
                          : "text-[#fbfbfb9f] hover:text-[#fbfbfb] hover:bg-[#212121]/50 hover:shadow-[0_2px_10px_rgba(0,34,170,0.2)]"
                      }`
                    }
                  >
                    <span className="relative z-10">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-[#fbfbfb20]">
            <ProfileAndNotifications />
          </div>
        </div>
      </div>
    </>
  );
});

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
