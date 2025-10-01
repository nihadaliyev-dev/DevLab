import { memo, useState, useCallback } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const Search = memo<SearchProps>(
  ({ onSearch, placeholder = "Search here...", className = "" }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch?.(value);
      },
      [onSearch]
    );

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onSearch?.(query);
        }
      },
      [onSearch, query]
    );

    return (
      <div
        className={`relative px-3 py-2 rounded-full flex items-center gap-3 border border-[#fbfbfb90] hover:border-[#fbfbfb] focus-within:border-[#0022aaaf] focus-within:shadow-[0_0_20px_rgba(0,34,170,0.3)] bg-[#0E1520]/50 backdrop-blur-sm transition-all duration-300 hover:bg-[#0E1520]/70 hover:shadow-[0_4px_20px_rgba(0,34,170,0.2)] hover:scale-105 group ${className}`}
      >
        {/* Search icon with glow effect */}
        <label
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#0022aaaf] to-[#0044ccaf] text-white cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,34,170,0.5)] group-hover:rotate-12"
          htmlFor="search-input"
          aria-label="Search"
        >
          <IoSearch className="w-4 h-4 transition-transform duration-300" />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0022aaaf] to-[#0044ccaf] rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
        </label>

        {/* Search input */}
        <input
          id="search-input"
          className="outline-none border-none text-[#fbfbfb] text-sm font-light bg-transparent flex-1 placeholder-[#fbfbfb]/60 focus:placeholder-[#fbfbfb]/40 transition-all duration-300 focus:scale-105"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          aria-label="Search input"
        />

        {/* Focus indicator */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0022aaaf] to-[#0044ccaf] opacity-0 focus-within:opacity-10 transition-opacity duration-300 pointer-events-none" />

        {/* Shimmer effect on focus */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 focus-within:opacity-100 focus-within:animate-shimmer transition-opacity duration-300 pointer-events-none" />
      </div>
    );
  }
);

Search.displayName = "Search";

export default Search;
