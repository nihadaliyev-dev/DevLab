import { memo } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../../../contexts/ThemeContext";

const ThemeSwitch = memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-flex items-center bg-[#141A25]/80 backdrop-blur-sm border border-[#fbfbfb20] rounded-full p-1 shadow-[0_4px_20px_rgba(0,34,170,0.2)] hover:shadow-[0_6px_25px_rgba(0,34,170,0.3)] transition-all duration-300 group">
      {/* Animated background */}
      <div
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] transition-transform duration-300 ease-in-out shadow-[0_2px_10px_rgba(0,34,170,0.4)] ${
          theme === "light" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      <button
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark mode"
        onClick={() => setTheme("dark")}
        className="relative z-10 text-[#fbfbfb] rounded-full p-2 hover:bg-white/10 hover:scale-110 transition-all duration-200 group/btn"
      >
        <MdOutlineDarkMode className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
      </button>

      <button
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Switch to light mode"
        onClick={() => setTheme("light")}
        className="relative z-10 text-[#fbfbfb] rounded-full p-2 hover:bg-white/10 hover:scale-110 transition-all duration-200 group/btn"
      >
        <MdOutlineLightMode className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
      </button>
    </div>
  );
});

export default memo(ThemeSwitch);
