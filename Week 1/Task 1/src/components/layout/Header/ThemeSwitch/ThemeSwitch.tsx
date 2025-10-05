import { memo } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../../../contexts/ThemeContext";

const ThemeSwitch = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative inline-flex items-center rounded-full p-1 transition-all duration-300 group border bg-white/80 border-gray-200 shadow-sm hover:shadow-md dark:bg-[#141A25]/80 dark:border-[#fbfbfb20] dark:shadow-[0_4px_20px_rgba(0,34,170,0.2)] dark:hover:shadow-[0_6px_25px_rgba(0,34,170,0.3)] backdrop-blur-sm">
      <div
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-full transition-transform duration-300 ease-in-out shadow-sm dark:shadow-[0_2px_10px_rgba(0,34,170,0.4)] ${
          theme === "light"
            ? "translate-x-full bg-gray-200"
            : "translate-x-0 bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf]"
        }`}
      />

      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gray-200 dark:bg-gradient-to-r dark:from-[#0022aaaf] dark:to-[#0044ccaf]" />

      <button
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Toggle dark mode"
        onClick={toggleTheme}
        className={`relative z-10 rounded-full p-2 transition-all duration-200 group/btn hover:scale-110 ${
          theme === "dark" ? "text-white" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <MdOutlineDarkMode className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
      </button>

      <button
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Toggle light mode"
        onClick={toggleTheme}
        className={`relative z-10 rounded-full p-2 transition-all duration-200 group/btn hover:scale-110 ${
          theme === "light" ? "text-gray-900" : "text-white hover:bg-white/10"
        }`}
      >
        <MdOutlineLightMode className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
      </button>
    </div>
  );
});

export default memo(ThemeSwitch);
