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
        className={`px-[0.3rem] py-[0.25rem] rounded-full flex gap-[0.5rem] border-[1px] border-[#fbfbfb90] hover:border-[#fbfbfb] transition-colors ${className}`}
      >
        <label
          className="bg-[#0E1520] rounded-full p-[0.5rem] text-white text-xl cursor-pointer"
          htmlFor="search-input"
          aria-label="Search"
        >
          <IoSearch />
        </label>
        <input
          id="search-input"
          className="outline-none border-none text-[#212121] dark:text-[#fbfbfb] text-sm font-light bg-transparent flex-1"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          aria-label="Search input"
        />
      </div>
    );
  }
);

Search.displayName = "Search";

export default Search;
