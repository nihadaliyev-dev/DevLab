import { memo } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../../../../contexts/ThemeContext";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-flex items-center bg-[#141A25] rounded-full p-[0.25rem]">
      <div
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] rounded-full bg-blue-500 transition-transform duration-300 ease-in-out ${
          theme === "light" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      <button
        type="button"
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark mode"
        onClick={() => setTheme("dark")}
        className="cursor-pointer relative z-[2] text-white rounded-full p-[0.5rem] hover:bg-white/10 transition-colors"
      >
        <MdOutlineDarkMode />
      </button>
      <button
        type="button"
        aria-pressed={theme === "light"}
        aria-label="Switch to light mode"
        onClick={() => setTheme("light")}
        className="cursor-pointer relative z-[2] text-white rounded-full p-[0.5rem] hover:bg-white/10 transition-colors"
      >
        <MdOutlineLightMode />
      </button>
    </div>
  );
};

export default memo(ThemeSwitch);
